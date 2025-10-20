<?php
declare(strict_types=1);

namespace App\Services;

use Exception;

/**
 * Paystack Payment Gateway Service
 *
 * Handles all interactions with Paystack API for payment processing
 */
class PaystackService
{
    private string $secretKey;
    private string $publicKey;
    private string $baseUrl;
    private array $config;

    public function __construct()
    {
        $config = require __DIR__ . '/../../config/payment.php';
        $this->config = $config['paystack'];
        $this->secretKey = $this->config['secret_key'];
        $this->publicKey = $this->config['public_key'];
        $this->baseUrl = $this->config['base_url'];

        if (empty($this->secretKey)) {
            throw new Exception('Paystack secret key is not configured');
        }
    }

    /**
     * Initialize a payment transaction
     *
     * @param array $data Payment data (email, amount, reference, metadata)
     * @return array Response from Paystack
     * @throws Exception
     */
    public function initializeTransaction(array $data): array
    {
        $url = $this->baseUrl . '/transaction/initialize';

        $payload = [
            'email' => $data['email'],
            'amount' => $data['amount'] * 100, // Convert to kobo
            'reference' => $data['reference'],
            'currency' => $this->config['currency'] ?? 'NGN',
            'callback_url' => $this->config['callback_url'],
            'metadata' => $data['metadata'] ?? [],
            'channels' => $this->config['channels'] ?? ['card', 'bank', 'ussd', 'qr'],
        ];

        return $this->makeRequest('POST', $url, $payload);
    }

    /**
     * Verify a transaction
     *
     * @param string $reference Transaction reference
     * @return array Response from Paystack
     * @throws Exception
     */
    public function verifyTransaction(string $reference): array
    {
        $url = $this->baseUrl . '/transaction/verify/' . urlencode($reference);
        return $this->makeRequest('GET', $url);
    }

    /**
     * Get transaction details
     *
     * @param int $transactionId Transaction ID
     * @return array Response from Paystack
     * @throws Exception
     */
    public function getTransaction(int $transactionId): array
    {
        $url = $this->baseUrl . '/transaction/' . $transactionId;
        return $this->makeRequest('GET', $url);
    }

    /**
     * List all transactions
     *
     * @param array $params Query parameters (perPage, page, from, to)
     * @return array Response from Paystack
     * @throws Exception
     */
    public function listTransactions(array $params = []): array
    {
        $queryString = http_build_query($params);
        $url = $this->baseUrl . '/transaction' . ($queryString ? '?' . $queryString : '');
        return $this->makeRequest('GET', $url);
    }

    /**
     * Charge authorization for recurring payments
     *
     * @param array $data Payment data
     * @return array Response from Paystack
     * @throws Exception
     */
    public function chargeAuthorization(array $data): array
    {
        $url = $this->baseUrl . '/transaction/charge_authorization';

        $payload = [
            'authorization_code' => $data['authorization_code'],
            'email' => $data['email'],
            'amount' => $data['amount'] * 100, // Convert to kobo
            'reference' => $data['reference'] ?? null,
            'metadata' => $data['metadata'] ?? [],
        ];

        return $this->makeRequest('POST', $url, $payload);
    }

    /**
     * Get payment page details
     *
     * @param string $pageId Page ID or slug
     * @return array Response from Paystack
     * @throws Exception
     */
    public function getPaymentPage(string $pageId): array
    {
        $url = $this->baseUrl . '/page/' . urlencode($pageId);
        return $this->makeRequest('GET', $url);
    }

    /**
     * Process refund
     *
     * @param array $data Refund data (transaction, amount, currency, etc.)
     * @return array Response from Paystack
     * @throws Exception
     */
    public function createRefund(array $data): array
    {
        $url = $this->baseUrl . '/refund';

        $payload = [
            'transaction' => $data['transaction'],
            'amount' => isset($data['amount']) ? $data['amount'] * 100 : null, // Convert to kobo if provided
            'currency' => $data['currency'] ?? 'NGN',
            'customer_note' => $data['customer_note'] ?? null,
            'merchant_note' => $data['merchant_note'] ?? null,
        ];

        return $this->makeRequest('POST', $url, $payload);
    }

    /**
     * Verify webhook signature
     *
     * @param string $payload The webhook payload
     * @param string $signature The signature from Paystack
     * @return bool True if signature is valid
     */
    public function verifyWebhookSignature(string $payload, string $signature): bool
    {
        $webhookSecret = $this->config['webhook_secret'] ?? '';

        if (empty($webhookSecret)) {
            return false;
        }

        $computedSignature = hash_hmac('sha512', $payload, $webhookSecret);
        return hash_equals($computedSignature, $signature);
    }

    /**
     * Get public key for frontend
     *
     * @return string Public key
     */
    public function getPublicKey(): string
    {
        return $this->publicKey;
    }

    /**
     * Check if Paystack is enabled
     *
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->config['enabled'] ?? false;
    }

    /**
     * Make HTTP request to Paystack API
     *
     * @param string $method HTTP method
     * @param string $url Request URL
     * @param array|null $data Request payload
     * @return array Response from API
     * @throws Exception
     */
    private function makeRequest(string $method, string $url, ?array $data = null): array
    {
        $ch = curl_init();

        $headers = [
            'Authorization: Bearer ' . $this->secretKey,
            'Content-Type: application/json',
            'Cache-Control: no-cache',
        ];

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            if ($data) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            }
        } elseif ($method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            if ($data) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            }
        } elseif ($method === 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);

        curl_close($ch);

        if ($error) {
            throw new Exception('Paystack API Error: ' . $error);
        }

        $decodedResponse = json_decode($response, true);

        if ($httpCode >= 400) {
            $message = $decodedResponse['message'] ?? 'Unknown error occurred';
            throw new Exception('Paystack API Error (' . $httpCode . '): ' . $message);
        }

        return $decodedResponse;
    }

    /**
     * Format amount from kobo to naira
     *
     * @param int $amountInKobo Amount in kobo
     * @return float Amount in naira
     */
    public static function formatAmount(int $amountInKobo): float
    {
        return $amountInKobo / 100;
    }

    /**
     * Convert amount to kobo
     *
     * @param float $amountInNaira Amount in naira
     * @return int Amount in kobo
     */
    public static function convertToKobo(float $amountInNaira): int
    {
        return (int) ($amountInNaira * 100);
    }
}
