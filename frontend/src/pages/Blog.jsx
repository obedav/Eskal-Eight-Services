import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'industry-news', name: 'Industry News' },
    { id: 'tips', name: 'Tips & Guides' },
    { id: 'projects', name: 'Project Updates' },
    { id: 'company', name: 'Company News' },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Best Practices in Procurement Management for 2024',
      excerpt: 'Discover the latest trends and best practices in procurement management that can help your organization save costs and improve efficiency.',
      category: 'tips',
      author: 'John Doe',
      date: '2024-10-15',
      readTime: '5 min read',
      image: '📋',
    },
    {
      id: 2,
      title: 'How to Choose the Right Logistics Partner',
      excerpt: 'A comprehensive guide to selecting a logistics partner that meets your business needs and delivers reliable service.',
      category: 'tips',
      author: 'Jane Smith',
      date: '2024-10-10',
      readTime: '7 min read',
      image: '🚚',
    },
    {
      id: 3,
      title: 'Recent Trends in Construction Technology',
      excerpt: 'Explore the cutting-edge technologies transforming the construction industry, from BIM to sustainable building materials.',
      category: 'industry-news',
      author: 'Michael Johnson',
      date: '2024-10-05',
      readTime: '6 min read',
      image: '🏗️',
    },
    {
      id: 4,
      title: 'ESKAL EIGHT Completes Major Government Project',
      excerpt: 'We are proud to announce the successful completion of a major procurement project for a federal government agency.',
      category: 'company',
      author: 'ESKAL EIGHT Team',
      date: '2024-10-01',
      readTime: '4 min read',
      image: '🎉',
    },
    {
      id: 5,
      title: 'Safety First: Construction Site Safety Guidelines',
      excerpt: 'Essential safety guidelines and best practices for maintaining a safe construction site environment.',
      category: 'tips',
      author: 'Sarah Williams',
      date: '2024-09-25',
      readTime: '8 min read',
      image: '⚠️',
    },
    {
      id: 6,
      title: 'The Future of Supply Chain Management in Nigeria',
      excerpt: 'An in-depth look at emerging trends and challenges in supply chain management across Nigeria.',
      category: 'industry-news',
      author: 'David Brown',
      date: '2024-09-20',
      readTime: '10 min read',
      image: '📊',
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, updates, and expert advice on procurement, logistics,
              construction, and more
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-[#0B1F3F] to-[#112B4A] h-64 md:h-auto flex items-center justify-center">
              <span className="text-9xl">{featuredPost.image}</span>
            </div>
            <div className="p-8">
              <span className="inline-block px-3 py-1 bg-[#1E90FF] text-white text-xs font-semibold rounded-full mb-4">
                FEATURED POST
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>{featuredPost.author}</span>
                <span>•</span>
                <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <Link
                to={`/blog/${featuredPost.id}`}
                className="inline-block bg-[#1E90FF] text-white px-6 py-3 rounded-lg hover:bg-[#0077CC] transition-colors font-medium"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#1E90FF] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-br from-[#0B1F3F] to-[#112B4A] h-48 flex items-center justify-center">
                <span className="text-7xl">{post.image}</span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#1E90FF] bg-opacity-10 text-[#1E90FF] text-xs font-semibold rounded-full">
                    {categories.find(c => c.id === post.category)?.name}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-[#1E90FF] hover:text-[#0077CC] font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No articles found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8">
            Get the latest insights and updates delivered straight to your inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            <button
              type="submit"
              className="bg-[#1E90FF] text-white px-8 py-3 rounded-lg hover:bg-[#0077CC] transition-colors font-medium whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
