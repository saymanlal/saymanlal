'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../lib/theme-context';
import { Calendar, Clock, Eye, Heart, Tag, Search, BookOpen } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  published: boolean;
  status: 'draft' | 'published';
  tags: string[];
  read_time: number;
  views: number;
  likes: number;
  published_at?: string;
  created_at: string;
}

export default function BlogPage() {
  const { settings } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const isDeveloper = settings.theme === 'developer';

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [supabase]);

  // Get all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  );

  // Filter posts based on search and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag && post.published;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className={`mb-4 ${
              isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'
            }`}>
              Blog
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Thoughts on AI, Web3, and the future of technology
            </p>
          </div>

          {/* Search and Filter */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isDeveloper ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
                  isDeveloper
                    ? 'bg-gray-800/50 border-gray-600 text-green-400 placeholder-gray-400 focus:border-green-400 focus:ring-1 focus:ring-green-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  !selectedTag
                    ? isDeveloper
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                      : 'bg-blue-600 text-white'
                    : isDeveloper
                      ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50'
                }`}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                        : 'bg-blue-600 text-white'
                      : isDeveloper
                        ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className={`rounded-xl overflow-hidden transition-all duration-300 card-hover ${
                  isDeveloper 
                    ? 'glass-dark border-green-500/30' 
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Cover Image */}
                {post.cover_image && (
                  <div className="relative overflow-hidden w-full h-48">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className={`flex items-center space-x-4 text-sm mb-3 ${
                    isDeveloper ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(post.published_at || post.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.read_time} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className={`text-xl font-bold mb-3 line-clamp-2 ${
                    isDeveloper ? 'text-green-400' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className={`mb-4 line-clamp-3 ${
                    isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          isDeveloper
                            ? 'bg-gray-800/50 text-gray-300 border border-gray-700'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className={`flex items-center justify-between text-sm ${
                    isDeveloper ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                    <button
                      className={`font-medium transition-colors duration-200 ${
                        isDeveloper
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className={`text-6xl mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-400'}`}>
                📝
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDeveloper ? 'text-green-400' : 'text-gray-900'
              }`}>
                No articles found
              </h3>
              <p className={`${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}

          {/* Newsletter Signup */}
          <motion.div
            className={`mt-16 p-8 rounded-xl text-center ${
              isDeveloper 
                ? 'glass-dark border-green-500/30' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className={`text-2xl font-bold mb-4 ${
              isDeveloper ? 'text-green-400' : 'text-gray-900'
            }`}>
              Stay Updated
            </h3>
            <p className={`mb-6 max-w-2xl mx-auto ${
              isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get notified when I publish new articles about AI, Web3, and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isDeveloper
                    ? 'bg-gray-800/50 border-gray-600 text-green-400 placeholder-gray-400 focus:border-green-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
              />
              <button className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isDeveloper
                  ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                Subscribe
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}