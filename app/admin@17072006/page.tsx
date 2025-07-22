'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../lib/theme-context';
import {
  Plus, Edit, Trash2, Eye, EyeOff, Settings, BarChart, Users, FileText,
  Github, ExternalLink, Calendar, Tag, Star, BookOpen, Award,
  CheckCircle, Search, Filter,
} from 'lucide-react';
import { createClient } from '../../lib/supabase/client';
import { toast } from 'react-hot-toast';
import StatCard from '../../components/ui/StatCard';
import Image from 'next/image';

// Interfaces remain the same as your original code
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
  newTech: string;
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
  newTag: string;
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
  newSkill: string;
  created_at: string;
  updated_at: string;
}

interface Testimonial {
  id: string;
  author_name: string;
  author_title: string;
  feedback: string;
  rating: number;
  status: 'pending' | 'approved';
  created_at: string;
  updated_at: string;
}

type AdminTab = 'projects' | 'blog' | 'certificates' | 'testimonials';

// Separate form states
interface ProjectFormState {
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
  newTech: string;
}

interface BlogPostFormState {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  published: boolean;
  status: 'draft' | 'published';
  tags: string[];
  newTag: string;
  read_time: number;
}

interface CertificateFormState {
  title: string;
  organization: string;
  credential_id?: string;
  credential_url?: string;
  image_url: string;
  issue_date: string;
  expiry_date?: string;
  verified: boolean;
  skills: string[];
  newSkill: string;
}

interface TestimonialFormState {
  author_name: string;
  author_title: string;
  feedback: string;
  rating: number;
  status: 'pending' | 'approved';
}

function isProject(item: any): item is Project {
  return 'image_url' in item;
}

function isBlogPost(item: any): item is BlogPost {
  return 'content' in item;
}

function isCertificate(item: any): item is Certificate {
  return 'organization' in item;
}

function isTestimonial(item: any): item is Testimonial {
  return 'author_name' in item;
}

function getDisplayName(
  item: Project | BlogPost | Certificate | Testimonial
): string {
  if (isProject(item)) return item.title;
  if (isBlogPost(item)) return item.title;
  if (isCertificate(item)) return item.title;
  if (isTestimonial(item)) return item.author_name;
  return 'Untitled';
}

export default function AdminPage() {
  const { settings } = useTheme();
  const [activeTab, setActiveTab] = useState<AdminTab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Project | BlogPost | Certificate | Testimonial | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Separate form states for each table
  const [projectForm, setProjectForm] = useState<ProjectFormState>({
    title: '',
    description: '',
    long_description: '',
    image_url: '',
    project_url: '',
    github_url: '',
    demo_url: '',
    status: 'planned',
    featured: false,
    category: 'personal',
    technologies: [],
    newTech: ''
  });

  const [blogPostForm, setBlogPostForm] = useState<BlogPostFormState>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image: '',
    published: false,
    status: 'draft',
    tags: [],
    newTag: '',
    read_time: 5
  });

  const [certificateForm, setCertificateForm] = useState<CertificateFormState>({
    title: '',
    organization: '',
    credential_id: '',
    credential_url: '',
    image_url: '',
    issue_date: new Date().toISOString(),
    expiry_date: undefined,
    verified: false,
    skills: [],
    newSkill: ''
  });

  const [testimonialForm, setTestimonialForm] = useState<TestimonialFormState>({
    author_name: '',
    author_title: '',
    feedback: '',
    rating: 5,
    status: 'pending'
  });

  const [searchTerm, setSearchTerm] = useState('');

  const supabase = createClient();
  const isDeveloper = settings.theme === 'developer';

  const tabs = [
    { id: 'projects', name: 'Projects', icon: FileText },
    { id: 'blog', name: 'Blog Posts', icon: BookOpen },
    { id: 'certificates', name: 'Certificates', icon: Award },
    { id: 'testimonials', name: 'Testimonials', icon: Star },
  ];

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'projects') {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } else if (activeTab === 'blog') {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setBlogPosts(data || []);
      } else if (activeTab === 'certificates') {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setCertificates(data || []);
      } else if (activeTab === 'testimonials') {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setTestimonials(data || []);
      }
    } catch (error: any) {
      console.error(`Error fetching ${activeTab}:`, error.message);
      toast.error(`Failed to load ${activeTab}`);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddNew = useCallback(() => {
    setEditingItem(null);

    switch (activeTab) {
      case 'projects':
        setProjectForm({
          title: '',
          description: '',
          long_description: '',
          image_url: '',
          project_url: '',
          github_url: '',
          demo_url: '',
          status: 'planned',
          featured: false,
          category: 'personal',
          technologies: [],
          newTech: ''
        });
        break;

      case 'blog':
        setBlogPostForm({
          title: '',
          slug: '',
          content: '',
          excerpt: '',
          cover_image: '',
          published: false,
          status: 'draft',
          tags: [],
          newTag: '',
          read_time: 5,
        });
        break;

      case 'certificates':
        setCertificateForm({
          title: '',
          organization: '',
          credential_id: '',
          credential_url: '',
          image_url: '',
          issue_date: new Date().toISOString(),
          expiry_date: undefined,
          verified: false,
          skills: [],
          newSkill: ''
        });
        break;

      case 'testimonials':
        setTestimonialForm({
          author_name: '',
          author_title: '',
          feedback: '',
          rating: 5,
          status: 'pending',
        });
        break;
    }

    setIsFormOpen(true);
  }, [activeTab]);

  const handleDelete = useCallback(async (id: string) => {
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
    } catch (error: any) {
      console.error('Error deleting item:', error.message);
      toast.error('Failed to delete item');
    }
  }, [activeTab, supabase]);

  const handleUpdateTestimonial = useCallback(async (id: string, status: 'pending' | 'approved') => {
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
    } catch (error: any) {
      console.error('Error updating testimonial:', error.message);
      toast.error('Failed to update testimonial');
    }
  }, [supabase]);

  const handleEdit = useCallback((item: Project | BlogPost | Certificate | Testimonial) => {
    if (activeTab === 'testimonials') {
      const testimonial = item as Testimonial;
      const newStatus = testimonial.status === 'approved' ? 'pending' : 'approved';
      handleUpdateTestimonial(item.id, newStatus);
      return;
    }

    setEditingItem(item);

    if (activeTab === 'projects') {
      const project = item as Project;
      setProjectForm({
        title: project.title || '',
        description: project.description || '',
        long_description: project.long_description || '',
        image_url: project.image_url || '',
        project_url: project.project_url || '',
        github_url: project.github_url || '',
        demo_url: project.demo_url || '',
        status: project.status || 'planned',
        featured: project.featured || false,
        category: project.category || 'personal',
        technologies: project.technologies || [],
        newTech: '', // Always reset to empty string for new input
      });
    } else if (activeTab === 'blog') {
      const blogPost = item as BlogPost;
      setBlogPostForm({
        title: blogPost.title || '',
        slug: blogPost.slug || '',
        content: blogPost.content || '',
        excerpt: blogPost.excerpt || '',
        cover_image: blogPost.cover_image || '',
        published: blogPost.published || false,
        status: blogPost.status || 'draft',
        tags: blogPost.tags || [],
        newTag: '', // Always reset to empty string for new input
        read_time: blogPost.read_time || 5,
      });
    } else if (activeTab === 'certificates') {
      const certificate = item as Certificate;
      setCertificateForm({
        title: certificate.title || '',
        organization: certificate.organization || '',
        credential_id: certificate.credential_id || '',
        credential_url: certificate.credential_url || '',
        image_url: certificate.image_url || '',
        issue_date: certificate.issue_date || new Date().toISOString(),
        expiry_date: certificate.expiry_date || undefined,
        verified: certificate.verified || false,
        skills: certificate.skills || [],
        newSkill: '', // Always reset to empty string for new input
      });
    }

    setIsFormOpen(true);
  }, [activeTab, handleUpdateTestimonial]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();

    try {
      let data, error;

      if (activeTab === 'projects') {
        // Only remove newTech for projects form
        const { newTech, ...cleanData } = projectForm;
        const submissionData = {
          ...cleanData,
          created_at: editingItem ? (editingItem as Project).created_at : now,
          updated_at: now
        };

        if (editingItem) {
          ({ data, error } = await supabase
            .from('projects')
            .update(submissionData)
            .eq('id', editingItem.id)
            .select());
        } else {
          ({ data, error } = await supabase
            .from('projects')
            .insert([submissionData])
            .select());
        }

        if (data && data[0]) {
          const updatedProject: Project = data[0];
          setProjects(prev =>
            editingItem
              ? prev.map(item => item.id === editingItem.id ? updatedProject : item)
              : [updatedProject, ...prev]
          );
        }
      } else if (activeTab === 'blog') {
        // Only remove newTag for blog form
        const { newTag, ...cleanData } = blogPostForm;
        const submissionData = {
          ...cleanData,
          created_at: editingItem ? (editingItem as BlogPost).created_at : now,
          updated_at: now
        };

        if (editingItem) {
          ({ data, error } = await supabase
            .from('blog_posts')
            .update(submissionData)
            .eq('id', editingItem.id)
            .select());
        } else {
          ({ data, error } = await supabase
            .from('blog_posts')
            .insert([submissionData])
            .select());
        }

        if (data && data[0]) {
          const updatedPost: BlogPost = data[0];
          setBlogPosts(prev =>
            editingItem
              ? prev.map(item => item.id === editingItem.id ? updatedPost : item)
              : [updatedPost, ...prev]
          );
        }
      } else if (activeTab === 'certificates') {
        // Only remove newSkill for certificates form
        const { newSkill, ...cleanData } = certificateForm;
        const submissionData = {
          ...cleanData,
          created_at: editingItem ? (editingItem as Certificate).created_at : now,
          updated_at: now
        };

        if (!submissionData.issue_date) {
          throw new Error('Issue date is required for certificates');
        }

        if (editingItem) {
          ({ data, error } = await supabase
            .from('certificates')
            .update(submissionData)
            .eq('id', editingItem.id)
            .select());
        } else {
          ({ data, error } = await supabase
            .from('certificates')
            .insert([submissionData])
            .select());
        }

        if (data && data[0]) {
          const updatedCert: Certificate = data[0];
          setCertificates(prev =>
            editingItem
              ? prev.map(item => item.id === editingItem.id ? updatedCert : item)
              : [updatedCert, ...prev]
          );
        }
      }

      if (error) throw error;

      toast.success(`Item ${editingItem ? 'updated' : 'created'} successfully`);
      setIsFormOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      console.error('Error saving item:', error.message);
      toast.error(`Failed to ${editingItem ? 'update' : 'create'} item: ${error.message}`);
    }
  }, [activeTab, projectForm, blogPostForm, certificateForm, editingItem, supabase]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'completed':
      case 'published':
      case 'approved':
        return isDeveloper ? 'text-green-400 bg-green-400/20' : 'text-green-600 bg-green-50';
      case 'in-progress':
        return isDeveloper ? 'text-yellow-400 bg-yellow-400/20' : 'text-yellow-600 bg-yellow-50';
      case 'planned':
      case 'draft':
      case 'pending':
        return isDeveloper ? 'text-blue-400 bg-blue-400/20' : 'text-blue-600 bg-blue-50';
      default:
        return isDeveloper ? 'text-gray-400 bg-gray-400/20' : 'text-gray-600 bg-gray-50';
    }
  }, [isDeveloper]);

  const filteredItems = useCallback(() => {
    const items = activeTab === 'projects' ? projects :
      activeTab === 'blog' ? blogPosts :
        activeTab === 'certificates' ? certificates :
          testimonials;

    return items.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      if (activeTab === 'testimonials') {
        const testimonial = item as Testimonial;
        return (
          testimonial.feedback?.toLowerCase().includes(searchLower) ||
          testimonial.author_name?.toLowerCase().includes(searchLower) ||
          testimonial.author_title?.toLowerCase().includes(searchLower));
      }
      return (item as Project | BlogPost | Certificate).title?.toLowerCase().includes(searchLower);
    });
  }, [activeTab, projects, blogPosts, certificates, testimonials, searchTerm]);

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
            <h1 className={`text-3xl font-bold mb-2 ${isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'}`}>
              {isDeveloper ? 'Admin Panel' : 'Admin Dashboard'}
            </h1>
            <p className={`text-lg ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage your portfolio content
            </p>
          </div>

          {/* Stats Cards */}
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
                }`}
              >
                <h2 className={`text-lg font-semibold mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-900'}`}>
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
                      : 'bg-white border-gray-300 focus:border-blue-500'
                      }`}
                  />
                </div>
                {activeTab !== 'testimonials' && (
                  <button
                    onClick={handleAddNew}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isDeveloper
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
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
                  }`}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${isDeveloper ? 'border-gray-700' : 'border-gray-200'}`}>
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
                            className={`border-b last:border-b-0 ${isDeveloper ? 'border-gray-700' : 'border-gray-200'}`}
                          >
                            {/* Common Title Column */}
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                {activeTab === 'projects' && 'image_url' in item && item.image_url && (
                                  <Image
                                    src={item.image_url}
                                    alt={getDisplayName(item)}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-md object-cover"
                                  />
                                )}
                                <p className={`font-medium ${isDeveloper ? 'text-gray-300' : 'text-gray-900'}`}>
                                  {getDisplayName(item)}
                                </p>
                              </div>
                            </td>

                            {/* Projects Tab Specific Columns */}
                            {activeTab === 'projects' && 'status' in item && 'category' in item && (
                              <>
                                <td className="py-4 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                    {item.status.replace('-', ' ')}
                                  </span>
                                </td>
                                <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {item.category === 'aialchemist' ? 'AIALCHEMIST' :
                                    item.category === 'vasiliades' ? 'VASILIADES' :
                                      item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                                </td>
                              </>
                            )}

                            {/* Blog Tab Specific Columns */}
                            {activeTab === 'blog' && 'status' in item && 'views' in item && (
                              <>
                                <td className="py-4 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {item.views}
                                </td>
                              </>
                            )}

                            {/* Certificates Tab Specific Columns */}
                            {activeTab === 'certificates' && 'organization' in item && 'verified' in item && (
                              <>
                                <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {item.organization}
                                </td>
                                <td className="py-4 px-4">
                                  {item.verified ? (
                                    <CheckCircle className={`h-5 w-5 ${isDeveloper ? 'text-green-400' : 'text-green-600'}`} />
                                  ) : (
                                    <span className={`text-xs ${isDeveloper ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                                  )}
                                </td>
                              </>
                            )}

                            {/* Testimonials Tab Specific Columns */}
                            {activeTab === 'testimonials' && (
                              <>
                                <td className="py-4 px-4">
                                  <div className="flex items-center">
                                    {'rating' in item && [...Array(5)].map((_, i) => (
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
                                <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {'feedback' in item ? item.feedback : '-'}
                                </td>
                                <td className="py-4 px-4">
                                  {'status' in item && (
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
                                  )}
                                </td>
                                <td className={`py-4 px-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {'created_at' in item && new Date(item.created_at).toLocaleDateString()}
                                </td>
                              </>
                            )}

                            {/* Common Actions Column */}
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className={`p-2 rounded-lg transition-colors duration-200 ${isDeveloper
                                    ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                  {activeTab === 'testimonials' && 'status' in item ? (
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
                <h3 className={`text-xl font-semibold mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-900'}`}>
                  {editingItem ? 'Edit' : 'Add New'} {activeTab === 'projects' ? 'Project' :
                    activeTab === 'blog' ? 'Blog Post' :
                      activeTab === 'certificates' ? 'Certificate' :
                        'Testimonial'}
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Common Fields for all types */}
                    <div className="md:col-span-2">
                      <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                        Title*
                      </label>
                      <input
                        type="text"
                        value={
                          activeTab === 'projects' ? projectForm.title :
                            activeTab === 'blog' ? blogPostForm.title :
                              activeTab === 'certificates' ? certificateForm.title :
                                testimonialForm.author_name
                        }
                        onChange={(e) => {
                          if (activeTab === 'projects') {
                            setProjectForm({ ...projectForm, title: e.target.value });
                          } else if (activeTab === 'blog') {
                            setBlogPostForm({ ...blogPostForm, title: e.target.value });
                          } else if (activeTab === 'certificates') {
                            setCertificateForm({ ...certificateForm, title: e.target.value });
                          } else {
                            setTestimonialForm({ ...testimonialForm, author_name: e.target.value });
                          }
                        }}
                        className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                          ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                          : 'bg-white border-gray-300 focus:border-blue-500'
                          }`}
                        required
                      />
                    </div>

                    {/* Projects Specific Fields */}
                    {activeTab === 'projects' && (
                      <>
                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Status*
                          </label>
                          <select
                            value={projectForm.status}
                            onChange={(e) => setProjectForm({
                              ...projectForm,
                              status: e.target.value as 'planned' | 'in-progress' | 'completed'
                            })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          >
                            <option value="planned">Planned</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Category*
                          </label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({
                              ...projectForm,
                              category: e.target.value as 'personal' | 'aialchemist' | 'vasiliades'
                            })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          >
                            <option value="personal">Personal</option>
                            <option value="aialchemist">AIALCHEMIST</option>
                            <option value="vasiliades">VASILIADES</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Featured
                          </label>
                          <input
                            type="checkbox"
                            checked={projectForm.featured}
                            onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                            className={`h-5 w-5 rounded ${isDeveloper
                              ? 'bg-gray-700 border-gray-600 text-green-400'
                              : 'bg-white border-gray-300 text-blue-600'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={projectForm.image_url || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            GitHub URL
                          </label>
                          <input
                            type="text"
                            value={projectForm.github_url || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Demo URL
                          </label>
                          <input
                            type="text"
                            value={projectForm.demo_url || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Description*
                          </label>
                          <textarea
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            rows={3}
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Long Description
                          </label>
                          <textarea
                            value={projectForm.long_description || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, long_description: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            rows={3}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Technologies*
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {projectForm.technologies.map((tech) => (
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
                                  onClick={() => {
                                    setProjectForm(prev => ({
                                      ...prev,
                                      technologies: prev.technologies.filter(t => t !== tech)
                                    }));
                                  }}
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
                              value={projectForm.newTech}
                              onChange={(e) => {
                                setProjectForm(prev => ({
                                  ...prev,
                                  newTech: e.target.value
                                }));
                              }}
                              className={`flex-1 px-4 py-2 rounded-l-lg border ${isDeveloper
                                ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                                : 'bg-white border-gray-300 focus:border-blue-500'
                                }`}
                              placeholder="Add technology"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddNew();
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (projectForm.newTech.trim() && !projectForm.technologies.includes(projectForm.newTech.trim())) {
                                  setProjectForm(prev => ({
                                    ...prev,
                                    technologies: [...prev.technologies, prev.newTech.trim()],
                                    newTech: ""
                                  }));
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

                    {/* Certificate Specific Fields */}
                    {activeTab === 'certificates' && (
                      <>
                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Organization*
                          </label>
                          <input
                            type="text"
                            value={certificateForm.organization}
                            onChange={(e) => setCertificateForm({ ...certificateForm, organization: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Issue Date*
                          </label>
                          <input
                            type="date"
                            value={certificateForm.issue_date ? new Date(certificateForm.issue_date).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                              if (e.target.value) {
                                const date = new Date(e.target.value);
                                setCertificateForm({ ...certificateForm, issue_date: date.toISOString() });
                              }
                            }}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Expiry Date
                          </label>
                          <input
                            type="date"
                            value={certificateForm.expiry_date ? new Date(certificateForm.expiry_date).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                              if (e.target.value) {
                                const date = new Date(e.target.value);
                                setCertificateForm({ ...certificateForm, expiry_date: date.toISOString() });
                              } else {
                                setCertificateForm({ ...certificateForm, expiry_date: undefined });
                              }
                            }}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Verified
                          </label>
                          <input
                            type="checkbox"
                            checked={certificateForm.verified}
                            onChange={(e) => setCertificateForm({ ...certificateForm, verified: e.target.checked })}
                            className={`h-5 w-5 rounded ${isDeveloper
                              ? 'bg-gray-700 border-gray-600 text-green-400'
                              : 'bg-white border-gray-300 text-blue-600'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Image URL*
                          </label>
                          <input
                            type="text"
                            value={certificateForm.image_url || ''}
                            onChange={(e) => setCertificateForm({ ...certificateForm, image_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Credential ID
                          </label>
                          <input
                            type="text"
                            value={certificateForm.credential_id || ''}
                            onChange={(e) => setCertificateForm({ ...certificateForm, credential_id: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Credential URL
                          </label>
                          <input
                            type="text"
                            value={certificateForm.credential_url || ''}
                            onChange={(e) => setCertificateForm({ ...certificateForm, credential_url: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Skills*
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {certificateForm.skills.map((skill) => (
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
                                  onClick={() => {
                                    setCertificateForm(prev => ({
                                      ...prev,
                                      skills: prev.skills.filter(s => s !== skill)
                                    }));
                                  }}
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
                              value={certificateForm.newSkill}
                              onChange={(e) => {
                                setCertificateForm(prev => ({
                                  ...prev,
                                  newSkill: e.target.value
                                }));
                              }}
                              className={`flex-1 px-4 py-2 rounded-l-lg border ${isDeveloper
                                ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                                : 'bg-white border-gray-300 focus:border-blue-500'
                                }`}
                              placeholder="Add skill"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddNew();
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (certificateForm.newSkill.trim() && !certificateForm.skills.includes(certificateForm.newSkill.trim())) {
                                  setCertificateForm(prev => ({
                                    ...prev,
                                    skills: [...prev.skills, prev.newSkill.trim()],
                                    newSkill: ""
                                  }));
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
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Slug*
                          </label>
                          <input
                            type="text"
                            value={blogPostForm.slug}
                            onChange={(e) => setBlogPostForm({ ...blogPostForm, slug: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Status*
                          </label>
                          <select
                            value={blogPostForm.status}
                            onChange={(e) => setBlogPostForm({
                              ...blogPostForm,
                              status: e.target.value as 'draft' | 'published'
                            })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Published
                          </label>
                          <input
                            type="checkbox"
                            checked={blogPostForm.published}
                            onChange={(e) => setBlogPostForm({ ...blogPostForm, published: e.target.checked })}
                            className={`h-5 w-5 rounded ${isDeveloper
                              ? 'bg-gray-700 border-gray-600 text-green-400'
                              : 'bg-white border-gray-300 text-blue-600'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Read Time (min)
                          </label>
                          <input
                            type="number"
                            value={blogPostForm.read_time}
                            onChange={(e) => setBlogPostForm({ ...blogPostForm, read_time: parseInt(e.target.value) || 5 })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            min="1"
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Cover Image URL
                          </label>
                          <input
                            type="text"
                            value={blogPostForm.cover_image || ''}
                            onChange={(e) => setBlogPostForm({ ...blogPostForm, cover_image: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Excerpt
                          </label>
                          <textarea
                            value={blogPostForm.excerpt || ''}
                            onChange={(e) => setBlogPostForm({ ...blogPostForm, excerpt: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            rows={2}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Tags
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {blogPostForm.tags.map((tag) => (
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
                                  onClick={() => {
                                    setBlogPostForm(prev => ({
                                      ...prev,
                                      tags: prev.tags.filter(t => t !== tag)
                                    }));
                                  }}
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
                              value={blogPostForm.newTag}
                              onChange={(e) => {
                                setBlogPostForm(prev => ({
                                  ...prev,
                                  newTag: e.target.value
                                }));
                              }}
                              className={`flex-1 px-4 py-2 rounded-l-lg border ${isDeveloper
                                ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                                : 'bg-white border-gray-300 focus:border-blue-500'
                                }`}
                              placeholder="Add tag"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddNew();
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (blogPostForm.newTag.trim() && !blogPostForm.tags.includes(blogPostForm.newTag.trim())) {
                                  setBlogPostForm(prev => ({
                                    ...prev,
                                    tags: [...prev.tags, prev.newTag.trim()],
                                    newTag: ""
                                  }));
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
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Content*
                          </label>
                          <textarea
                            value={blogPostForm.content || ''}
                            onChange={(e) => setBlogPostForm({ ...blogPostForm, content: e.target.value })}
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

                    {/* Testimonial Specific Fields */}
                    {activeTab === 'testimonials' && (
                      <>
                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Client Name*
                          </label>
                          <input
                            type="text"
                            value={testimonialForm.author_name || ''}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, author_name: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Client Position
                          </label>
                          <input
                            type="text"
                            value={testimonialForm.author_title || ''}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, author_title: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                          />
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Rating*
                          </label>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setTestimonialForm({
                                  ...testimonialForm,
                                  rating: star
                                })}
                              >
                                <Star
                                  className={`h-5 w-5 ${star <= (testimonialForm.rating || 0)
                                    ? isDeveloper
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Status*
                          </label>
                          <select
                            value={testimonialForm.status || 'pending'}
                            onChange={(e) => setTestimonialForm({
                              ...testimonialForm,
                              status: e.target.value as 'pending' | 'approved'
                            })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            required
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block mb-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                            Feedback*
                          </label>
                          <textarea
                            value={testimonialForm.feedback || ''}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, feedback: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border ${isDeveloper
                              ? 'bg-gray-800/50 border-gray-700 text-gray-300 focus:border-green-400'
                              : 'bg-white border-gray-300 focus:border-blue-500'
                              }`}
                            rows={3}
                            required
                          />
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