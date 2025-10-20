-- Services Table Migration
-- Run this migration to create the services table

CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    icon VARCHAR(50),
    features JSON,
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default services
INSERT INTO services (title, slug, category, description, short_description, icon, features, sort_order) VALUES
(
    'Procurement & Supplies',
    'procurement-supplies',
    'procurement',
    'Comprehensive sourcing and delivery of goods, materials, and equipment for various industries. We provide quality products from trusted suppliers with competitive pricing and reliable delivery.',
    'Sourcing and delivering goods, materials, and equipment',
    '📦',
    '["Office Equipment", "Engineering Tools", "Safety Gear", "Building Materials", "IT Equipment"]',
    1
),
(
    'Logistics & Haulage',
    'logistics-haulage',
    'logistics',
    'Professional transportation and fleet management services across Nigeria. We ensure timely delivery of your goods with real-time tracking and secure handling.',
    'Professional transportation and fleet management',
    '🚚',
    '["Local & Interstate Delivery", "Heavy Equipment Transport", "Fleet Management", "Warehousing", "Real-time Tracking"]',
    2
),
(
    'Construction & Civil Works',
    'construction-civil-works',
    'construction',
    'Complete building construction, renovation, and infrastructure development services. Our experienced team delivers quality projects on time and within budget.',
    'Complete building construction and infrastructure',
    '🏗️',
    '["Residential Construction", "Commercial Buildings", "Renovations", "Site Supervision", "Project Management"]',
    3
),
(
    'Engineering & Technical Services',
    'engineering-technical',
    'engineering',
    'Professional installation, maintenance, and technical support services. We provide expert solutions for electrical, mechanical, and ICT systems.',
    'Installation, maintenance, and technical support',
    '⚙️',
    '["Electrical Installation", "Mechanical Services", "ICT Setup", "Equipment Maintenance", "Technical Support"]',
    4
),
(
    'Consultancy & Project Management',
    'consultancy-project-management',
    'consultancy',
    'Expert advisory and coordination services for complex projects. We help you plan, execute, and deliver successful projects with minimal risk and maximum efficiency.',
    'Expert project management and advisory',
    '💼',
    '["Project Planning", "Risk Management", "Quality Assurance", "Budget Control", "Stakeholder Management"]',
    5
),
(
    'General Contracts',
    'general-contracts',
    'contracts',
    'Comprehensive contracting services for government and private sector. We handle tender registration, contract bidding, and multi-sector project execution.',
    'Comprehensive contracting for all sectors',
    '📋',
    '["Tender Registration", "Contract Bidding", "Partnership Services", "Compliance Management", "Multi-sector Projects"]',
    6
);
