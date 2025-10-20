<?php
declare(strict_types=1);

namespace App\Services;

use Exception;

/**
 * Flutterwave Payment Gateway Service
 *
 * Handles all interactions with Flutterwave API for payment processing
 */
class FlutterwaveService
{
    private string $secretKey;
    private string $publicKey;
    private string $encryptionKey;
    private string $baseUrl;
    private array $config;

    public function __construct()
    {
        $config = require __DIR__ . '/../../config/payment.php';
        $this->config = $config['flutterwave'];
        $this->secretKey = $this->config['secret_key'];
        $this->publicKey = $this->config['public_key'];
        $this->encryptionKey = $this->config['encryption_key'];
        $this->baseUrl = $this->config['base_url'];

        if (empty($this->secretKey)) {
            throw new Exception('Flutterwave secret key is not configured');
        }
    }

    /**
     * Initialize a payment transaction
     *
     * @param array $data Payment data
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function initializePayment(array $data): array
    {
        $url = $this->baseUrl . '/payments';

        $payload = [
            'tx_ref' => $data['reference'],
            'amount' => $data['amount'],
            'currency' => $this->config['currency'] ?? 'NGN',
            'redirect_url' => $this->config['callback_url'],
            'payment_options' => $this->config['payment_options'] ?? 'card,banktransfer,ussd',
            'customer' => [
                'email' => $data['email'],
                'name' => $data['customer_name'] ?? '',
                'phonenumber' => $data['phone'] ?? '',
            ],
            'customizations' => [
                'title' => $data['title'] ?? 'Eskal Eight Services Payment',
                'description' => $data['description'] ?? 'Payment for services',
                'logo' => $data['logo'] ?? '',
            ],
            'meta' => $data['metadata'] ?? [],
        ];

        return $this->makeRequest('POST', $url, $payload);
    }

    /**
     * Verify a transaction
     *
     * @param int $transactionId Transaction ID
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function verifyTransaction(int $transactionId): array
    {
        $url = $this->baseUrl . '/transactions/' . $transactionId . '/verify';
        return $this->makeRequest('GET', $url);
    }

    /**
     * Verify transaction by reference
     *
     * @param string $reference Transaction reference
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function verifyTransactionByReference(string $reference): array
    {
        $url = $this->baseUrl . '/transactions/verify_by_reference?tx_ref=' . urlencode($reference);
        return $this->makeRequest('GET', $url);
    }

    /**
     * Get transaction details
     *
     * @param int $transactionId Transaction ID
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function getTransaction(int $transactionId): array
    {
        $url = $this->baseUrl . '/transactions/' . $transactionId;
        return $this->makeRequest('GET', $url);
    }

    /**
     * List all transactions
     *
     * @param array $params Query parameters
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function listTransactions(array $params = []): array
    {
        $queryString = http_build_query($params);
        $url = $this->baseUrl . '/transactions' . ($queryString ? '?' . $queryString : '');
        return $this->makeRequest('GET', $url);
    }

    /**
     * Create a payment plan
     *
     * @param array $data Plan data
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function createPaymentPlan(array $data): array
    {
        $url = $this->baseUrl . '/payment-plans';

        $payload = [
            'amount' => $data['amount'],
            'name' => $data['name'],
            'interval' => $data['interval'], // daily, weekly, monthly, yearly
            'duration' => $data['duration'] ?? 0, // 0 means indefinite
            'currency' => $data['currency'] ?? 'NGN',
        ];

        return $this->makeRequest('POST', $url, $payload);
    }

    /**
     * Get payment plan details
     *
     * @param int $planId Plan ID
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function getPaymentPlan(int $planId): array
    {
        $url = $this->baseUrl . '/payment-plans/' . $planId;
        return $this->makeRequest('GET', $url);
    }

    /**
     * Create a refund
     *
     * @param array $data Refund data
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function createRefund(array $data): array
    {
        $url = $this->baseUrl . '/transactions/' . $data['transaction_id'] . '/refund';

        $payload = [
            'amount' => $data['amount'] ?? null, // If null, full refund
            'comments' => $data['comments'] ?? 'Refund requested',
        ];

        return $this->makeRequest('POST', $url, $payload);
    }

    /**
     * Get refund details
     *
     * @param int $refundId Refund ID
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function getRefund(int $refundId): array
    {
        $url = $this->baseUrl . '/refunds/' . $refundId;
        return $this->makeRequest('GET', $url);
    }

    /**
     * Initiate bank transfer payment
     *
     * @param array $data Transfer data
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function initiateBankTransfer(array $data): array
    {
        $url = $this->baseUrl . '/transfers';

        $payload = [
            'account_bank' => $data['bank_code'],
            'account_number' => $data['account_number'],
            'amount' => $data['amount'],
            'narration' => $data['narration'] ?? 'Payment',
            'currency' => $data['currency'] ?? 'NGN',
            'reference' => $data['reference'],
            'callback_url' => $this->config['callback_url'],
            'debit_currency' => $data['currency'] ?? 'NGN',
        ];

        return $this->makeRequest('POST', $url, $payload);
    }

    /**
     * Get banks list
     *
     * @param string $country Country code (e.g., NG, GH, KE)
     * @return array Response from Flutterwave
     * @throws Exception
     */
    public function getBanks(string $country = 'NG'): array
    {
        $url = $this->baseUrl . '/banks/' . $country;
        return $this->makeRequest('GET', $url);
    }

    /**
     * Verify webhook signature
     *
     * @param string $signature Signature from Flutterwave
     * @return bool True if signature is valid
     */
    public function verifyWebhookSignature(string $signature): bool
    {
        $webhookSecret = $this->secretKey;

        if (empty($webhookSecret)) {
            return false;
        }

        return hash_equals($webhookSecret, $signature);
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
     * Get encryption key for frontend
     *
     * @return string Encryption key
     */
    public function getEncryptionKey(): string
    {
        return $this->encryptionKey;
    }

    /**
     * Check if Flutterwave is enabled
     *
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->config['enabled'] ?? false;
    }

    /**
     * Make HTTP request to Flutterwave API
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
            throw new Exception('Flutterwave API Error: ' . $error);
        }

        $decodedResponse = json_decode($response, true);

        if ($httpCode >= 400) {
            $message = $decodedResponse['message'] ?? 'Unknown error occurred';
            throw new Exception('Flutterwave API Error (' . $httpCode . '): ' . $message);
        }

        return $decodedResponse;
    }

    /**
     * Encrypt payload using 3DES
     *
     * @param array $payload Data to encrypt
     * @return string Encrypted data
     */
    public function encryptPayload(array $payload): string
    {
        $json = json_encode($payload);
        $key = $this->encryptionKey;

        // Encrypt using 3DES
        $encrypted = openssl_encrypt($json, 'DES-EDE3', $key, OPENSSL_RAW_DATA);
        return base64_encode($encrypted);
    }

    /**
     * Decrypt payload using 3DES
     *
     * @param string $encryptedData Encrypted data
     * @return array Decrypted payload
     */
    public function decryptPayload(string $encryptedData): array
    {
        $key = $this->encryptionKey;
        $data = base64_decode($encryptedData);

        // Decrypt using 3DES
        $decrypted = openssl_decrypt($data, 'DES-EDE3', $key, OPENSSL_RAW_DATA);
        return json_decode($decrypted, true);
    }
}
