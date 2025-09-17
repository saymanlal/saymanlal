'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { Calendar, Clock, Search, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
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
  published_at?: string;
  created_at: string;
}

export default function BlogPage() {
  const { settings } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

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

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePost(null);
    };
    if (activePost) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activePost]);

  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag && post.published;
  });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // helper to build quoted preview ending with ellipsis
  const buildQuotedPreview = (post: BlogPost) => {
    const raw =
      (post.excerpt && post.excerpt.trim()) ||
      (post.content
        ? post.content.trim().split('\n')[0].split('.').filter(Boolean)[0]
        : '');
    const cleaned = raw.replace(/(^["“”']|["“”']$)/g, '').trim();
    if (!cleaned) return '';
    const ending = cleaned.endsWith('...') ? '' : '...';
    return `"${cleaned}${ending}"`;
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
            <h1
              className={`mb-4 ${
                isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'
              }`}
            >
              Blog
            </h1>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                isDeveloper ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Thoughts on AI, Web3, and the future of technology
            </p>
          </div>

          {/* Search + Tags */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mb-6">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDeveloper ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
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

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const previewQuoted = buildQuotedPreview(post);

              return (
                <motion.article
                  key={post.id}
                  className={`rounded-xl overflow-hidden transition-all duration-300 card-hover ${
                    isDeveloper
                      ? 'glass-dark border-green-500/30'
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.06 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
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
                    <div
                      className={`flex items-center space-x-4 text-sm mb-3 ${
                        isDeveloper ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
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

                    <h2
                      className={`text-xl font-bold mb-2 ${
                        isDeveloper ? 'text-green-400' : 'text-gray-900'
                      }`}
                    >
                      {post.title}
                    </h2>

                    {/* Italic quoted preview (first line) */}
                    {previewQuoted && (
                      <p
                        className={`italic text-sm mb-3 ${
                          isDeveloper ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {previewQuoted}
                      </p>
                    )}

                    {/* Tags shown inside the card */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 rounded-md text-xs font-medium ${
                              isDeveloper
                                ? 'bg-gray-800 text-gray-300'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => setActivePost(post)}
                      className={`font-medium transition-colors duration-200 ${
                        isDeveloper
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      Read More →
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Overlay Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePost(null)} // close when clicking backdrop
          >
            <motion.div
              className={`relative w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden shadow-xl ${
                isDeveloper ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
              }`}
              initial={{ y: 30, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()} // prevent backdrop close
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal content */}
              <div className="h-full overflow-y-auto">
                <div className="mx-auto max-w-3xl p-8">
                  <h1
                    className={`text-2xl font-bold mb-6 ${
                      isDeveloper ? 'text-green-400' : 'text-gray-900'
                    }`}
                  >
                    {activePost.title}
                  </h1>

                  {activePost.cover_image && (
                    <div className="w-full mb-6 rounded overflow-hidden">
                      <Image
                        src={activePost.cover_image}
                        alt={activePost.title}
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover rounded"
                      />
                    </div>
                  )}

                  <div
                    className={`prose prose-lg max-w-none ${
                      isDeveloper ? 'prose-invert prose-green' : 'prose-blue'
                    }`}
                    dangerouslySetInnerHTML={{ __html: activePost.content }}
                  />

                  <div className="h-8" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
