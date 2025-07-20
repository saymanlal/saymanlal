'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme-context';
import { Github, Twitter, Linkedin, Mail, ExternalLink, Star } from 'lucide-react';
import personalInfo from '@/lib/data/personal-info.json';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
};

export default function Footer() {
  const { settings } = useTheme();
  const isDeveloper = settings.theme === 'developer';
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([{
          rating,
          feedback,
          status: 'pending',
          author_name: 'Anonymous',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      toast.success('Thank you for your feedback!');
      setRating(0);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={`${
      isDeveloper 
        ? 'bg-black border-green-500/30 text-gray-300' 
        : 'bg-gray-50 border-gray-200 text-gray-600'
    } border-t transition-all duration-300`}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-lg font-bold mb-4 ${
              isDeveloper ? 'text-green-400 font-mono' : 'text-blue-600'
            }`}>
              {isDeveloper ? '<CodeChemist />' : personalInfo.name}
            </h3>
            <p className={`mb-4 max-w-md ${
              isDeveloper ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {personalInfo.bio}
            </p>
            <div className="flex space-x-4">
              {personalInfo.socials.slice(0, 4).map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons] || ExternalLink;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isDeveloper
                        ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    title={social.platform}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              isDeveloper ? 'text-green-400' : 'text-gray-900'
            }`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'About', href: '/about' },
                { name: 'Projects', href: '/projects' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 ${
                      isDeveloper
                        ? 'text-gray-400 hover:text-green-400'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              isDeveloper ? 'text-green-400' : 'text-gray-900'
            }`}>
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Certificates', href: '/certificates' },
                { name: 'CLI Playground', href: '/cli' },
                { name: 'Resume', href: personalInfo.resumeUrl || '#' },
                { name: 'Experience', href: '/timeline' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`transition-colors duration-200 ${
                      isDeveloper
                        ? 'text-gray-400 hover:text-green-400'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback Form */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className={`font-semibold mb-4 ${
              isDeveloper ? 'text-green-400' : 'text-gray-900'
            }`}>
              Rate My Portfolio
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`p-1 transition-colors duration-200 ${
                        ratingValue <= (hover || rating)
                          ? isDeveloper 
                            ? 'text-yellow-400' 
                            : 'text-yellow-500'
                          : isDeveloper 
                            ? 'text-gray-500' 
                            : 'text-gray-300'
                      }`}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <Star 
                        className="h-5 w-5" 
                        fill={ratingValue <= (hover || rating) ? 'currentColor' : 'none'} 
                      />
                    </button>
                  );
                })}
              </div>
              <textarea
                placeholder="Optional feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={`w-full px-3 py-2 mb-2 rounded-lg border text-sm ${
                  isDeveloper
                    ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                    : 'bg-white border-gray-300 text-gray-600 focus:border-blue-500'
                }`}
                rows={2}
              />
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isSubmitting || rating === 0
                    ? isDeveloper
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : isDeveloper
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${
          isDeveloper ? 'border-green-500/30' : 'border-gray-200'
        } flex flex-col md:flex-row justify-between items-center`}>
          <p className={`text-sm ${
            isDeveloper ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className={`text-sm mt-2 md:mt-0 ${
            isDeveloper ? 'text-gray-400 font-mono' : 'text-gray-600'
          }`}>
            {isDeveloper ? '> Built with Next.js, TypeScript & ❤️' : 'Built with Next.js, TypeScript & ❤️'}
          </p>
        </div>
      </div>
    </footer>
  );
}