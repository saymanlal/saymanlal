'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../lib/theme-context';
import { Github, ExternalLink, Calendar, Tag, Star, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

type ProjectCategory = 'all' | 'featured' | 'personal' | 'aialchemist' | 'vasiliades';

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
}

export default function ProjectsPage() {
  const { settings } = useTheme();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageModal, setImageModal] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedTags, setExpandedTags] = useState<{ [key: string]: boolean }>({});
  const supabase = createClient();
  const isDeveloper = settings.theme === 'developer';

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [supabase]);

  const categories = [
    { id: 'all' as ProjectCategory, name: 'All Projects', count: projects.length },
    { id: 'featured' as ProjectCategory, name: 'Featured', count: projects.filter(p => p.featured).length },
    { id: 'personal' as ProjectCategory, name: 'Personal', count: projects.filter(p => p.category === 'personal').length },
    { id: 'aialchemist' as ProjectCategory, name: 'AIALCHEMIST', count: projects.filter(p => p.category === 'aialchemist').length },
    { id: 'vasiliades' as ProjectCategory, name: 'VASILIADES', count: projects.filter(p => p.category === 'vasiliades').length },
  ];

  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'featured') return project.featured;
    return project.category === activeCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return isDeveloper ? 'text-green-400 bg-green-400/20' : 'text-green-600 bg-green-50';
      case 'in-progress':
        return isDeveloper ? 'text-yellow-400 bg-yellow-400/20' : 'text-yellow-600 bg-yellow-50';
      case 'planned':
        return isDeveloper ? 'text-blue-400 bg-blue-400/20' : 'text-blue-600 bg-blue-50';
      default:
        return isDeveloper ? 'text-gray-400 bg-gray-400/20' : 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`mb-4 ${isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'}`}>
            My Projects
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
            A showcase of my work in AI, Web3, and innovative software solutions
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? isDeveloper
                    ? 'bg-green-400/20 text-green-400 border border-green-400/30 neon-border'
                    : 'bg-blue-600 text-white shadow-lg'
                  : isDeveloper
                    ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10 hover:text-green-400'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category.name}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                activeCategory === category.id
                  ? isDeveloper ? 'bg-green-400/30' : 'bg-white/20'
                  : isDeveloper ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" layout>
          {filteredProjects.map(project => {
            const expanded = expandedTags[project.id] || false;
            const visibleTags = expanded ? project.technologies : project.technologies.slice(0, 2);
            const hiddenCount = project.technologies.length - visibleTags.length;

            return (
              <motion.div
                key={project.id}
                className={`p-6 rounded-xl transition-all duration-300 card-hover ${
                  isDeveloper ? 'glass-dark border-green-500/30' : 'bg-white border border-gray-200 shadow-lg'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                {project.image_url && (
                  <div
                    className="mb-4 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setImageModal(project.image_url)}
                  >
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                )}

                {/* Title + Featured */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-lg font-bold break-words ${isDeveloper ? 'text-green-400' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  {project.featured && <Star className={`h-4 w-4 ${isDeveloper ? 'text-yellow-400' : 'text-yellow-500'}`} fill="currentColor" />}
                </div>

                {/* Status + Year */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                  <span className={`text-xs ${isDeveloper ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                    <Calendar className="h-3 w-3 mr-1" /> {new Date(project.created_at).getFullYear()}
                  </span>
                </div>

                {/* Short Description */}
                <p className={`mb-3 text-sm break-words ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {visibleTags.map(tech => (
                    <span
                      key={tech}
                      className={`flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                        isDeveloper
                          ? 'bg-gray-800/50 text-gray-300 border border-gray-700'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tech}
                    </span>
                  ))}
                  {hiddenCount > 0 && (
                    <button
                      onClick={() => setExpandedTags(prev => ({ ...prev, [project.id]: !expanded }))}
                      className={`px-2 py-1 text-xs rounded-md ${
                        isDeveloper ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-blue-600'
                      }`}
                    >
                      {expanded ? 'Show less' : `+${hiddenCount} more`}
                    </button>
                  )}
                </div>

                {/* Links + Read More */}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDeveloper ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}>
                    {project.category === 'aialchemist' ? 'AIALCHEMIST' : project.category === 'vasiliades' ? 'VASILIADES' : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                  {project.long_description && (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`text-xs font-medium transition-colors duration-200 ${isDeveloper ? 'text-green-400 hover:text-green-300' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                      Read More →
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className={`text-6xl mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-400'}`}>🚧</div>
            <h3 className={`text-xl font-semibold mb-2 ${isDeveloper ? 'text-green-400' : 'text-gray-900'}`}>No projects found</h3>
            <p className={`${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>Projects in this category are coming soon!</p>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {imageModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setImageModal(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full h-[80vh] overflow-hidden rounded-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <Image src={imageModal} alt="Project Image" fill className="object-contain" />
              <button onClick={() => setImageModal(null)} className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition">
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Long Description Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className={`relative w-full max-w-4xl h-[80vh] rounded-xl overflow-y-auto shadow-xl p-6 ${isDeveloper ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3 }}
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition">
                <X className="h-5 w-5" />
              </button>

              <h2 className={`text-2xl font-bold mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-900'}`}>{selectedProject.title}</h2>
              <div className={`prose max-w-none ${isDeveloper ? 'prose-invert prose-green' : 'prose-blue'}`} dangerouslySetInnerHTML={{ __html: selectedProject.long_description || '' }} />
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.technologies.map(tech => (
                  <span key={tech} className={`px-2 py-1 rounded-md text-xs font-medium ${isDeveloper ? 'bg-gray-800/50 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                    <Tag className="h-3 w-3 mr-1 inline" /> {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
