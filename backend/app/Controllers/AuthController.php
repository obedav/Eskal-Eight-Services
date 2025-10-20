<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\User;
use App\Helpers\JWT;
use App\Helpers\Response;
use App\Helpers\Sanitizer;
use App\Exceptions\ValidationException;

/**
 * Authentication Controller
 */
class AuthController extends BaseController {
    private User $userModel;

    public function __construct() {
        parent::__construct();
        $this->userModel = new User();
    }

    /**
     * User login
     * POST /api/auth/login
     */
    public function login(): void {
        $this->requireMethod('POST');

        try {
            // Get and validate input
            $email = $this->getEmail('email');
            $password = $this->getString('password');

            // Validate required fields
            if (empty($email) || empty($password)) {
                throw new ValidationException('Email and password are required');
            }

            // Find user by email
            $user = $this->userModel->findByEmail($email);

            if (!$user) {
                Response::error('Invalid credentials', null, 401);
            }

            // Check if account is active
            if ($user['status'] !== STATUS_ACTIVE) {
                Response::error('Account is inactive or suspended', null, 403);
            }

            // Verify password
            if (!$this->userModel->verifyPassword($password, $user['password'])) {
                Response::error('Invalid credentials', null, 401);
            }

            // Update last login
            $this->userModel->updateLastLogin((int)$user['id']);

            // Generate JWT token
            $tokenPayload = [
                'user_id' => $user['id'],
                'email' => $user['email'],
                'role' => $user['role']
            ];

            $token = JWT::generate($tokenPayload);

            // Get safe user data (remove password)
            $userData = $this->userModel->getSafeUserData($user);

            Response::success([
                'token' => $token,
                'user' => $userData
            ], 'Login successful');

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Login Error: " . $e->getMessage());
            Response::error('An error occurred during login', null, 500);
        }
    }

    /**
     * User registration
     * POST /api/auth/register
     */
    public function register(): void {
        $this->requireMethod('POST');

        try {
            // Get and validate input
            $firstName = $this->getString('first_name');
            $lastName = $this->getString('last_name');
            $email = $this->getEmail('email');
            $phone = $this->getString('phone');
            $password = $this->getString('password');
            $confirmPassword = $this->getString('confirm_password');

            // Validate required fields
            if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
                throw new ValidationException('All required fields must be filled');
            }

            // Validate email format
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new ValidationException('Invalid email format');
            }

            // Validate password length
            if (strlen($password) < 8) {
                throw new ValidationException('Password must be at least 8 characters long');
            }

            // Validate password confirmation
            if ($password !== $confirmPassword) {
                throw new ValidationException('Passwords do not match');
            }

            // Check if email already exists
            if ($this->userModel->emailExists($email)) {
                throw new ValidationException('Email already registered');
            }

            // Create user
            $userId = $this->userModel->createUser([
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'phone' => $phone,
                'password' => $password,
                'role' => ROLE_CLIENT
            ]);

            // Get created user
            $user = $this->userModel->find($userId);

            // Generate email verification token
            $verificationToken = bin2hex(random_bytes(32));
            $this->userModel->setEmailVerificationToken($userId, $verificationToken);

            // TODO: Send verification email
            // EmailService::sendVerificationEmail($email, $verificationToken);

            // Generate JWT token for auto-login
            $tokenPayload = [
                'user_id' => $user['id'],
                'email' => $user['email'],
                'role' => $user['role']
            ];

            $token = JWT::generate($tokenPayload);

            // Get safe user data
            $userData = $this->userModel->getSafeUserData($user);

            Response::success([
                'token' => $token,
                'user' => $userData
            ], 'Registration successful', 201);

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Registration Error: " . $e->getMessage());
            Response::error('An error occurred during registration', null, 500);
        }
    }

    /**
     * Verify JWT token
     * GET /api/auth/verify
     */
    public function verify(): void {
        $this->requireMethod('GET');

        try {
            $tokenData = JWT::verify();

            if (!$tokenData) {
                Response::unauthorized('Invalid or expired token');
            }

            // Get fresh user data from database
            $user = $this->userModel->find((int)$tokenData->user_id);

            if (!$user) {
                Response::unauthorized('User not found');
            }

            // Check if user is still active
            if ($user['status'] !== STATUS_ACTIVE) {
                Response::unauthorized('Account is inactive');
            }

            // Get safe user data
            $userData = $this->userModel->getSafeUserData($user);

            Response::success([
                'user' => $userData,
                'valid' => true
            ], 'Token is valid');

        } catch (\Exception $e) {
            error_log("Token Verification Error: " . $e->getMessage());
            Response::unauthorized('Token verification failed');
        }
    }

    /**
     * Request password reset
     * POST /api/auth/forgot-password
     */
    public function forgotPassword(): void {
        $this->requireMethod('POST');

        try {
            $email = $this->getEmail('email');

            if (empty($email)) {
                throw new ValidationException('Email is required');
            }

            $user = $this->userModel->findByEmail($email);

            if (!$user) {
                // Don't reveal if email exists or not for security
                Response::success(null, 'If the email exists, a password reset link has been sent');
            }

            // Generate reset token
            $resetToken = bin2hex(random_bytes(32));
            $this->userModel->setPasswordResetToken($email, $resetToken);

            // TODO: Send password reset email
            // EmailService::sendPasswordResetEmail($email, $resetToken);

            Response::success(null, 'Password reset link has been sent to your email');

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Forgot Password Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Reset password with token
     * POST /api/auth/reset-password
     */
    public function resetPassword(): void {
        $this->requireMethod('POST');

        try {
            $token = $this->getString('token');
            $password = $this->getString('password');
            $confirmPassword = $this->getString('confirm_password');

            // Validate input
            if (empty($token) || empty($password)) {
                throw new ValidationException('Token and password are required');
            }

            if (strlen($password) < 8) {
                throw new ValidationException('Password must be at least 8 characters long');
            }

            if ($password !== $confirmPassword) {
                throw new ValidationException('Passwords do not match');
            }

            // Verify token
            $user = $this->userModel->verifyPasswordResetToken($token);

            if (!$user) {
                Response::error('Invalid or expired reset token', null, 400);
            }

            // Update password
            $this->userModel->updatePassword((int)$user['id'], $password);

            // Clear reset token
            $this->userModel->clearPasswordResetToken((int)$user['id']);

            Response::success(null, 'Password reset successful');

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Reset Password Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Get current user profile
     * GET /api/auth/me
     */
    public function getProfile(): void {
        $this->requireMethod('GET');
        $this->requireAuth();

        try {
            // Get user from token
            $user = $this->userModel->find((int)$this->user->user_id);

            if (!$user) {
                Response::notFound('User not found');
            }

            // Get safe user data
            $userData = $this->userModel->getSafeUserData($user);

            Response::success(['user' => $userData]);

        } catch (\Exception $e) {
            error_log("Get Profile Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Update user profile
     * PUT /api/auth/profile
     */
    public function updateProfile(): void {
        $this->requireMethod('PUT');
        $this->requireAuth();

        try {
            $userId = (int)$this->user->user_id;

            // Get update data
            $updateData = [];

            if ($this->getRequestData('first_name')) {
                $updateData['first_name'] = $this->getString('first_name');
            }

            if ($this->getRequestData('last_name')) {
                $updateData['last_name'] = $this->getString('last_name');
            }

            if ($this->getRequestData('phone')) {
                $updateData['phone'] = $this->getString('phone');
            }

            if (empty($updateData)) {
                throw new ValidationException('No data provided for update');
            }

            // Update user
            $this->userModel->update($userId, $updateData);

            // Get updated user data
            $user = $this->userModel->find($userId);
            $userData = $this->userModel->getSafeUserData($user);

            Response::success(['user' => $userData], 'Profile updated successfully');

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Update Profile Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Change password
     * POST /api/auth/change-password
     */
    public function changePassword(): void {
        $this->requireMethod('POST');
        $this->requireAuth();

        try {
            $userId = (int)$this->user->user_id;
            $currentPassword = $this->getString('current_password');
            $newPassword = $this->getString('new_password');
            $confirmPassword = $this->getString('confirm_password');

            // Validate input
            if (empty($currentPassword) || empty($newPassword)) {
                throw new ValidationException('Current and new password are required');
            }

            if (strlen($newPassword) < 8) {
                throw new ValidationException('Password must be at least 8 characters long');
            }

            if ($newPassword !== $confirmPassword) {
                throw new ValidationException('Passwords do not match');
            }

            // Get user
            $user = $this->userModel->find($userId);

            // Verify current password
            if (!$this->userModel->verifyPassword($currentPassword, $user['password'])) {
                Response::error('Current password is incorrect', null, 400);
            }

            // Update password
            $this->userModel->updatePassword($userId, $newPassword);

            Response::success(null, 'Password changed successfully');

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Change Password Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }
}
