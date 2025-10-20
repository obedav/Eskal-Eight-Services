import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog post data - will be replaced with API call
  const post = {
    id: parseInt(id),
    title: 'Best Practices in Procurement Management for 2024',
    category: 'tips',
    author: 'John Doe',
    authorRole: 'Procurement Specialist',
    date: '2024-10-15',
    readTime: '5 min read',
    image: '📋',
    content: `
      Procurement management is a critical function that can significantly impact an organization's bottom line. As we move into 2024, new trends and technologies are reshaping how businesses approach procurement.

      ## Understanding Modern Procurement

      Modern procurement goes beyond simple purchasing. It encompasses strategic sourcing, supplier relationship management, contract management, and continuous process improvement.

      ### Key Principles

      1. **Strategic Alignment**: Ensure procurement activities align with organizational goals
      2. **Value Creation**: Focus on total cost of ownership, not just purchase price
      3. **Risk Management**: Identify and mitigate supply chain risks
      4. **Sustainability**: Consider environmental and social impacts
      5. **Technology Integration**: Leverage digital tools for efficiency

      ## Best Practices for 2024

      ### 1. Implement Digital Procurement Tools

      Digital transformation is no longer optional. Organizations should invest in:
      - E-procurement platforms
      - Supplier portals
      - Automated approval workflows
      - Real-time analytics and reporting

      ### 2. Build Strong Supplier Relationships

      Move beyond transactional relationships to strategic partnerships. This includes:
      - Regular performance reviews
      - Joint improvement initiatives
      - Transparent communication
      - Fair contract terms

      ### 3. Focus on Data-Driven Decision Making

      Use data analytics to:
      - Identify cost-saving opportunities
      - Track supplier performance
      - Predict market trends
      - Optimize inventory levels

      ### 4. Embrace Sustainability

      Sustainable procurement is becoming a business imperative:
      - Evaluate suppliers' environmental practices
      - Consider lifecycle costs
      - Support local suppliers when possible
      - Reduce packaging waste

      ### 5. Ensure Compliance and Risk Management

      Maintain robust systems for:
      - Regulatory compliance
      - Contract management
      - Audit trails
      - Risk assessment

      ## Conclusion

      Effective procurement management requires a balanced approach that combines strategic thinking, technology adoption, and strong relationships. By implementing these best practices, organizations can achieve significant cost savings while maintaining quality and supporting business objectives.

      At ESKAL EIGHT SERVICES, we help organizations implement these best practices through our comprehensive procurement solutions. Contact us to learn how we can support your procurement needs.
    `,
    tags: ['Procurement', 'Best Practices', 'Supply Chain', 'Business Strategy'],
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'How to Choose the Right Logistics Partner',
      image: '🚚',
      date: '2024-10-10',
    },
    {
      id: 3,
      title: 'Recent Trends in Construction Technology',
      image: '🏗️',
      date: '2024-10-05',
    },
    {
      id: 5,
      title: 'Safety First: Construction Site Safety Guidelines',
      image: '⚠️',
      date: '2024-09-25',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </button>

          <span className="inline-block px-3 py-1 bg-[#1E90FF] text-white text-sm font-semibold rounded-full mb-4">
            {post.category.toUpperCase()}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-6 text-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1E90FF] rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="font-medium text-white">{post.author}</div>
                <div className="text-sm">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-md p-8">
              {/* Feature Image */}
              <div className="bg-gradient-to-br from-[#0B1F3F] to-[#112B4A] h-64 rounded-lg flex items-center justify-center mb-8">
                <span className="text-9xl">{post.image}</span>
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('##')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {paragraph.replace('##', '').trim()}
                      </h2>
                    );
                  } else if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  } else if (paragraph.trim().match(/^\d+\./)) {
                    const items = paragraph.split('\n').filter(line => line.trim());
                    return (
                      <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-700">
                            {item.replace(/^\d+\.\s*\*?\*?/, '').replace(/\*\*/g, '')}
                          </li>
                        ))}
                      </ol>
                    );
                  } else if (paragraph.includes('- ')) {
                    const items = paragraph.split('\n').filter(line => line.trim().startsWith('-'));
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-700">
                            {item.replace(/^-\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  } else if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph.trim()}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Share this article:
                </h4>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Facebook
                  </button>
                  <button className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm">
                    Twitter
                  </button>
                  <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm">
                    LinkedIn
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                About the Author
              </h3>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-16 h-16 bg-[#1E90FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author}</div>
                  <div className="text-sm text-gray-600">{post.authorRole}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Expert in procurement and supply chain management with over 10 years of experience.
              </p>
            </div>

            {/* Related Posts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Related Articles
              </h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="block group"
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0B1F3F] to-[#112B4A] rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{relatedPost.image}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#1E90FF] line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(relatedPost.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/blog"
                className="block mt-4 text-[#1E90FF] hover:underline text-sm font-medium"
              >
                View All Articles →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Expert Procurement Services?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact ESKAL EIGHT SERVICES for comprehensive procurement solutions tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-quote"
              className="bg-[#1E90FF] text-white px-8 py-3 rounded-lg hover:bg-[#0077CC] transition-colors font-medium"
            >
              Request a Quote
            </Link>
            <Link
              to="/contact"
              className="bg-white text-[#0B1F3F] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
