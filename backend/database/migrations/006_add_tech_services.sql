-- Add Technology & Digital Services to the services table

-- Insert main Technology & Digital Services category
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('Technology & Digital Services', 'technology-digital-services', 'technology',
'Transform your business with cutting-edge technology solutions. From web development to cloud infrastructure, we deliver innovative digital solutions that drive growth and efficiency.',
'💻',
'["Full-stack development expertise", "Modern tech stack (React, Laravel, Node.js)", "Cloud hosting & infrastructure", "24/7 technical support", "Agile development methodology", "Post-launch maintenance & updates"]',
1, 7, NOW(), NOW());

-- Get the ID of the main tech service (for reference)
SET @tech_service_id = LAST_INSERT_ID();

-- Insert sub-services for Technology & Digital Services

-- 1. Web Development
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('Web Development', 'web-development', 'technology',
'Professional corporate websites, e-commerce platforms, and web portals built with modern technologies. Responsive, fast, and SEO-optimized.',
'🌐',
'["Corporate websites & landing pages", "E-commerce platforms (WooCommerce, Custom)", "Web portals & dashboards", "Responsive design (mobile-first)", "SEO optimization", "Content Management Systems (CMS)", "Progressive Web Apps (PWA)", "Payment gateway integration"]',
1, 8, NOW(), NOW());

-- 2. Mobile App Development
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('Mobile App Development', 'mobile-app-development', 'technology',
'Native and cross-platform mobile applications for iOS and Android. Built with React Native and Flutter for optimal performance.',
'📱',
'["Android & iOS applications", "Cross-platform development (React Native, Flutter)", "Native app development", "App Store & Play Store deployment", "Push notifications & real-time features", "Offline functionality", "In-app purchases & subscriptions", "App maintenance & updates"]',
1, 9, NOW(), NOW());

-- 3. Software Solutions
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('Custom Software Solutions', 'custom-software-solutions', 'technology',
'Tailored business applications, CRM systems, inventory management, and enterprise software designed to meet your unique requirements.',
'⚙️',
'["Custom CRM systems", "Inventory management software", "ERP solutions", "Accounting & finance software", "HR management systems", "Workflow automation tools", "Business intelligence dashboards", "Custom API development"]',
1, 10, NOW(), NOW());

-- 4. API Integration & Automation
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('API Integration & Automation', 'api-integration-automation', 'technology',
'Connect your systems seamlessly. We integrate payment gateways, logistics APIs, ERP systems, and automate your business processes.',
'🔗',
'["Payment gateway integration (Paystack, Flutterwave, Stripe)", "Logistics & shipping API integration", "ERP & CRM integrations", "Third-party API development", "Webhook configuration", "Data synchronization", "Process automation", "API security & authentication"]',
1, 11, NOW(), NOW());

-- 5. Cloud Hosting & Infrastructure
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('Cloud Hosting & Infrastructure', 'cloud-hosting-infrastructure', 'technology',
'Reliable website hosting, domain setup, SSL certificates, and cloud infrastructure management. Keep your business online 24/7.',
'☁️',
'["Website hosting (Shared, VPS, Dedicated)", "Domain registration & management", "SSL certificates & security", "Email hosting & setup", "Cloud storage solutions", "Server management & monitoring", "Automatic backups", "CDN integration", "99.9% uptime guarantee"]',
1, 12, NOW(), NOW());

-- 6. IT Infrastructure & Support
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('IT Infrastructure & Support', 'it-infrastructure-support', 'technology',
'Complete IT infrastructure setup, networking, system administration, and ongoing technical support for your business.',
'🖥️',
'["Network setup & configuration", "Server installation & management", "IT equipment procurement", "System maintenance & updates", "Technical support (24/7)", "Data backup & recovery", "Cybersecurity solutions", "Hardware & software troubleshooting"]',
1, 13, NOW(), NOW());

-- 7. UI/UX Design
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('UI/UX Design', 'ui-ux-design', 'technology',
'Beautiful, intuitive user interfaces that enhance user experience. We design websites and apps that users love to interact with.',
'🎨',
'["User interface design", "User experience optimization", "Wireframing & prototyping", "Design systems & style guides", "Mobile app design", "Web design", "Usability testing", "Brand identity design", "Figma & Adobe XD expertise"]',
1, 14, NOW(), NOW());

-- 8. Digital Transformation Consulting
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('Digital Transformation Consulting', 'digital-transformation-consulting', 'technology',
'Help traditional businesses transition to digital operations. Strategic consulting, process digitization, and technology adoption.',
'🚀',
'["Digital strategy development", "Process digitization", "Technology roadmap planning", "Legacy system modernization", "Change management support", "Staff training & onboarding", "Digital marketing integration", "ROI analysis & reporting"]',
1, 15, NOW(), NOW());

-- 9. AI & Data Solutions (Optional)
INSERT INTO services (name, slug, category, description, icon, features, is_active, sort_order, created_at, updated_at) VALUES
('AI & Data Solutions', 'ai-data-solutions', 'technology',
'Leverage artificial intelligence and data analytics to gain insights and automate processes. Chatbots, analytics dashboards, and more.',
'🤖',
'["AI-powered chatbots", "Data analytics & visualization", "Business intelligence dashboards", "Predictive analytics", "Machine learning models", "Natural language processing", "Automated reporting", "Data pipeline development"]',
1, 16, NOW(), NOW());

-- Update sort order for existing services to make room
UPDATE services SET sort_order = 1 WHERE category = 'procurement';
UPDATE services SET sort_order = 2 WHERE category = 'logistics';
UPDATE services SET sort_order = 3 WHERE category = 'construction';
UPDATE services SET sort_order = 4 WHERE category = 'engineering';
UPDATE services SET sort_order = 5 WHERE category = 'consultancy';
UPDATE services SET sort_order = 6 WHERE category = 'general_contracts';
