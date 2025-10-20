-- ============================================
-- ESKAL EIGHT SERVICES - Complete Database Schema
-- ============================================
-- Version: 1.0
-- Date: 2025-01-19
-- Description: Service e-commerce platform with quote management and payments
-- ============================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS users, services, quotes, projects, payments, portfolio, blog, documents, messages, testimonials, service_categories, notifications;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20) NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('client', 'admin', 'super_admin') DEFAULT 'client',
    company_name VARCHAR(255) NULL,
    address TEXT NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(100) NULL,
    country VARCHAR(100) DEFAULT 'Nigeria',
    profile_image VARCHAR(255) NULL,
    email_verified_at TIMESTAMP NULL,
    verification_token VARCHAR(100) NULL,
    reset_token VARCHAR(100) NULL,
    reset_token_expires TIMESTAMP NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. SERVICE CATEGORIES TABLE
-- ============================================
CREATE TABLE service_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    icon VARCHAR(100) NULL,
    image VARCHAR(255) NULL,
    display_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. SERVICES TABLE
-- ============================================
CREATE TABLE services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT NULL,
    description TEXT NOT NULL,
    features TEXT NULL COMMENT 'JSON array of features',
    deliverables TEXT NULL COMMENT 'JSON array of deliverables',
    base_price DECIMAL(15, 2) NULL,
    price_type ENUM('fixed', 'quote', 'hourly', 'daily') DEFAULT 'quote',
    duration VARCHAR(100) NULL COMMENT 'Estimated duration',
    image VARCHAR(255) NULL,
    gallery TEXT NULL COMMENT 'JSON array of images',
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. QUOTES TABLE
-- ============================================
CREATE TABLE quotes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    service_id BIGINT UNSIGNED NULL,
    quote_number VARCHAR(50) NOT NULL UNIQUE,
    company_name VARCHAR(255) NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20) NULL,
    service_category VARCHAR(255) NULL,
    service_description TEXT NOT NULL,
    project_location VARCHAR(255) NULL,
    timeline VARCHAR(100) NULL,
    budget_range VARCHAR(100) NULL,
    special_requirements TEXT NULL,
    attachments TEXT NULL COMMENT 'JSON array of file paths',
    status ENUM('pending', 'reviewing', 'quoted', 'approved', 'rejected', 'expired') DEFAULT 'pending',
    quoted_amount DECIMAL(15, 2) NULL,
    quoted_at TIMESTAMP NULL,
    quoted_by BIGINT UNSIGNED NULL,
    quote_details TEXT NULL COMMENT 'Admin response/breakdown',
    valid_until DATE NULL,
    payment_option ENUM('full', 'deposit', 'milestone', 'completion') DEFAULT 'full',
    deposit_percentage INT DEFAULT 0,
    notes TEXT NULL COMMENT 'Internal admin notes',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    source ENUM('website', 'referral', 'email', 'phone') DEFAULT 'website',
    converted_to_project BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
    FOREIGN KEY (quoted_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_quote_number (quote_number),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. PROJECTS TABLE
-- ============================================
CREATE TABLE projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quote_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    project_number VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    paid_amount DECIMAL(15, 2) DEFAULT 0.00,
    balance_amount DECIMAL(15, 2) NOT NULL,
    payment_terms TEXT NULL,
    status ENUM('pending', 'in_progress', 'on_hold', 'completed', 'cancelled') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    start_date DATE NULL,
    expected_end_date DATE NULL,
    actual_end_date DATE NULL,
    progress_percentage INT DEFAULT 0,
    assigned_to BIGINT UNSIGNED NULL COMMENT 'Admin/team member',
    location VARCHAR(255) NULL,
    milestones TEXT NULL COMMENT 'JSON array of milestones',
    deliverables TEXT NULL COMMENT 'JSON array of deliverables',
    notes TEXT NULL,
    client_feedback TEXT NULL,
    rating INT NULL COMMENT 'Client rating 1-5',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_project_number (project_number),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, expected_end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. PAYMENTS TABLE
-- ============================================
CREATE TABLE payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NULL,
    quote_id BIGINT UNSIGNED NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    payment_reference VARCHAR(100) NOT NULL UNIQUE,
    transaction_id VARCHAR(100) NULL COMMENT 'Gateway transaction ID',
    gateway ENUM('paystack', 'flutterwave', 'bank_transfer', 'cash') NOT NULL,
    payment_type ENUM('deposit', 'milestone', 'balance', 'full') DEFAULT 'full',
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NGN',
    status ENUM('pending', 'processing', 'successful', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50) NULL COMMENT 'card, bank_transfer, ussd, etc',
    customer_email VARCHAR(255) NULL,
    customer_phone VARCHAR(20) NULL,
    gateway_response TEXT NULL COMMENT 'JSON response from gateway',
    paid_at TIMESTAMP NULL,
    metadata TEXT NULL COMMENT 'Additional payment data',
    receipt_url VARCHAR(255) NULL,
    refund_amount DECIMAL(15, 2) NULL,
    refund_reason TEXT NULL,
    refunded_at TIMESTAMP NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_reference (payment_reference),
    INDEX idx_transaction (transaction_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_gateway (gateway)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. DOCUMENTS TABLE
-- ============================================
CREATE TABLE documents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NULL,
    quote_id BIGINT UNSIGNED NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    uploaded_by BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL COMMENT 'Size in bytes',
    file_type VARCHAR(100) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    category ENUM('contract', 'invoice', 'receipt', 'report', 'image', 'other') DEFAULT 'other',
    description TEXT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_project (project_id),
    INDEX idx_quote (quote_id),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 8. MESSAGES TABLE
-- ============================================
CREATE TABLE messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NULL,
    quote_id BIGINT UNSIGNED NULL,
    sender_id BIGINT UNSIGNED NOT NULL,
    receiver_id BIGINT UNSIGNED NULL COMMENT 'NULL means broadcast to all admins',
    subject VARCHAR(255) NULL,
    message TEXT NOT NULL,
    attachments TEXT NULL COMMENT 'JSON array of file paths',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    message_type ENUM('general', 'update', 'urgent', 'system') DEFAULT 'general',
    parent_id BIGINT UNSIGNED NULL COMMENT 'For threaded conversations',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES messages(id) ON DELETE CASCADE,
    INDEX idx_project (project_id),
    INDEX idx_quote (quote_id),
    INDEX idx_sender (sender_id),
    INDEX idx_receiver (receiver_id),
    INDEX idx_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 9. PORTFOLIO TABLE
-- ============================================
CREATE TABLE portfolio (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NULL COMMENT 'Link to actual project if exists',
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    client_name VARCHAR(255) NULL,
    location VARCHAR(255) NULL,
    short_description TEXT NULL,
    description TEXT NOT NULL,
    challenge TEXT NULL,
    solution TEXT NULL,
    results TEXT NULL,
    featured_image VARCHAR(255) NULL,
    gallery TEXT NULL COMMENT 'JSON array of images',
    project_value DECIMAL(15, 2) NULL,
    duration VARCHAR(100) NULL,
    completion_date DATE NULL,
    tags TEXT NULL COMMENT 'JSON array of tags',
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    status ENUM('draft', 'published', 'archived') DEFAULT 'published',
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 10. BLOG TABLE
-- ============================================
CREATE TABLE blog (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    author_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NULL,
    content TEXT NOT NULL,
    featured_image VARCHAR(255) NULL,
    category VARCHAR(100) NULL,
    tags TEXT NULL COMMENT 'JSON array of tags',
    meta_title VARCHAR(255) NULL,
    meta_description TEXT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_author (author_id),
    INDEX idx_status (status),
    INDEX idx_published (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 11. TESTIMONIALS TABLE
-- ============================================
CREATE TABLE testimonials (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    project_id BIGINT UNSIGNED NULL,
    client_name VARCHAR(255) NOT NULL,
    client_position VARCHAR(255) NULL,
    client_company VARCHAR(255) NULL,
    client_image VARCHAR(255) NULL,
    testimonial TEXT NOT NULL,
    rating INT DEFAULT 5 COMMENT '1-5 stars',
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 12. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    type VARCHAR(100) NOT NULL COMMENT 'quote_updated, payment_received, project_update, etc',
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link VARCHAR(500) NULL,
    icon VARCHAR(100) NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    data TEXT NULL COMMENT 'Additional JSON data',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update project balance when payment is made
DELIMITER $$
CREATE TRIGGER update_project_balance AFTER UPDATE ON payments
FOR EACH ROW
BEGIN
    IF NEW.status = 'successful' AND OLD.status != 'successful' AND NEW.project_id IS NOT NULL THEN
        UPDATE projects
        SET paid_amount = paid_amount + NEW.amount,
            balance_amount = total_amount - (paid_amount + NEW.amount)
        WHERE id = NEW.project_id;
    END IF;
END$$
DELIMITER ;

-- ============================================
-- INITIAL INDEXES FOR PERFORMANCE
-- ============================================
-- Already included in table definitions above

-- ============================================
-- END OF SCHEMA
-- ============================================
