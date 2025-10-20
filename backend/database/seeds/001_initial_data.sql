-- ============================================
-- ESKAL EIGHT SERVICES - Initial Seed Data
-- ============================================

-- ============================================
-- 1. CREATE ADMIN USER
-- ============================================
-- Password: Admin@123 (hashed with bcrypt)
-- You should change this after first login
INSERT INTO users (name, email, phone, password, role, status, email_verified_at) VALUES
('ESKAL Admin', 'admin@eskaleight.com', '+234XXXXXXXXXX', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', 'active', NOW());

-- ============================================
-- 2. SERVICE CATEGORIES
-- ============================================
INSERT INTO service_categories (name, slug, description, icon, display_order, status) VALUES
('Procurement & Supplies', 'procurement-supplies', 'Complete procurement solutions for businesses and organizations', 'shopping-cart', 1, 'active'),
('Logistics & Haulage', 'logistics-haulage', 'Efficient logistics and transportation services across Nigeria', 'truck', 2, 'active'),
('Construction Services', 'construction-services', 'Professional construction and facility maintenance', 'hard-hat', 3, 'active'),
('General Contracts', 'general-contracts', 'Comprehensive contracting services for all project types', 'briefcase', 4, 'active'),
('Consultancy Services', 'consultancy-services', 'Expert consulting for business and project management', 'users', 5, 'active'),
('Facility Management', 'facility-management', 'Complete facility management and maintenance solutions', 'building', 6, 'active');

-- ============================================
-- 3. SAMPLE SERVICES
-- ============================================
INSERT INTO services (category_id, name, slug, short_description, description, features, base_price, price_type, status, is_featured) VALUES
(1, 'Office Equipment & Supplies', 'office-equipment-supplies',
'Complete office equipment procurement',
'We provide comprehensive office equipment and supplies procurement services including furniture, stationery, IT equipment, and more.',
'["Competitive pricing", "Quality assurance", "Fast delivery", "Bulk discounts available"]',
NULL, 'quote', 'active', TRUE),

(2, 'Interstate Haulage', 'interstate-haulage',
'Professional interstate transportation',
'Safe and timely transportation of goods across Nigeria.',
'["GPS tracking", "Insurance coverage", "24/7 support", "Various truck sizes"]',
NULL, 'quote', 'active', TRUE),

(3, 'Building Construction', 'building-construction',
'Complete building construction services',
'From foundation to finishing, we handle all aspects of building construction.',
'["Experienced team", "Quality materials", "Project management", "Timely completion"]',
NULL, 'quote', 'active', TRUE);

-- ============================================
-- 4. SAMPLE TESTIMONIALS
-- ============================================
INSERT INTO testimonials (client_name, client_position, client_company, testimonial, rating, status, is_featured) VALUES
('Adebayo Johnson', 'Procurement Manager', 'Federal Ministry of Education',
'ESKAL EIGHT SERVICES delivered exceptional service on our office equipment procurement. Professional, timely, and within budget.',
5, 'approved', TRUE);
