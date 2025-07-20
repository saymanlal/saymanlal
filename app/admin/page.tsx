'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import {
  Plus, Edit, Trash2, Eye, EyeOff, Settings, BarChart, Users, FileText,
  Github, ExternalLink, Calendar, Tag, Star, BookOpen, Award,
  CheckCircle, Search, Filter,
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
// Add this with your other imports
import StatCard from '../../components/ui/StatCard';

type AdminTab = 'projects' | 'blog' | 'certificates' | 'testimonials';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image_url?: string;
  project_url?: string;
  github_url?: string;
  demo_url?: string;
  status: 'planned' | 'in-progress' | 'completed';
  featured: boolean;
  category: 'personal' | 'aialchemist' | 'vasiliades';
  technologies: string[];
  created_at: string;
  updated_at: string;
}

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
  updated_at: string;
}

interface Certificate {
  id: string;
  title: string;
  organization: string;
  credential_id?: string;
  credential_url?: string;
  image_url: string;
  issue_date: string;
  expiry_date?: string;
  verified: boolean;
  skills: string[];
  created_at: string;
  updated_at: string;
}

export default function AdminPage() {
  const { settings } = useTheme();
  const [activeTab, setActiveTab] = useState<AdminTab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Project | BlogPost | Certificate | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const supabase = createClientComponentClient();
  const isDeveloper = settings.theme === 'developer';

  const tabs = [
    { id: 'projects', name: 'Projects', icon: FileText },
    { id: 'blog', name: 'Blog Posts', icon: BookOpen },
    { id: 'certificates', name: 'Certificates', icon: Award },
    { id: 'testimonials', name: 'Testimonials', icon: Star },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === 'projects') {
          // ... existing projects fetch
        } else if (activeTab === 'blog') {
          // ... existing blog fetch
        } else if (activeTab === 'certificates') {
          // ... existing certificates fetch
        } else if (activeTab === 'testimonials') {
          const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          setTestimonials(data || []);
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
        toast.error(`Failed to load ${activeTab}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleAddNew = () => {
    setEditingItem(null);
    if (activeTab === 'projects') {
      setFormData({
        title: '',
        description: '',
        status: 'planned',
        featured: false,
        category: 'personal',
        technologies: [],
      });
    } else if (activeTab === 'blog') {
      setFormData({
        title: '',
        slug: '',
        content: '',
        status: 'draft',
        published: false,
        tags: [],
        read_time: 5,
      });
    } else if (activeTab === 'certificates') {
      setFormData({
        title: '',
        organization: '',
        image_url: '',
        issue_date: new Date().toISOString(),
        verified: false,
        skills: [],
      });
    }
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      let error;
      if (activeTab === 'projects') {
        ({ error } = await supabase.from('projects').delete().eq('id', id));
      } else if (activeTab === 'blog') {
        ({ error } = await supabase.from('blog_posts').delete().eq('id', id));
      } else if (activeTab === 'certificates') {
        ({ error } = await supabase.from('certificates').delete().eq('id', id));
      } else if (activeTab === 'testimonials') {
        ({ error } = await supabase.from('testimonials').delete().eq('id', id));
      }

      if (error) throw error;

      // Update state
      if (activeTab === 'projects') {
        setProjects(prev => prev.filter(item => item.id !== id));
      } else if (activeTab === 'blog') {
        setBlogPosts(prev => prev.filter(item => item.id !== id));
      } else if (activeTab === 'certificates') {
        setCertificates(prev => prev.filter(item => item.id !== id));
      } else if (activeTab === 'testimonials') {
        setTestimonials(prev => prev.filter(item => item.id !== id));
      }

      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleEdit = (item: Project | BlogPost | Certificate | any) => {
    if (activeTab === 'testimonials') {
      const newStatus = item.status === 'approved' ? 'pending' : 'approved';
      handleUpdateTestimonial(item.id, newStatus);
      return;
    }
    setEditingItem(item);
    setFormData({ ...item });
    setIsFormOpen(true);
  };

  const handleUpdateTestimonial = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setTestimonials(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status } : item
        )
      );
      toast.success('Testimonial updated successfully');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update testimonial');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let data, error;
      if (activeTab === 'projects') {
        if (editingItem) {
          ({ data, error } = await supabase
            .from('projects')
            .update(formData)
            .eq('id', editingItem.id)
            .select());
        } else {
          ({ data, error } = await supabase
            .from('projects')
            .insert([formData])
            .select());
        }
      } else if (activeTab === 'blog') {
        if (editingItem) {
          ({ data, error } = await supabase
            .from('blog_posts')
            .update(formData)
            .eq('id', editingItem.id)
            .select());
        } else {
          ({ data, error } = await supabase
            .from('blog_posts')
            .insert([formData])
            .select());
        }
      } else if (activeTab === 'certificates') {
        if (editingItem) {
          ({ data, error } = await supabase
            .from('certificates')
            .update(formData)
            .eq('id', editingItem.id)
            .select());
        } else {
          ({ data, error } = await supabase
            .from('certificates')
            .insert([formData])
            .select());
        }
      }

      if (error) throw error;

      // Update state
      if (data && data[0]) {
        if (activeTab === 'projects') {
          setProjects(prev =>
            editingItem
              ? prev.map(item => item.id === editingItem.id ? data[0] : item)
              : [data[0], ...prev]
          );
        } else if (activeTab === 'blog') {
          setBlogPosts(prev =>
            editingItem
              ? prev.map(item => item.id === editingItem.id ? data[0] : item)
              : [data[0], ...prev]
          );
        } else if (activeTab === 'certificates') {
          setCertificates(prev =>
            editingItem
              ? prev.map(item => item.id === editingItem.id ? data[0] : item)
              : [data[0], ...prev]
          );
        }
      }

      toast.success(`Item ${editingItem ? 'updated' : 'created'} successfully`);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error(`Failed to ${editingItem ? 'update' : 'create'} item`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'published':
        return isDeveloper ? 'text-green-400 bg-green-400/20' : 'text-green-600 bg-green-50';
      case 'in-progress':
        return isDeveloper ? 'text-yellow-400 bg-yellow-400/20' : 'text-yellow-600 bg-yellow-50';
      case 'planned':
      case 'draft':
        return isDeveloper ? 'text-blue-400 bg-blue-400/20' : 'text-blue-600 bg-blue-50';
      default:
        return isDeveloper ? 'text-gray-400 bg-gray-400/20' : 'text-gray-600 bg-gray-50';
    }
  };

  const filteredItems = () => {
    const items = activeTab === 'projects' ? projects :
      activeTab === 'blog' ? blogPosts :
        activeTab === 'certificates' ? certificates :
          testimonials;

    return items.filter(item =>
      activeTab === 'testimonials'
        ? item.feedback?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.author_name?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
        : item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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
            <h1 className={`text-3xl font-bold mb-2 ${isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'
              }`}>
              {isDeveloper ? 'Admin Panel' : 'Admin Dashboard'}
            </h1>
            <p className={`text-lg ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Manage your portfolio content
            </p>
          </div>

          {/* Add this below your header */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={FileText}
              value={projects.length}
              label="Projects"
              isDeveloper={isDeveloper}
            />
            <StatCard
              icon={BookOpen}
              value={blogPosts.length}
              label="Blog Posts"
              isDeveloper={isDeveloper}
            />
            <StatCard
              icon={Award}
              value={certificates.length}
              label="Certificates"
              isDeveloper={isDeveloper}
            />
            <StatCard
              icon={Star}
              value={testimonials.length}
              label="Testimonials"
              isDeveloper={isDeveloper}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className={`p-6 rounded-xl ${isDeveloper
                ? 'glass-dark border-green-500/30'
                : 'bg-white border border-gray-200 shadow-lg'
                }`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-900'
                  }`}>
                  Navigation
                </h2>
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id as AdminTab)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${activeTab === tab.id
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
              {/* Search and Add New */}
              {/* Search and Add New */}
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDeveloper ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDeveloper
                      ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                      : 'bg-white border-gray-300 focus:border-blue-500'}`}
                  />
                </div>
                {activeTab !== 'testimonials' && (
                  <button
                    onClick={handleAddNew}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isDeveloper
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                      : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New</span>
                  </button>
                )}
              </div>

              {/* Content Table */}
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse h-16 bg-gray-100 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <div className={`p-6 rounded-xl ${isDeveloper
                  ? 'glass-dark border-green-500/30'
                  : 'bg-white border border-gray-200 shadow-lg'
                  }`}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${isDeveloper ? 'border-gray-700' : 'border-gray-200'
                          }`}>
                          <th className="text-left py-3 px-4 font-semibold">Title</th>
                          {activeTab === 'projects' && (
                            <>
                              <th className="text-left py-3 px-4 font-semibold">Status</th>
                              <th className="text-left py-3 px-4 font-semibold">Category</th>
                            </>
                          )}
                          {activeTab === 'blog' && (
                            <>
                              <th className="text-left py-3 px-4 font-semibold">Status</th>
                              <th className="text-left py-3 px-4 font-semibold">Views</th>
                            </>
                          )}
                          {activeTab === 'certificates' && (
                            <>
                              <th className="text-left py-3 px-4 font-semibold">Organization</th>
                              <th className="text-left py-3 px-4 font-semibold">Verified</th>
                            </>
                          )}
                          {activeTab === 'testimonials' && (
                            <>
                              <th className="text-left py-3 px-4 font-semibold">Rating</th>
                              <th className="text-left py-3 px-4 font-semibold">Feedback</th>
                              <th className="text-left py-3 px-4 font-semibold">Status</th>
                              <th className="text-left py-3 px-4 font-semibold">Date</th>
                            </>
                          )}
                          <th className="text-right py-3 px-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems().map((item) => (
                          <tr
                            key={item.id}
                            className={`border-b last:border-b-0 ${isDeveloper ? 'border-gray-700' : 'border-gray-200'
                              }`}
                          >
                            {/* Testimonials Tab */}
                            {activeTab === 'testimonials' ? (
                              <>
                                <td className="py-4 px-4">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < item.rating
                                            ? isDeveloper
                                              ? 'text-yellow-400 fill-yellow-400'
                                              : 'text-yellow-500 fill-yellow-500'
                                            : 'text-gray-300 dark:text-gray-600'
                                          }`}
                                      />
                                    ))}
                                  </div>
                                </td>
                                <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                  }`}>
                                  {item.feedback || '-'}
                                </td>
                                <td className="py-4 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'approved'
                                      ? isDeveloper
                                        ? 'text-green-400 bg-green-400/20'
                                        : 'text-green-600 bg-green-50'
                                      : isDeveloper
                                        ? 'text-yellow-400 bg-yellow-400/20'
                                        : 'text-yellow-600 bg-yellow-50'
                                    }`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                  }`}>
                                  {new Date(item.created_at).toLocaleDateString()}
                                </td>
                              </>
                            ) : (
                              <>
                                {/* Common Title Column for other tabs */}
                                <td className="py-4 px-4">
                                  <div className="flex items-center space-x-3">
                                    {(activeTab === 'projects' && (item as Project).image_url) && (
                                      <img
                                        src={(item as Project).image_url}
                                        alt={item.title}
                                        className="w-10 h-10 rounded-md object-cover"
                                      />
                                    )}
                                    <p className={`font-medium ${isDeveloper ? 'text-gray-300' : 'text-gray-900'
                                      }`}>
                                      {item.title}
                                    </p>
                                  </div>
                                </td>

                                {/* Projects Tab Specific Columns */}
                                {activeTab === 'projects' && (
                                  <>
                                    <td className="py-4 px-4">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor((item as Project).status)
                                        }`}>
                                        {(item as Project).status.replace('-', ' ')}
                                      </span>
                                    </td>
                                    <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                      }`}>
                                      {(item as Project).category === 'aialchemist' ? 'AIALCHEMIST' :
                                        (item as Project).category === 'vasiliades' ? 'VASILIADES' :
                                          (item as Project).category.charAt(0).toUpperCase() + (item as Project).category.slice(1)}
                                    </td>
                                  </>
                                )}

                                {/* Blog Tab Specific Columns */}
                                {activeTab === 'blog' && (
                                  <>
                                    <td className="py-4 px-4">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor((item as BlogPost).status)
                                        }`}>
                                        {(item as BlogPost).status}
                                      </span>
                                    </td>
                                    <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                      }`}>
                                      {(item as BlogPost).views}
                                    </td>
                                  </>
                                )}

                                {/* Certificates Tab Specific Columns */}
                                {activeTab === 'certificates' && (
                                  <>
                                    <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                      }`}>
                                      {(item as Certificate).organization}
                                    </td>
                                    <td className="py-4 px-4">
                                      {(item as Certificate).verified ? (
                                        <CheckCircle className={`h-5 w-5 ${isDeveloper ? 'text-green-400' : 'text-green-600'
                                          }`} />
                                      ) : (
                                        <span className={`text-xs ${isDeveloper ? 'text-gray-400' : 'text-gray-500'
                                          }`}>-</span>
                                      )}
                                    </td>
                                  </>
                                )}
                              </>
                            )}

                            {/* Actions Column (common for all tabs) */}
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className={`p-2 rounded-lg transition-colors duration-200 ${isDeveloper
                                      ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                  {activeTab === 'testimonials' ? (
                                    item.status === 'approved' ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <CheckCircle className="h-4 w-4" />
                                    )
                                  ) : (
                                    <Edit className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className={`p-2 rounded-lg transition-colors duration-200 ${isDeveloper
                                      ? 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                                    }`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full max-w-2xl rounded-xl p-6 ${isDeveloper
                  ? 'glass-dark border-green-500/30'
                  : 'bg-white border border-gray-200 shadow-xl'
                  }`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-900'
                  }`}>
                  {editingItem ? 'Edit' : 'Add New'} {activeTab === 'projects' ? 'Project' :
                    activeTab === 'blog' ? 'Blog Post' : 'Certificate'}
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Common Fields */}
                    <div className="md:col-span-2">
                      <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        Title*
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                          ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                          : 'bg-white border-gray-300 focus:border-blue-500'
                          }`}
                        required
                      />
                    </div>

                    {/* Project Specific Fields */}
                    {activeTab === 'projects' && (
                      <>
                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Status*
                          </label>
                          <select
                            value={formData.status || 'planned'}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          >
                            <option value="planned">Planned</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Category*
                          </label>
                          <select
                            value={formData.category || 'personal'}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          >
                            <option value="personal">Personal</option>
                            <option value="aialchemist">AIALCHEMIST</option>
                            <option value="vasiliades">VASILIADES</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Featured
                          </label>
                          <input
                            type="checkbox"
                            checked={formData.featured || false}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className={`h-5 w-5 rounded ${isDeveloper
                              ? 'bg-gray-700 border-gray-600 text-green-400'
                              : 'bg-white border-gray-300 text-blue-600'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={formData.image_url || ''}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            GitHub URL
                          </label>
                          <input
                            type="text"
                            value={formData.github_url || ''}
                            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Demo URL
                          </label>
                          <input
                            type="text"
                            value={formData.demo_url || ''}
                            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Description*
                          </label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            rows={3}
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Technologies
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {formData.technologies?.map((tech: string) => (
                              <span
                                key={tech}
                                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${isDeveloper
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-gray-100 text-gray-700'
                                  }`}
                              >
                                {tech}
                                <button
                                  type="button"
                                  onClick={() => setFormData({
                                    ...formData,
                                    technologies: formData.technologies.filter((t: string) => t !== tech)
                                  })}
                                  className="ml-1 text-gray-400 hover:text-red-400"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex">
                            <input
                              type="text"
                              value={formData.newTech || ''}
                              onChange={(e) => setFormData({ ...formData, newTech: e.target.value })}
                              className={`flex-1 px-4 py-2 rounded-l-lg border ${isDeveloper
                                ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                                : 'bg-white border-gray-300 focus:border-blue-500'
                                }`}
                              placeholder="Add technology"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (formData.newTech) {
                                  setFormData({
                                    ...formData,
                                    technologies: [...(formData.technologies || []), formData.newTech],
                                    newTech: ''
                                  });
                                }
                              }}
                              className={`px-4 py-2 rounded-r-lg ${isDeveloper
                                ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                                : 'bg-blue-600 text-white'
                                }`}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Blog Post Specific Fields */}
                    {activeTab === 'blog' && (
                      <>
                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Slug*
                          </label>
                          <input
                            type="text"
                            value={formData.slug || ''}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Status*
                          </label>
                          <select
                            value={formData.status || 'draft'}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Published
                          </label>
                          <input
                            type="checkbox"
                            checked={formData.published || false}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            className={`h-5 w-5 rounded ${isDeveloper
                              ? 'bg-gray-700 border-gray-600 text-green-400'
                              : 'bg-white border-gray-300 text-blue-600'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Read Time (min)
                          </label>
                          <input
                            type="number"
                            value={formData.read_time || 5}
                            onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            min="1"
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Cover Image URL
                          </label>
                          <input
                            type="text"
                            value={formData.cover_image || ''}
                            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Excerpt
                          </label>
                          <textarea
                            value={formData.excerpt || ''}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            rows={2}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Tags
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {formData.tags?.map((tag: string) => (
                              <span
                                key={tag}
                                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${isDeveloper
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-gray-100 text-gray-700'
                                  }`}
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => setFormData({
                                    ...formData,
                                    tags: formData.tags.filter((t: string) => t !== tag)
                                  })}
                                  className="ml-1 text-gray-400 hover:text-red-400"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex">
                            <input
                              type="text"
                              value={formData.newTag || ''}
                              onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                              className={`flex-1 px-4 py-2 rounded-l-lg border ${isDeveloper
                                ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                                : 'bg-white border-gray-300 focus:border-blue-500'
                                }`}
                              placeholder="Add tag"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (formData.newTag) {
                                  setFormData({
                                    ...formData,
                                    tags: [...(formData.tags || []), formData.newTag],
                                    newTag: ''
                                  });
                                }
                              }}
                              className={`px-4 py-2 rounded-r-lg ${isDeveloper
                                ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                                : 'bg-blue-600 text-white'
                                }`}
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Content*
                          </label>
                          <textarea
                            value={formData.content || ''}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            rows={6}
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Certificate Specific Fields */}
                    {activeTab === 'certificates' && (
                      <>
                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Organization*
                          </label>
                          <input
                            type="text"
                            value={formData.organization || ''}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Issue Date*
                          </label>
                          <input
                            type="date"
                            value={formData.issue_date ? formData.issue_date.split('T')[0] : ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              issue_date: new Date(e.target.value).toISOString()
                            })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Expiry Date
                          </label>
                          <input
                            type="date"
                            value={formData.expiry_date ? formData.expiry_date.split('T')[0] : ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              expiry_date: e.target.value ? new Date(e.target.value).toISOString() : null
                            })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Verified
                          </label>
                          <input
                            type="checkbox"
                            checked={formData.verified || false}
                            onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                            className={`h-5 w-5 rounded ${isDeveloper
                              ? 'bg-gray-700 border-gray-600 text-green-400'
                              : 'bg-white border-gray-300 text-blue-600'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Image URL*
                          </label>
                          <input
                            type="text"
                            value={formData.image_url || ''}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Credential ID
                          </label>
                          <input
                            type="text"
                            value={formData.credential_id || ''}
                            onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Credential URL
                          </label>
                          <input
                            type="text"
                            value={formData.credential_url || ''}
                            onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Skills
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {formData.skills?.map((skill: string) => (
                              <span
                                key={skill}
                                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${isDeveloper
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-gray-100 text-gray-700'
                                  }`}
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => setFormData({
                                    ...formData,
                                    skills: formData.skills.filter((s: string) => s !== skill)
                                  })}
                                  className="ml-1 text-gray-400 hover:text-red-400"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex">
                            <input
                              type="text"
                              value={formData.newSkill || ''}
                              onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
                              className={`flex-1 px-4 py-2 rounded-l-lg border ${isDeveloper
                                ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                                : 'bg-white border-gray-300 focus:border-blue-500'
                                }`}
                              placeholder="Add skill"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (formData.newSkill) {
                                  setFormData({
                                    ...formData,
                                    skills: [...(formData.skills || []), formData.newSkill],
                                    newSkill: ''
                                  });
                                }
                              }}
                              className={`px-4 py-2 rounded-r-lg ${isDeveloper
                                ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                                : 'bg-blue-600 text-white'
                                }`}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className={`px-4 py-2 rounded-lg ${isDeveloper
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-lg font-medium ${isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                      {editingItem ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}