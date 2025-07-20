'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { Plus, Edit, Trash2, Eye, Settings, BarChart, Users, FileText } from 'lucide-react';

interface AdminStats {
  projects: number;
  certificates: number;
  testimonials: number;
  blogPosts: number;
  totalViews: number;
  contactForms: number;
}

export default function AdminPage() {
  const { settings } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const isDeveloper = settings.theme === 'developer';

  // Mock admin stats
  const stats: AdminStats = {
    projects: 12,
    certificates: 6,
    testimonials: 15,
    blogPosts: 8,
    totalViews: 2547,
    contactForms: 23,
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart },
    { id: 'projects', name: 'Projects', icon: FileText },
    { id: 'certificates', name: 'Certificates', icon: FileText },
    { id: 'testimonials', name: 'Testimonials', icon: Users },
    { id: 'blog', name: 'Blog Posts', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FileText, color: 'blue' },
    { label: 'Certificates', value: stats.certificates, icon: FileText, color: 'green' },
    { label: 'Testimonials', value: stats.testimonials, icon: Users, color: 'purple' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: FileText, color: 'orange' },
    { label: 'Total Views', value: stats.totalViews, icon: Eye, color: 'red' },
    { label: 'Contact Forms', value: stats.contactForms, icon: Users, color: 'indigo' },
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${
              isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'
            }`}>
              {isDeveloper ? '// Admin Panel' : 'Admin Dashboard'}
            </h1>
            <p className={`text-lg ${
              isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Manage your portfolio content and settings
            </p>
            
            {/* Auth Notice */}
            <div className={`mt-4 p-4 rounded-lg ${
              isDeveloper 
                ? 'bg-yellow-400/20 border border-yellow-400/30 text-yellow-400'
                : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
            }`}>
              <p className="text-sm">
                <strong>Demo Mode:</strong> This is a preview of the admin panel. 
                Authentication and real CRUD operations will be available after Supabase integration.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className={`p-6 rounded-xl ${
                isDeveloper 
                  ? 'glass-dark border-green-500/30' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h2 className={`text-lg font-semibold mb-4 ${
                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                }`}>
                  Navigation
                </h2>
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeTab === tab.id
                            ? isDeveloper
                              ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                              : 'bg-blue-50 text-blue-600 border border-blue-200'
                            : isDeveloper
                              ? 'text-gray-300 hover:bg-green-400/10 hover:text-green-400'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {statCards.map((stat) => (
                      <div
                        key={stat.label}
                        className={`p-6 rounded-xl ${
                          isDeveloper 
                            ? 'glass-dark border-green-500/30' 
                            : 'bg-white border border-gray-200 shadow-lg'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${
                              isDeveloper ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {stat.label}
                            </p>
                            <p className={`text-2xl font-bold ${
                              isDeveloper ? 'text-green-400' : 'text-gray-900'
                            }`}>
                              {stat.value.toLocaleString()}
                            </p>
                          </div>
                          <div className={`p-3 rounded-lg ${
                            isDeveloper ? 'bg-green-400/20 text-green-400' : 'bg-blue-50 text-blue-600'
                          }`}>
                            <stat.icon className="h-6 w-6" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className={`p-6 rounded-xl ${
                    isDeveloper 
                      ? 'glass-dark border-green-500/30' 
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      isDeveloper ? 'text-green-400' : 'text-gray-900'
                    }`}>
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {[
                        { action: 'New project added', item: 'AI Code Assistant', time: '2 hours ago' },
                        { action: 'Certificate updated', item: 'AWS Solutions Architect', time: '1 day ago' },
                        { action: 'Blog post published', item: 'Future of AI in Web Dev', time: '3 days ago' },
                        { action: 'Testimonial received', item: 'From Sarah Johnson', time: '1 week ago' },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between py-3 border-b last:border-b-0 ${
                            isDeveloper ? 'border-gray-700' : 'border-gray-200'
                          }`}
                        >
                          <div>
                            <p className={`font-medium ${
                              isDeveloper ? 'text-green-400' : 'text-gray-900'
                            }`}>
                              {activity.action}
                            </p>
                            <p className={`text-sm ${
                              isDeveloper ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {activity.item}
                            </p>
                          </div>
                          <span className={`text-sm ${
                            isDeveloper ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {activity.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab !== 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`p-8 rounded-xl ${
                    isDeveloper 
                      ? 'glass-dark border-green-500/30' 
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-2xl font-bold ${
                      isDeveloper ? 'text-green-400' : 'text-gray-900'
                    }`}>
                      {tabs.find(tab => tab.id === activeTab)?.name}
                    </h2>
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      <Plus className="h-4 w-4" />
                      <span>Add New</span>
                    </button>
                  </div>

                  {/* Content Management Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${
                          isDeveloper ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <th className={`text-left py-3 px-4 font-semibold ${
                            isDeveloper ? 'text-green-400' : 'text-gray-900'
                          }`}>
                            Title
                          </th>
                          <th className={`text-left py-3 px-4 font-semibold ${
                            isDeveloper ? 'text-green-400' : 'text-gray-900'
                          }`}>
                            Status
                          </th>
                          <th className={`text-left py-3 px-4 font-semibold ${
                            isDeveloper ? 'text-green-400' : 'text-gray-900'
                          }`}>
                            Date
                          </th>
                          <th className={`text-right py-3 px-4 font-semibold ${
                            isDeveloper ? 'text-green-400' : 'text-gray-900'
                          }`}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5].map((item) => (
                          <tr
                            key={item}
                            className={`border-b last:border-b-0 ${
                              isDeveloper ? 'border-gray-700' : 'border-gray-200'
                            }`}
                          >
                            <td className={`py-4 px-4 ${
                              isDeveloper ? 'text-gray-300' : 'text-gray-900'
                            }`}>
                              Sample {tabs.find(tab => tab.id === activeTab)?.name} {item}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isDeveloper
                                  ? 'bg-green-400/20 text-green-400'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                Published
                              </span>
                            </td>
                            <td className={`py-4 px-4 text-sm ${
                              isDeveloper ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Nov {item}, 2024
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button className={`p-2 rounded-lg transition-colors duration-200 ${
                                  isDeveloper
                                    ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                }`}>
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className={`p-2 rounded-lg transition-colors duration-200 ${
                                  isDeveloper
                                    ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                }`}>
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className={`p-2 rounded-lg transition-colors duration-200 ${
                                  isDeveloper
                                    ? 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                                }`}>
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}