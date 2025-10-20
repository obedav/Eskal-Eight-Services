<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Payment;
use App\Models\Quote;
use App\Services\PaystackService;
use App\Services\FlutterwaveService;
use App\Helpers\Response;
use Exception;

/**
 * Payment Controller
 *
 * Handles payment initialization, verification, and management
 */
class PaymentController extends BaseController
{

    private Payment $paymentModel;
    private Quote $quoteModel;
    private ?PaystackService $paystackService = null;
    private ?FlutterwaveService $flutterwaveService = null;

    public function __construct()
    {
        $this->paymentModel = new Payment();
        $this->quoteModel = new Quote();
    }

    /**
     * Initialize a payment
     */
    public function initializePayment(): void
    {
        try {
            $quoteId = $this->getInt('quote_id');
            $paymentMethod = $this->getString('payment_method'); // paystack, flutterwave, bank_transfer, cash
            $paymentType = $this->getString('payment_type', 'full'); // full, deposit, installment
            $amount = $this->getFloat('amount');

            // Validate quote exists and belongs to user
            $quote = $this->quoteModel->findById($quoteId);
            if (!$quote) {
                Response::error('Quote not found', null, 404);
            }

            // Check if user owns the quote
            $user = $this->getAuthenticatedUser();
            if ($quote['user_id'] !== $user->user_id) {
                Response::error('Unauthorized access to quote', null, 403);
            }

            // Validate quote status
            if (!in_array($quote['status'], ['approved', 'pending_payment'])) {
                Response::error('Quote must be approved before payment', null, 400);
            }

            // Validate amount
            $quoteAmount = (float) $quote['total_amount'];
            if ($paymentType === 'full' && $amount != $quoteAmount) {
                Response::error('Full payment amount must match quote total', null, 400);
            }

            // For deposit or installment, check minimum deposit
            $config = require __DIR__ . '/../../config/payment.php';
            $minDepositPercentage = $config['settings']['minimum_deposit_percentage'];
            $minDepositAmount = ($quoteAmount * $minDepositPercentage) / 100;

            if (in_array($paymentType, ['deposit', 'installment']) && $amount < $minDepositAmount) {
                Response::error("Minimum deposit is {$minDepositPercentage}% (₦" . number_format($minDepositAmount, 2) . ")", null, 400);
            }

            // Generate unique payment reference
            $reference = $this->paymentModel->generateReference('PAY');

            // Create payment record
            $payment = $this->paymentModel->create([
                'quote_id' => $quoteId,
                'user_id' => $user->user_id,
                'amount' => $amount,
                'currency' => 'NGN',
                'payment_method' => $paymentMethod,
                'payment_type' => $paymentType,
                'status' => 'pending',
                'reference' => $reference,
                'metadata' => [
                    'quote_number' => $quote['quote_number'],
                    'service_id' => $quote['service_id'],
                    'payment_type' => $paymentType,
                ],
            ]);

            if (!$payment) {
                Response::error('Failed to create payment record', null, 500);
            }

            // Handle payment based on method
            if ($paymentMethod === 'paystack') {
                $paymentData = $this->initializePaystack($payment, $quote, $user);
            } elseif ($paymentMethod === 'flutterwave') {
                $paymentData = $this->initializeFlutterwave($payment, $quote, $user);
            } elseif ($paymentMethod === 'bank_transfer') {
                $paymentData = $this->initializeBankTransfer($payment, $quote);
            } elseif ($paymentMethod === 'cash') {
                $paymentData = $this->initializeCashPayment($payment, $quote);
            } else {
                Response::error('Invalid payment method', null, 400);
            }

            Response::success($paymentData, 'Payment initialized successfully');
        } catch (Exception $e) {
            error_log('Payment initialization error: ' . $e->getMessage());
            Response::error($e->getMessage(), null, 500);
        }
    }

    /**
     * Initialize Paystack payment
     */
    private function initializePaystack(array $payment, array $quote, object $user): array
    {
        try {
            $this->paystackService = new PaystackService();

            $response = $this->paystackService->initializeTransaction([
                'email' => $user->email,
                'amount' => $payment['amount'],
                'reference' => $payment['reference'],
                'metadata' => [
                    'payment_id' => $payment['id'],
                    'quote_id' => $quote['id'],
                    'quote_number' => $quote['quote_number'],
                    'customer_name' => $user->first_name . ' ' . $user->last_name,
                ],
            ]);

            if ($response['status'] && isset($response['data']['authorization_url'])) {
                return [
                    'payment_id' => $payment['id'],
                    'reference' => $payment['reference'],
                    'authorization_url' => $response['data']['authorization_url'],
                    'access_code' => $response['data']['access_code'],
                    'payment_method' => 'paystack',
                ];
            }

            throw new Exception('Failed to initialize Paystack payment');
        } catch (Exception $e) {
            throw new Exception('Paystack initialization error: ' . $e->getMessage());
        }
    }

    /**
     * Initialize Flutterwave payment
     */
    private function initializeFlutterwave(array $payment, array $quote, object $user): array
    {
        try {
            $this->flutterwaveService = new FlutterwaveService();

            $response = $this->flutterwaveService->initializePayment([
                'reference' => $payment['reference'],
                'amount' => $payment['amount'],
                'email' => $user->email,
                'customer_name' => $user->first_name . ' ' . $user->last_name,
                'phone' => $user->phone ?? '',
                'title' => 'Payment for Quote ' . $quote['quote_number'],
                'description' => 'Service payment for ' . $quote['service_name'] ?? 'service',
                'metadata' => [
                    'payment_id' => $payment['id'],
                    'quote_id' => $quote['id'],
                    'quote_number' => $quote['quote_number'],
                ],
            ]);

            if ($response['status'] === 'success' && isset($response['data']['link'])) {
                return [
                    'payment_id' => $payment['id'],
                    'reference' => $payment['reference'],
                    'authorization_url' => $response['data']['link'],
                    'payment_method' => 'flutterwave',
                ];
            }

            throw new Exception('Failed to initialize Flutterwave payment');
        } catch (Exception $e) {
            throw new Exception('Flutterwave initialization error: ' . $e->getMessage());
        }
    }

    /**
     * Initialize bank transfer payment
     */
    private function initializeBankTransfer(array $payment, array $quote): array
    {
        $config = require __DIR__ . '/../../config/payment.php';
        $bankAccounts = $config['bank_accounts'];

        return [
            'payment_id' => $payment['id'],
            'reference' => $payment['reference'],
            'payment_method' => 'bank_transfer',
            'amount' => $payment['amount'],
            'bank_accounts' => $bankAccounts,
            'instructions' => 'Please make a bank transfer to any of the accounts listed above and use the reference number: ' . $payment['reference'],
        ];
    }

    /**
     * Initialize cash payment
     */
    private function initializeCashPayment(array $payment, array $quote): array
    {
        return [
            'payment_id' => $payment['id'],
            'reference' => $payment['reference'],
            'payment_method' => 'cash',
            'amount' => $payment['amount'],
            'instructions' => 'Please contact our office to arrange cash payment. Reference number: ' . $payment['reference'],
        ];
    }

    /**
     * Verify payment
     */
    public function verifyPayment(): void
    {
        try {
            $reference = $this->getString('reference');

            $payment = $this->paymentModel->findByReference($reference);
            if (!$payment) {
                Response::error('Payment not found', null, 404);
            }

            // Check if already verified
            if ($payment['status'] === 'completed') {
                Response::success([
                    'payment' => $payment,
                    'verified' => true,
                    'message' => 'Payment already verified',
                ], 'Payment already completed');
            }

            // Verify based on payment method
            if ($payment['payment_method'] === 'paystack') {
                $verificationData = $this->verifyPaystack($payment);
            } elseif ($payment['payment_method'] === 'flutterwave') {
                $verificationData = $this->verifyFlutterwave($payment);
            } else {
                Response::error('Payment method does not support automatic verification', null, 400);
            }

            Response::success($verificationData, 'Payment verified successfully');
        } catch (Exception $e) {
            error_log('Payment verification error: ' . $e->getMessage());
            Response::error($e->getMessage(), null, 500);
        }
    }

    /**
     * Verify Paystack payment
     */
    private function verifyPaystack(array $payment): array
    {
        $this->paystackService = new PaystackService();
        $response = $this->paystackService->verifyTransaction($payment['reference']);

        if ($response['status'] && $response['data']['status'] === 'success') {
            // Update payment status
            $this->paymentModel->updateStatus($payment['id'], 'completed', [
                'transaction_id' => $response['data']['id'],
                'payment_gateway_response' => $response['data'],
            ]);

            // Update quote status to paid
            $this->quoteModel->updateStatus($payment['quote_id'], 'paid');

            $updatedPayment = $this->paymentModel->findById($payment['id']);

            return [
                'payment' => $updatedPayment,
                'verified' => true,
                'transaction_data' => $response['data'],
            ];
        }

        // Payment failed
        $this->paymentModel->updateStatus($payment['id'], 'failed', [
            'payment_gateway_response' => $response,
        ]);

        throw new Exception('Payment verification failed');
    }

    /**
     * Verify Flutterwave payment
     */
    private function verifyFlutterwave(array $payment): array
    {
        $this->flutterwaveService = new FlutterwaveService();
        $response = $this->flutterwaveService->verifyTransactionByReference($payment['reference']);

        if ($response['status'] === 'success' && $response['data']['status'] === 'successful') {
            // Update payment status
            $this->paymentModel->updateStatus($payment['id'], 'completed', [
                'transaction_id' => $response['data']['id'],
                'payment_gateway_response' => $response['data'],
            ]);

            // Update quote status to paid
            $this->quoteModel->updateStatus($payment['quote_id'], 'paid');

            $updatedPayment = $this->paymentModel->findById($payment['id']);

            return [
                'payment' => $updatedPayment,
                'verified' => true,
                'transaction_data' => $response['data'],
            ];
        }

        // Payment failed
        $this->paymentModel->updateStatus($payment['id'], 'failed', [
            'payment_gateway_response' => $response,
        ]);

        throw new Exception('Payment verification failed');
    }

    /**
     * Get payment details
     */
    public function getPayment(): void
    {
        try {
            $id = $this->getInt('id');
            $payment = $this->paymentModel->findById($id);

            if (!$payment) {
                Response::error('Payment not found', null, 404);
            }

            // Check authorization
            $user = $this->getAuthenticatedUser();
            if ($payment['user_id'] !== $user->user_id && !in_array($user->role, ['admin', 'super_admin'])) {
                Response::error('Unauthorized access', null, 403);
            }

            Response::success($payment, 'Payment retrieved successfully');
        } catch (Exception $e) {
            Response::error($e->getMessage(), null, 500);
        }
    }

    /**
     * Get payment history for authenticated user
     */
    public function getPaymentHistory(): void
    {
        try {
            $user = $this->getAuthenticatedUser();
            $page = $this->getInt('page', 1);
            $perPage = $this->getInt('per_page', 10);

            $filters = [
                'status' => $_GET['status'] ?? null,
                'payment_method' => $_GET['payment_method'] ?? null,
            ];

            $filters = array_filter($filters);

            if (in_array($user->role, ['admin', 'super_admin'])) {
                $result = $this->paymentModel->getAll($page, $perPage, $filters);
            } else {
                $filters['user_id'] = $user->user_id;
                $payments = $this->paymentModel->findByUserId($user->user_id, $filters);
                $result = ['data' => $payments];
            }

            Response::success($result, 'Payment history retrieved successfully');
        } catch (Exception $e) {
            Response::error($e->getMessage(), null, 500);
        }
    }

    /**
     * Get payment statistics (Admin only)
     */
    public function getPaymentStatistics(): void
    {
        try {
            $filters = [
                'from_date' => $_GET['from_date'] ?? null,
                'to_date' => $_GET['to_date'] ?? null,
            ];

            $filters = array_filter($filters);
            $stats = $this->paymentModel->getStatistics($filters);

            Response::success($stats, 'Payment statistics retrieved successfully');
        } catch (Exception $e) {
            Response::error($e->getMessage(), null, 500);
        }
    }

    /**
     * Handle Paystack webhook
     */
    public function handlePaystackWebhook(): void
    {
        try {
            $payload = file_get_contents('php://input');
            $signature = $_SERVER['HTTP_X_PAYSTACK_SIGNATURE'] ?? '';

            $this->paystackService = new PaystackService();

            if (!$this->paystackService->verifyWebhookSignature($payload, $signature)) {
                Response::error('Invalid webhook signature', null, 401);
            }

            $event = json_decode($payload, true);

            if ($event['event'] === 'charge.success') {
                $reference = $event['data']['reference'];
                $payment = $this->paymentModel->findByReference($reference);

                if ($payment && $payment['status'] === 'pending') {
                    $this->paymentModel->updateStatus($payment['id'], 'completed', [
                        'transaction_id' => $event['data']['id'],
                        'payment_gateway_response' => $event['data'],
                    ]);

                    $this->quoteModel->updateStatus($payment['quote_id'], 'paid');
                }
            }

            Response::success(null, 'Webhook processed successfully');
        } catch (Exception $e) {
            error_log('Paystack webhook error: ' . $e->getMessage());
            Response::error($e->getMessage(), null, 500);
        }
    }

    /**
     * Handle Flutterwave webhook
     */
    public function handleFlutterwaveWebhook(): void
    {
        try {
            $signature = $_SERVER['HTTP_VERIF_HASH'] ?? '';

            $this->flutterwaveService = new FlutterwaveService();

            if (!$this->flutterwaveService->verifyWebhookSignature($signature)) {
                Response::error('Invalid webhook signature', null, 401);
            }

            $payload = file_get_contents('php://input');
            $event = json_decode($payload, true);

            if ($event['event'] === 'charge.completed' && $event['data']['status'] === 'successful') {
                $reference = $event['data']['tx_ref'];
                $payment = $this->paymentModel->findByReference($reference);

                if ($payment && $payment['status'] === 'pending') {
                    $this->paymentModel->updateStatus($payment['id'], 'completed', [
                        'transaction_id' => $event['data']['id'],
                        'payment_gateway_response' => $event['data'],
                    ]);

                    $this->quoteModel->updateStatus($payment['quote_id'], 'paid');
                }
            }

            Response::success(null, 'Webhook processed successfully');
        } catch (Exception $e) {
            error_log('Flutterwave webhook error: ' . $e->getMessage());
            Response::error($e->getMessage(), null, 500);
        }
    }

    /**
     * Get authenticated user from request
     */
    private function getAuthenticatedUser(): object
    {
        return $_REQUEST['user'] ?? throw new Exception('User not authenticated');
    }
}
