-- Update Services to Reflect Actual Eskal Eight Services Ltd Offerings
-- This migration removes incorrect services and adds the real company services

-- First, delete all existing non-tech services (keeping tech services from migration 006)
DELETE FROM services WHERE category NOT IN ('technology');

-- Reset auto-increment to maintain clean IDs
-- ALTER TABLE services AUTO_INCREMENT = 1;

-- Insert actual Eskal Eight Services Ltd services
INSERT INTO services (title, slug, category, description, short_description, icon, features, sort_order, is_active) VALUES
(
    'Branding & Advertising Materials',
    'branding-advertising',
    'branding',
    'Comprehensive branding solutions including POSM (Point of Sales Materials), advertising materials, flex printing, flock printing, sublimation, screen printing, and doming. We help create awareness in the marketplace with high-quality branded materials that make your business stand out.',
    'POSM, advertising materials, and branding services',
    '🎨',
    '["POSM (Point of Sales Materials)", "Flex Printing", "Flock Printing", "Sublimation", "Screen Printing", "Doming", "Vehicle Branding", "Billboard Design", "Corporate Branding", "Product Branding"]',
    1,
    1
),
(
    'Custom Uniforms & Apparel (Eskal8 Couture)',
    'uniforms-apparel',
    'apparel',
    'Professional uniform production and custom apparel manufacturing. From corporate shirts and hotel bedding to PPE, lab coats, theater gowns, and branded t-shirts. We provide complete uniform solutions with quality fabrics and expert branding.',
    'Corporate uniforms, PPE, and custom apparel production',
    '👔',
    '["Corporate Shirts & Uniforms", "Hotel Bedding & Linens", "Jersey & Coveralls", "Lab Coats & Theater Gowns", "T-shirts, Polo & Round Neck", "Personal Protective Equipment (PPE)", "Custom Branding on Apparel", "Bulk Orders for Organizations", "Quality Fabric Selection", "Fast Turnaround"]',
    2,
    1
),
(
    'Inflatable Displays & Product Replicas',
    'inflatable-displays',
    'promotional',
    'Creation of eye-catching promotional inflatables including continuous and non-continuous blowing product replicas, customized product mascots, and cut-out characters. Perfect for events, product launches, and brand activations.',
    'Product mascots, inflatable replicas, and promotional displays',
    '🎈',
    '["Continuous Blowing Inflatables", "Non-continuous Blowing Replicas", "Customized Product Mascots", "Cut-out Characters", "Event Displays", "Brand Activation Materials", "Large-scale Promotional Items", "Product Launch Displays"]',
    3,
    1
),
(
    'Hotel Amenities & Hospitality Supplies',
    'hotel-amenities',
    'hospitality',
    'Sales and supply of hotel amenities and hospitality products. We provide complete solutions for hotels, resorts, and hospitality businesses including bedding, towels, bathroom amenities, and branded items.',
    'Complete hotel amenities and hospitality supplies',
    '🏨',
    '["Hotel Bedding & Linens", "Bathroom Amenities", "Towels & Robes", "Guest Room Supplies", "Branded Hospitality Items", "Bulk Supply for Hotels", "Quality Hospitality Products", "Restaurant Supplies"]',
    4,
    1
),
(
    'Corporate Gifts & Promotional Items',
    'corporate-gifts',
    'promotional',
    'Wide range of corporate gifts and promotional items perfect for events, conferences, and brand awareness campaigns. From branded bags and carriers to memo pads, jotters, and customized promotional materials.',
    'Branded corporate gifts and promotional products',
    '🎁',
    '["Branded Bags & Carriers", "Memo Pads & Jotters", "Corporate Gift Sets", "Promotional Items", "Event Giveaways", "Conference Materials", "Branded Stationery", "Custom Gift Packaging"]',
    5,
    1
),
(
    'Safety Equipment & Security Kits',
    'safety-equipment',
    'safety',
    'Comprehensive safety equipment and security kits including helmets, safety jackets, face shields, goggles, safety boots, harnesses, belts, lanyards, boots, umbrellas, and torchlights. Ensuring workplace safety compliance and security preparedness.',
    'Safety gear, PPE, and security equipment',
    '🦺',
    '["Safety Helmets", "Safety Jackets & Vests", "Face Shields & Goggles", "Safety Boots & Shoes", "Safety Harnesses", "Security Belts & Lanyards", "Torchlights & Umbrellas", "Workplace Safety Compliance", "Bulk Orders for Organizations", "Quality Certified Equipment"]',
    6,
    1
),
(
    'Procurement & Import/Export Services',
    'procurement-import-export',
    'procurement',
    'Professional procurement services with global reach. Through our subsidiary Taichangqing Trading Company Limited in China (established 2025), we handle imports, exports, and international sourcing of quality products at competitive prices.',
    'Global procurement, imports, and exports',
    '📦',
    '["International Sourcing", "Import Services", "Export Services", "China Procurement (via Taichangqing Trading)", "Quality Product Sourcing", "Competitive Pricing", "Reliable Supply Chain", "Bulk Orders", "Product Verification", "Global Logistics Coordination"]',
    7,
    1
),
(
    'Logistics & Clearing Services',
    'logistics-clearing',
    'logistics',
    'Complete logistics and clearing solutions for seamless delivery of goods. We handle customs clearing, freight forwarding, warehousing, and last-mile delivery ensuring your products reach their destination on time.',
    'Customs clearing, freight, and delivery services',
    '🚚',
    '["Customs Clearing", "Freight Forwarding", "Warehousing Services", "Last-Mile Delivery", "Logistics Management", "Import Documentation", "Export Processing", "Tracking & Monitoring", "Reliable Transportation"]',
    8,
    1
);

-- Update sort_order for tech services to come after main services
UPDATE services
SET sort_order = sort_order + 100
WHERE category = 'technology';
