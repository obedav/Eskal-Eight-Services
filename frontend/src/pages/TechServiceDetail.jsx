import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaArrowRight, FaPhone, FaEnvelope } from 'react-icons/fa';

const TechServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const serviceData = {
    'web-development': {
      title: 'Web Development',
      icon: '🌐',
      gradient: 'from-blue-500 to-cyan-500',
      tagline: 'Build a powerful online presence',
      pricing: 'Starting from ₦500,000',
      priceNote: 'Final price depends on project scope and requirements',
      description: 'Professional web development services that combine stunning design with powerful functionality. From simple landing pages to complex web applications, we create websites that drive results and help your business grow.',
      keyFeatures: [
        {
          title: 'Responsive Design',
          desc: 'Perfectly optimized for all devices - desktop, tablet, and mobile',
        },
        {
          title: 'SEO Optimized',
          desc: 'Built with search engine optimization best practices',
        },
        {
          title: 'Fast Performance',
          desc: 'Lightning-fast loading times for better user experience',
        },
        {
          title: 'Secure & Reliable',
          desc: 'SSL certificates, security best practices, and regular updates',
        },
      ],
      deliverables: [
        'Fully responsive website design',
        'Content Management System (CMS)',
        'SEO-optimized code & structure',
        'Contact forms & lead capture',
        'Social media integration',
        'Google Analytics setup',
        'SSL certificate & security',
        'Performance optimization',
        'Cross-browser compatibility',
        '3 months post-launch support',
        'Training on content updates',
        'Documentation & source code',
      ],
      technologies: ['React', 'Next.js', 'Laravel', 'WordPress', 'Tailwind CSS', 'MySQL', 'AWS'],
      processSteps: [
        { step: '1', title: 'Discovery & Planning', desc: 'We understand your business needs, target audience, and project goals', duration: '3-5 days' },
        { step: '2', title: 'Design & Prototyping', desc: 'Create wireframes, mockups, and interactive prototypes for your approval', duration: '5-7 days' },
        { step: '3', title: 'Development', desc: 'Code your website with modern technologies and best practices', duration: '10-20 days' },
        { step: '4', title: 'Testing & QA', desc: 'Thorough testing across all devices and browsers', duration: '3-5 days' },
        { step: '5', title: 'Launch & Training', desc: 'Deploy to production and train your team', duration: '2-3 days' },
        { step: '6', title: 'Support & Maintenance', desc: 'Ongoing support and updates as needed', duration: 'Continuous' },
      ],
      faqs: [
        {
          q: 'How long does it take to build a website?',
          a: 'Typically 4-8 weeks depending on complexity and features. We provide a detailed timeline after understanding your requirements.',
        },
        {
          q: 'Can I update the website myself after launch?',
          a: 'Yes! We build all websites with user-friendly content management systems and provide comprehensive training.',
        },
        {
          q: 'Do you provide hosting and domain services?',
          a: 'Yes, we can arrange hosting and domain registration, or work with your existing provider. We recommend our Cloud Hosting service for optimal performance.',
        },
        {
          q: 'What if I need changes after the website is launched?',
          a: 'We provide 3 months of free support for minor updates and bug fixes. For major changes, we can discuss a maintenance contract or quote new work.',
        },
      ],
    },
    'mobile-app-development': {
      title: 'Mobile App Development',
      icon: '📱',
      gradient: 'from-purple-500 to-pink-500',
      tagline: 'Reach your customers on the go',
      pricing: 'Starting from ₦800,000',
      priceNote: 'Price varies based on features, platforms, and complexity',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android. We build apps that users love and businesses need.',
      keyFeatures: [
        {
          title: 'Cross-Platform',
          desc: 'Build once, deploy to both iOS and Android',
        },
        {
          title: 'Native Performance',
          desc: 'Smooth, fast, and responsive user experience',
        },
        {
          title: 'Offline Support',
          desc: 'Works even without internet connection',
        },
        {
          title: 'Push Notifications',
          desc: 'Keep users engaged with timely notifications',
        },
      ],
      deliverables: [
        'iOS & Android applications',
        'Clean, intuitive UI/UX design',
        'Push notifications system',
        'Offline functionality',
        'In-app purchases (if needed)',
        'Social media integration',
        'Analytics dashboard',
        'App Store & Play Store submission',
        'User onboarding flow',
        '6 months post-launch support',
        'App maintenance updates',
        'Source code & documentation',
      ],
      technologies: ['React Native', 'Flutter', 'Firebase', 'Node.js', 'MongoDB', 'AWS Amplify'],
      processSteps: [
        { step: '1', title: 'Strategy & Planning', desc: 'Define app features, user flows, and technical requirements', duration: '3-5 days' },
        { step: '2', title: 'UI/UX Design', desc: 'Create beautiful, intuitive app interface mockups', duration: '7-10 days' },
        { step: '3', title: 'Development', desc: 'Build iOS & Android apps with cutting-edge technology', duration: '20-40 days' },
        { step: '4', title: 'Testing & QA', desc: 'Comprehensive testing across multiple devices', duration: '5-7 days' },
        { step: '5', title: 'App Store Submission', desc: 'Submit to Apple App Store and Google Play Store', duration: '3-7 days' },
        { step: '6', title: 'Launch & Support', desc: 'Monitor performance and provide ongoing support', duration: 'Continuous' },
      ],
      faqs: [
        {
          q: 'Should I build for iOS, Android, or both?',
          a: 'We recommend both platforms to maximize your reach. Using React Native or Flutter, we can build for both simultaneously, saving time and cost.',
        },
        {
          q: 'How much does app maintenance cost?',
          a: 'Maintenance typically costs 15-20% of the initial development cost annually. This covers updates, bug fixes, OS compatibility, and performance optimization.',
        },
        {
          q: 'Can you help with App Store approval?',
          a: 'Yes, we handle the entire submission process including creating developer accounts, preparing app store listings, and addressing any review feedback.',
        },
      ],
    },
    'custom-software': {
      title: 'Custom Software Solutions',
      icon: '⚙️',
      gradient: 'from-green-500 to-teal-500',
      tagline: 'Software built for your unique needs',
      pricing: 'Custom Quote Required',
      priceNote: 'Each project is unique - request a detailed quote based on your specific needs',
      description: 'Tailored business applications designed specifically for your workflows, processes, and requirements. No more forcing your business into generic software.',
      keyFeatures: [
        {
          title: 'Custom Built',
          desc: 'Designed specifically for your business needs',
        },
        {
          title: 'Scalable',
          desc: 'Grows with your business over time',
        },
        {
          title: 'Integration Ready',
          desc: 'Connects with your existing systems',
        },
        {
          title: 'Full Ownership',
          desc: 'You own the source code and data',
        },
      ],
      deliverables: [
        'Custom application development',
        'Database design & setup',
        'User authentication & roles',
        'Admin dashboard',
        'Reporting & analytics',
        'Data import/export',
        'API for integrations',
        'Cloud deployment',
        'User training sessions',
        'Documentation',
        '12 months support',
        'Source code ownership',
      ],
      technologies: ['Laravel', 'React', 'Node.js', 'Python', 'MySQL', 'PostgreSQL', 'AWS', 'Docker'],
      processSteps: [
        { step: '1', title: 'Requirements Gathering', desc: 'Deep dive into your business processes and needs', duration: '5-10 days' },
        { step: '2', title: 'System Design', desc: 'Architecture, database design, and feature planning', duration: '7-14 days' },
        { step: '3', title: 'Development Sprints', desc: 'Agile development with regular demos and feedback', duration: '30-90 days' },
        { step: '4', title: 'Testing & Refinement', desc: 'User acceptance testing and bug fixes', duration: '7-14 days' },
        { step: '5', title: 'Deployment & Training', desc: 'Launch to production and train your team', duration: '3-5 days' },
        { step: '6', title: 'Support & Evolution', desc: 'Ongoing support and feature additions', duration: 'Continuous' },
      ],
      faqs: [
        {
          q: 'How is custom software different from off-the-shelf solutions?',
          a: 'Custom software is built specifically for your business processes, while off-the-shelf software requires you to adapt. Custom solutions offer better efficiency and competitive advantage.',
        },
        {
          q: 'Will I own the source code?',
          a: 'Yes, you will own all source code and intellectual property. We provide full documentation and handover.',
        },
      ],
    },
    'api-integration': {
      title: 'API Integration & Automation',
      icon: '🔗',
      gradient: 'from-orange-500 to-red-500',
      tagline: 'Connect your systems seamlessly',
      pricing: 'Starting from ₦300,000',
      priceNote: 'Price depends on number of integrations and complexity',
      description: 'Connect your existing systems and automate workflows with powerful API integrations. From payment gateways to CRM systems, we make your tools work together.',
      keyFeatures: [
        {
          title: 'Seamless Integration',
          desc: 'Connect multiple platforms and services',
        },
        {
          title: 'Real-Time Sync',
          desc: 'Data synchronized instantly across systems',
        },
        {
          title: 'Error Handling',
          desc: 'Robust error management and logging',
        },
        {
          title: 'Automation',
          desc: 'Reduce manual work with smart automation',
        },
      ],
      deliverables: [
        'Custom API integration',
        'Payment gateway setup',
        'Third-party service connections',
        'Data synchronization',
        'Webhook implementation',
        'Authentication & security',
        'Error handling & logging',
        'Testing & validation',
        'Documentation',
        '6 months support',
        'Monitoring setup',
        'API rate limit management',
      ],
      technologies: ['Node.js', 'Laravel', 'REST API', 'GraphQL', 'Webhooks', 'OAuth', 'Redis'],
      processSteps: [
        { step: '1', title: 'Integration Analysis', desc: 'Understand your systems and integration requirements', duration: '2-3 days' },
        { step: '2', title: 'API Planning', desc: 'Design the integration architecture and data flow', duration: '2-4 days' },
        { step: '3', title: 'Development', desc: 'Build and configure the integrations', duration: '5-15 days' },
        { step: '4', title: 'Testing', desc: 'Thorough testing with real data', duration: '2-3 days' },
        { step: '5', title: 'Deployment', desc: 'Deploy to production with monitoring', duration: '1-2 days' },
        { step: '6', title: 'Monitoring', desc: 'Ongoing monitoring and optimization', duration: 'Continuous' },
      ],
      faqs: [
        {
          q: 'What APIs can you integrate?',
          a: 'We can integrate any API including payment gateways (Paystack, Flutterwave), CRMs (Salesforce, HubSpot), accounting software (QuickBooks, Xero), and custom APIs.',
        },
        {
          q: 'How long does API integration take?',
          a: 'Simple integrations can be done in 1-2 weeks, while complex multi-system integrations may take 4-6 weeks.',
        },
      ],
    },
    'cloud-hosting': {
      title: 'Cloud Hosting & Infrastructure',
      icon: '☁️',
      gradient: 'from-cyan-500 to-blue-500',
      tagline: 'Reliable, fast, and secure hosting',
      pricing: '₦50,000 - ₦200,000/month',
      priceNote: 'Pricing based on resources, traffic, and storage needs',
      description: 'Enterprise-grade cloud hosting with 99.9% uptime guarantee. From simple websites to complex applications, we provide the infrastructure your business needs.',
      keyFeatures: [
        {
          title: '99.9% Uptime',
          desc: 'Guaranteed reliability and availability',
        },
        {
          title: 'Auto Scaling',
          desc: 'Automatically handles traffic spikes',
        },
        {
          title: 'Daily Backups',
          desc: 'Your data is safe and recoverable',
        },
        {
          title: '24/7 Monitoring',
          desc: 'Proactive monitoring and alerts',
        },
      ],
      deliverables: [
        'Cloud server setup',
        'Domain registration & DNS',
        'SSL certificate installation',
        'Server security hardening',
        'Daily automated backups',
        'CDN setup for faster loading',
        'Email hosting',
        'Database hosting',
        'Monitoring dashboard',
        'Performance optimization',
        '24/7 technical support',
        'Monthly reports',
      ],
      technologies: ['AWS', 'DigitalOcean', 'Cloudflare', 'Let\'s Encrypt', 'Nginx', 'Linux', 'Docker'],
      processSteps: [
        { step: '1', title: 'Requirements Assessment', desc: 'Analyze your hosting needs and traffic patterns', duration: '1 day' },
        { step: '2', title: 'Server Setup', desc: 'Provision and configure cloud infrastructure', duration: '1-2 days' },
        { step: '3', title: 'Migration', desc: 'Migrate your application to the cloud', duration: '1-3 days' },
        { step: '4', title: 'Optimization', desc: 'Performance tuning and optimization', duration: '1-2 days' },
        { step: '5', title: 'Testing', desc: 'Load testing and security verification', duration: '1 day' },
        { step: '6', title: 'Ongoing Management', desc: 'Monitoring, updates, and support', duration: 'Continuous' },
      ],
      faqs: [
        {
          q: 'What\'s included in the monthly hosting fee?',
          a: 'Server resources, security updates, daily backups, monitoring, SSL certificate, technical support, and 99.9% uptime guarantee.',
        },
        {
          q: 'Can I upgrade my hosting plan as my business grows?',
          a: 'Yes, you can upgrade or downgrade anytime. We handle the migration seamlessly with zero downtime.',
        },
      ],
    },
    'it-support': {
      title: 'IT Infrastructure & Support',
      icon: '🛠️',
      gradient: 'from-indigo-500 to-purple-500',
      tagline: 'Reliable IT support when you need it',
      pricing: '₦200,000 - ₦500,000/month',
      priceNote: 'Based on number of users and support level required',
      description: '24/7 technical support and IT infrastructure management. From troubleshooting to network setup, we keep your technology running smoothly.',
      keyFeatures: [
        {
          title: '24/7 Support',
          desc: 'Round-the-clock technical assistance',
        },
        {
          title: 'Fast Response',
          desc: 'Average response time under 2 hours',
        },
        {
          title: 'Proactive Monitoring',
          desc: 'Prevent issues before they happen',
        },
        {
          title: 'Regular Updates',
          desc: 'Keep your systems secure and up-to-date',
        },
      ],
      deliverables: [
        '24/7 help desk support',
        'Network setup & management',
        'Hardware troubleshooting',
        'Software installation & updates',
        'User account management',
        'Security management',
        'Backup & disaster recovery',
        'IT asset management',
        'Remote support',
        'On-site support (when needed)',
        'Monthly maintenance reports',
        'IT strategy consulting',
      ],
      technologies: ['Windows Server', 'Linux', 'Active Directory', 'VPN', 'Firewall', 'Antivirus', 'Ticketing Systems'],
      processSteps: [
        { step: '1', title: 'IT Assessment', desc: 'Audit your current IT infrastructure', duration: '2-3 days' },
        { step: '2', title: 'Setup & Configuration', desc: 'Configure support systems and tools', duration: '2-5 days' },
        { step: '3', title: 'Team Training', desc: 'Train your team on support processes', duration: '1-2 days' },
        { step: '4', title: 'Go Live', desc: 'Activate support services', duration: '1 day' },
        { step: '5', title: 'Ongoing Support', desc: 'Continuous technical support', duration: 'Continuous' },
        { step: '6', title: 'Regular Reviews', desc: 'Quarterly IT health checks', duration: 'Quarterly' },
      ],
      faqs: [
        {
          q: 'What\'s your average response time?',
          a: 'Critical issues: within 1 hour. High priority: within 2 hours. Normal requests: within 4 hours during business hours.',
        },
        {
          q: 'Do you provide on-site support?',
          a: 'Yes, we provide on-site support when remote assistance isn\'t sufficient. This is included in premium plans or available as an add-on.',
        },
      ],
    },
    'ui-ux-design': {
      title: 'UI/UX Design Services',
      icon: '🎨',
      gradient: 'from-pink-500 to-rose-500',
      tagline: 'Beautiful designs that users love',
      pricing: 'Starting from ₦250,000',
      priceNote: 'Price varies based on project size and number of screens',
      description: 'User-centered design that combines aesthetics with functionality. We create intuitive interfaces that delight users and drive conversions.',
      keyFeatures: [
        {
          title: 'User-Centered',
          desc: 'Designed with your users in mind',
        },
        {
          title: 'Modern & Clean',
          desc: 'Contemporary designs that stand out',
        },
        {
          title: 'Conversion Focused',
          desc: 'Designs that drive business results',
        },
        {
          title: 'Fully Responsive',
          desc: 'Perfect on all devices and screen sizes',
        },
      ],
      deliverables: [
        'User research & personas',
        'Wireframes & user flows',
        'High-fidelity mockups',
        'Interactive prototypes',
        'Design system',
        'UI component library',
        'Responsive designs',
        'Icon & illustration design',
        'Usability testing',
        'Design documentation',
        'Developer handoff',
        'Revision rounds',
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Photoshop', 'Illustrator', 'Zeplin'],
      processSteps: [
        { step: '1', title: 'Discovery', desc: 'Understand your users, goals, and brand', duration: '2-3 days' },
        { step: '2', title: 'Research', desc: 'Competitive analysis and user research', duration: '2-4 days' },
        { step: '3', title: 'Wireframing', desc: 'Create initial layout and structure', duration: '3-5 days' },
        { step: '4', title: 'Visual Design', desc: 'Develop high-fidelity mockups', duration: '5-10 days' },
        { step: '5', title: 'Prototyping', desc: 'Create interactive prototypes', duration: '2-3 days' },
        { step: '6', title: 'Handoff', desc: 'Deliver designs to development team', duration: '1-2 days' },
      ],
      faqs: [
        {
          q: 'Do you do user research?',
          a: 'Yes, we conduct user interviews, surveys, and usability testing to ensure designs meet user needs and expectations.',
        },
        {
          q: 'How many revision rounds are included?',
          a: 'We include 2-3 revision rounds depending on the package. Additional revisions can be requested at an hourly rate.',
        },
      ],
    },
    'digital-transformation': {
      title: 'Digital Transformation Consulting',
      icon: '🚀',
      gradient: 'from-yellow-500 to-orange-500',
      tagline: 'Transform your business for the digital age',
      pricing: 'Request Consultation',
      priceNote: 'Each transformation journey is unique - let\'s discuss your needs',
      description: 'Strategic guidance to digitize your operations, improve efficiency, and stay competitive. We help traditional businesses embrace modern technology.',
      keyFeatures: [
        {
          title: 'Strategic Planning',
          desc: 'Comprehensive digital roadmap',
        },
        {
          title: 'Process Optimization',
          desc: 'Streamline operations with technology',
        },
        {
          title: 'Change Management',
          desc: 'Smooth transition for your team',
        },
        {
          title: 'ROI Focused',
          desc: 'Measurable business impact',
        },
      ],
      deliverables: [
        'Digital maturity assessment',
        'Transformation strategy',
        'Technology roadmap',
        'Process optimization plan',
        'Change management strategy',
        'Training programs',
        'Implementation support',
        'KPI definition & tracking',
        'Vendor selection guidance',
        'Budget planning',
        'Risk assessment',
        'Quarterly reviews',
      ],
      technologies: ['Business Intelligence', 'Cloud Platforms', 'Automation Tools', 'Analytics', 'CRM', 'ERP', 'Collaboration Tools'],
      processSteps: [
        { step: '1', title: 'Assessment', desc: 'Evaluate current digital maturity', duration: '1-2 weeks' },
        { step: '2', title: 'Strategy', desc: 'Develop transformation roadmap', duration: '2-3 weeks' },
        { step: '3', title: 'Planning', desc: 'Detailed implementation planning', duration: '1-2 weeks' },
        { step: '4', title: 'Execution', desc: 'Guide implementation of initiatives', duration: '3-12 months' },
        { step: '5', title: 'Training', desc: 'Train teams on new processes', duration: 'Ongoing' },
        { step: '6', title: 'Optimization', desc: 'Continuous improvement', duration: 'Continuous' },
      ],
      faqs: [
        {
          q: 'What is digital transformation?',
          a: 'Digital transformation is the process of using digital technologies to fundamentally change how your business operates and delivers value to customers.',
        },
        {
          q: 'How long does digital transformation take?',
          a: 'It varies by organization size and scope. Typically 6-18 months for significant transformation, but it\'s an ongoing journey.',
        },
      ],
    },
    'ai-data-solutions': {
      title: 'AI & Data Solutions',
      icon: '🤖',
      gradient: 'from-teal-500 to-green-500',
      tagline: 'Harness the power of data and AI',
      pricing: 'Request Quote',
      priceNote: 'Custom pricing based on data volume and AI complexity',
      description: 'Leverage artificial intelligence and data analytics to gain insights, automate processes, and make smarter business decisions.',
      keyFeatures: [
        {
          title: 'Predictive Analytics',
          desc: 'Forecast trends and outcomes',
        },
        {
          title: 'Automation',
          desc: 'Automate repetitive tasks with AI',
        },
        {
          title: 'Real-Time Insights',
          desc: 'Interactive dashboards and reports',
        },
        {
          title: 'Scalable Solutions',
          desc: 'Grows with your data needs',
        },
      ],
      deliverables: [
        'Data strategy & roadmap',
        'AI/ML model development',
        'Chatbot implementation',
        'Analytics dashboards',
        'Data pipeline setup',
        'Predictive models',
        'Natural language processing',
        'Computer vision solutions',
        'Data visualization',
        'Model training & optimization',
        'Integration with existing systems',
        'Ongoing model maintenance',
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Power BI', 'Tableau', 'Pandas', 'OpenAI API'],
      processSteps: [
        { step: '1', title: 'Data Assessment', desc: 'Evaluate your data readiness and quality', duration: '1-2 weeks' },
        { step: '2', title: 'Use Case Definition', desc: 'Identify high-value AI/data opportunities', duration: '1 week' },
        { step: '3', title: 'Model Development', desc: 'Build and train AI models', duration: '4-8 weeks' },
        { step: '4', title: 'Testing & Validation', desc: 'Validate model accuracy and performance', duration: '1-2 weeks' },
        { step: '5', title: 'Deployment', desc: 'Deploy to production with monitoring', duration: '1-2 weeks' },
        { step: '6', title: 'Optimization', desc: 'Continuous improvement and retraining', duration: 'Continuous' },
      ],
      faqs: [
        {
          q: 'Do I need a lot of data to use AI?',
          a: 'It depends on the use case. Some AI solutions require large datasets, while others (like chatbots) can work with smaller data volumes or pre-trained models.',
        },
        {
          q: 'What AI solutions do you offer?',
          a: 'We offer chatbots, predictive analytics, recommendation systems, computer vision, natural language processing, and custom AI models.',
        },
      ],
    },
  };

  const service = serviceData[serviceId] || serviceData['web-development'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${service.gradient} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/tech-services')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <FaArrowLeft />
            Back to Tech Services
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">{service.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{service.title}</h1>
              <p className="text-xl text-white/90">{service.tagline}</p>
            </div>
          </div>

          <p className="text-lg text-white/90 max-w-3xl mb-6">{service.description}</p>

          {/* Pricing Badge */}
          {service.pricing && (
            <div className="mb-8">
              <div className="inline-block bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{service.pricing}</span>
                </div>
                {service.priceNote && (
                  <p className="text-xs text-gray-600 mt-2 max-w-md">{service.priceNote}</p>
                )}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/request-quote"
              state={{ service: service.title }}
              className="bg-white text-[#0B1F3F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              Request a Quote
              <FaArrowRight />
            </Link>
            <a
              href="tel:+2341234567890"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2"
            >
              <FaPhone />
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose This Service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.keyFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#1E90FF] to-[#009688] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-3xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.deliverables.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Our Process */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Development Process</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1E90FF] to-[#009688] transform -translate-x-1/2"></div>

            {service.processSteps.map((step, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2"></div>
                <div className="absolute left-4 md:left-1/2 w-16 h-16 bg-gradient-to-r from-[#1E90FF] to-[#009688] rounded-full flex items-center justify-center transform md:-translate-x-1/2 shadow-lg z-10">
                  <span className="text-white text-xl font-bold">{step.step}</span>
                </div>
                <div className={`md:w-1/2 ml-24 md:ml-0 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-2">{step.desc}</p>
                    <span className="text-sm text-[#1E90FF] font-medium">⏱️ {step.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technologies We Use</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {service.technologies.map((tech, index) => (
            <div key={index} className="bg-gradient-to-r from-[#1E90FF] to-[#009688] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-110 transition-transform">
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {service.faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-2">
                  <span className="text-[#1E90FF]">Q:</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className={`bg-gradient-to-r ${service.gradient} py-16`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">
            Request a free quote and let's discuss how we can bring your vision to life
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/request-quote"
              state={{ service: service.title }}
              className="bg-white text-[#0B1F3F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              Request a Quote
              <FaArrowRight />
            </Link>
            <a
              href="mailto:info@eskaleight.com"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2"
            >
              <FaEnvelope />
              Email Us
            </a>
          </div>
          <p className="mt-6 text-white/80 text-sm">
            💬 Get a response within 24 hours | 📞 Free consultation available
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechServiceDetail;
