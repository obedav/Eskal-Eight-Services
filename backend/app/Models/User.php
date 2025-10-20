<?php
declare(strict_types=1);

namespace App\Models;

/**
 * User Model
 */
class User extends BaseModel {
    protected string $table = 'users';

    /**
     * Find user by email
     */
    public function findByEmail(string $email): ?array {
        return $this->findBy('email', $email);
    }

    /**
     * Create new user
     */
    public function createUser(array $data): int {
        // Hash password if provided
        if (isset($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }

        // Set default role if not provided
        if (!isset($data['role'])) {
            $data['role'] = ROLE_CLIENT;
        }

        // Set default status
        if (!isset($data['status'])) {
            $data['status'] = STATUS_ACTIVE;
        }

        return $this->create($data);
    }

    /**
     * Verify user password
     */
    public function verifyPassword(string $password, string $hash): bool {
        return password_verify($password, $hash);
    }

    /**
     * Update user's last login
     */
    public function updateLastLogin(int $userId): bool {
        $stmt = $this->db->prepare("UPDATE {$this->table} SET last_login = NOW() WHERE id = ?");
        return $stmt->execute([$userId]);
    }

    /**
     * Check if email exists
     */
    public function emailExists(string $email): bool {
        $user = $this->findByEmail($email);
        return $user !== null;
    }

    /**
     * Update password
     */
    public function updatePassword(int $userId, string $newPassword): bool {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        return $this->update($userId, ['password' => $hashedPassword]);
    }

    /**
     * Set password reset token
     */
    public function setPasswordResetToken(string $email, string $token): bool {
        $expiresAt = date('Y-m-d H:i:s', strtotime('+1 hour'));

        $stmt = $this->db->prepare(
            "UPDATE {$this->table}
             SET password_reset_token = ?, password_reset_expires = ?
             WHERE email = ?"
        );

        return $stmt->execute([$token, $expiresAt, $email]);
    }

    /**
     * Verify password reset token
     */
    public function verifyPasswordResetToken(string $token): ?array {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table}
             WHERE password_reset_token = ?
             AND password_reset_expires > NOW()
             LIMIT 1"
        );

        $stmt->execute([$token]);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    /**
     * Clear password reset token
     */
    public function clearPasswordResetToken(int $userId): bool {
        $stmt = $this->db->prepare(
            "UPDATE {$this->table}
             SET password_reset_token = NULL, password_reset_expires = NULL
             WHERE id = ?"
        );

        return $stmt->execute([$userId]);
    }

    /**
     * Set email verification token
     */
    public function setEmailVerificationToken(int $userId, string $token): bool {
        return $this->update($userId, ['email_verification_token' => $token]);
    }

    /**
     * Verify email
     */
    public function verifyEmail(string $token): bool {
        $stmt = $this->db->prepare(
            "UPDATE {$this->table}
             SET email_verified = 1, email_verification_token = NULL
             WHERE email_verification_token = ?"
        );

        return $stmt->execute([$token]);
    }

    /**
     * Get user's safe data (without password)
     */
    public function getSafeUserData(array $user): array {
        unset($user['password']);
        unset($user['password_reset_token']);
        unset($user['password_reset_expires']);
        unset($user['email_verification_token']);

        return $user;
    }

    /**
     * Get all clients
     */
    public function getClients(int $limit = 100, int $offset = 0): array {
        return $this->findAllBy('role', ROLE_CLIENT, $limit, $offset);
    }

    /**
     * Get all admins
     */
    public function getAdmins(int $limit = 100, int $offset = 0): array {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table}
             WHERE role IN (?, ?)
             LIMIT ? OFFSET ?"
        );

        $stmt->execute([ROLE_ADMIN, ROLE_SUPER_ADMIN, $limit, $offset]);
        return $stmt->fetchAll();
    }

    /**
     * Update user status
     */
    public function updateStatus(int $userId, string $status): bool {
        return $this->update($userId, ['status' => $status]);
    }

    /**
     * Search users
     */
    public function search(string $query, int $limit = 20, int $offset = 0): array {
        $searchTerm = "%{$query}%";

        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table}
             WHERE first_name LIKE ?
             OR last_name LIKE ?
             OR email LIKE ?
             ORDER BY created_at DESC
             LIMIT ? OFFSET ?"
        );

        $stmt->execute([$searchTerm, $searchTerm, $searchTerm, $limit, $offset]);
        return $stmt->fetchAll();
    }

    /**
     * Get all users with filtering
     */
    public function getAll(string $role = '', string $status = '', string $search = '', int $limit = 50, int $offset = 0): array {
        $sql = "SELECT * FROM {$this->table} WHERE 1=1";
        $params = [];

        if (!empty($role)) {
            $sql .= " AND role = ?";
            $params[] = $role;
        }

        if (!empty($status)) {
            $sql .= " AND status = ?";
            $params[] = $status;
        }

        if (!empty($search)) {
            $sql .= " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)";
            $searchTerm = "%{$search}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }

        $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        $users = $stmt->fetchAll();

        // Remove sensitive data from results
        return array_map([$this, 'getSafeUserData'], $users);
    }

    /**
     * Count users with filtering
     */
    public function countFiltered(string $role = '', string $status = '', string $search = ''): int {
        $sql = "SELECT COUNT(*) FROM {$this->table} WHERE 1=1";
        $params = [];

        if (!empty($role)) {
            $sql .= " AND role = ?";
            $params[] = $role;
        }

        if (!empty($status)) {
            $sql .= " AND status = ?";
            $params[] = $status;
        }

        if (!empty($search)) {
            $sql .= " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)";
            $searchTerm = "%{$search}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        return (int)$stmt->fetchColumn();
    }

    /**
     * Get user statistics
     */
    public function getStatistics(): array {
        $stmt = $this->db->prepare(
            "SELECT
                COUNT(*) as total,
                SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) as active,
                SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) as inactive,
                SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) as suspended,
                SUM(CASE WHEN role = ? THEN 1 ELSE 0 END) as clients,
                SUM(CASE WHEN role IN (?, ?) THEN 1 ELSE 0 END) as admins
             FROM {$this->table}"
        );

        $stmt->execute([
            STATUS_ACTIVE,
            STATUS_INACTIVE,
            STATUS_SUSPENDED,
            ROLE_CLIENT,
            ROLE_ADMIN,
            ROLE_SUPER_ADMIN
        ]);

        return $stmt->fetch() ?: [
            'total' => 0,
            'active' => 0,
            'inactive' => 0,
            'suspended' => 0,
            'clients' => 0,
            'admins' => 0
        ];
    }

    /**
     * Get recent clients
     */
    public function getRecentClients(int $limit = 10): array {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table}
             WHERE role = ?
             ORDER BY created_at DESC
             LIMIT ?"
        );

        $stmt->execute([ROLE_CLIENT, $limit]);
        $users = $stmt->fetchAll();

        return array_map([$this, 'getSafeUserData'], $users);
    }
}
