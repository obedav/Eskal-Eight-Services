<?php
declare(strict_types=1);

/**
 * Payment Gateway Configuration
 */

return [
    // Paystack Configuration
    'paystack' => [
        'public_key' => $_ENV['PAYSTACK_PUBLIC_KEY'] ?? '',
        'secret_key' => $_ENV['PAYSTACK_SECRET_KEY'] ?? '',
        'webhook_secret' => $_ENV['PAYSTACK_WEBHOOK_SECRET'] ?? '',
        'base_url' => 'https://api.paystack.co',
        'webhook_url' => $_ENV['APP_URL'] . '/api/webhooks/paystack',
        'callback_url' => $_ENV['FRONTEND_URL'] . '/payment/callback',
        'enabled' => filter_var($_ENV['PAYSTACK_ENABLED'] ?? 'true', FILTER_VALIDATE_BOOLEAN),
        'currency' => 'NGN',
        'channels' => ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
    ],

    // Flutterwave Configuration
    'flutterwave' => [
        'public_key' => $_ENV['FLUTTERWAVE_PUBLIC_KEY'] ?? '',
        'secret_key' => $_ENV['FLUTTERWAVE_SECRET_KEY'] ?? '',
        'encryption_key' => $_ENV['FLUTTERWAVE_ENCRYPTION_KEY'] ?? '',
        'base_url' => 'https://api.flutterwave.com/v3',
        'webhook_url' => $_ENV['APP_URL'] . '/api/webhooks/flutterwave',
        'callback_url' => $_ENV['FRONTEND_URL'] . '/payment/callback',
        'enabled' => filter_var($_ENV['FLUTTERWAVE_ENABLED'] ?? 'true', FILTER_VALIDATE_BOOLEAN),
        'currency' => 'NGN',
        'payment_options' => 'card,banktransfer,ussd,mobilemoneyghana',
    ],

    // General Payment Settings
    'settings' => [
        'default_gateway' => $_ENV['DEFAULT_PAYMENT_GATEWAY'] ?? 'paystack',
        'currency' => 'NGN',
        'currency_symbol' => '₦',
        'allow_installments' => true,
        'minimum_deposit_percentage' => 30, // 30% minimum deposit
        'max_installments' => 6, // Maximum 6 installment payments
        'installment_interval_days' => 30, // 30 days between installments
        'payment_timeout_minutes' => 30, // Payment link expires after 30 minutes
        'enable_bank_transfer' => true,
        'enable_cash_payment' => true,
    ],

    // Bank Transfer Details (for manual bank transfer option)
    'bank_accounts' => [
        [
            'bank_name' => 'First Bank of Nigeria',
            'account_name' => 'Eskal Eight Services Ltd',
            'account_number' => '1234567890',
            'sort_code' => '011',
        ],
        [
            'bank_name' => 'Guaranty Trust Bank',
            'account_name' => 'Eskal Eight Services Ltd',
            'account_number' => '0987654321',
            'sort_code' => '058',
        ],
    ],

    // Payment Status Messages
    'messages' => [
        'success' => 'Payment completed successfully',
        'pending' => 'Payment is being processed',
        'failed' => 'Payment failed. Please try again',
        'cancelled' => 'Payment was cancelled',
        'refunded' => 'Payment has been refunded',
    ],
];
