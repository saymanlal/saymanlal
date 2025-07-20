'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { Github, ExternalLink, Calendar, Tag, Star } from 'lucide-react';
import projectsData from '@/lib/data/projects.json';

type ProjectCategory = 'all' | 'featured' | 'personal' | 'aialchemist' | 'vasiliades';

export default function ProjectsPage() {
  const { settings } = useTheme();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const isDeveloper = settings.theme === 'developer';

  const categories = [
    { id: 'all' as ProjectCategory, name: 'All Projects', count: projectsData.projects.length },
    { id: 'featured' as ProjectCategory, name: 'Featured', count: projectsData.projects.filter(p => p.featured).length },
    { id: 'personal' as ProjectCategory, name: 'Personal', count: projectsData.projects.filter(p => p.category === 'personal').length },
    { id: 'aialchemist' as ProjectCategory, name: 'AIALCHEMIST', count: projectsData.projects.filter(p => p.category === 'aialchemist').length },
    { id: 'vasiliades' as ProjectCategory, name: 'VASILIADES', count: projectsData.projects.filter(p => p.category === 'vasiliades').length },
  ];

  const filteredProjects = projectsData.projects.filter(project => {
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
          <h1 className={`mb-4 ${
            isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'
          }`}>
            My Projects
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDeveloper ? 'text-gray-300' : 'text-gray-600'
          }`}>
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
          {categories.map((category) => (
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
                  ? isDeveloper
                    ? 'bg-green-400/30'
                    : 'bg-white/20'
                  : isDeveloper
                    ? 'bg-gray-700'
                    : 'bg-gray-100'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`p-6 rounded-xl transition-all duration-300 card-hover ${
                isDeveloper 
                  ? 'glass-dark border-green-500/30' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              layout
              whileHover={{ y: -5 }}
            >
              {/* Project Image */}
              {project.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`text-xl font-semibold ${
                      isDeveloper ? 'text-green-400' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Star className={`h-4 w-4 ${
                        isDeveloper ? 'text-yellow-400' : 'text-yellow-500'
                      }`} fill="currentColor" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.replace('-', ' ')}
                    </span>
                    <span className={`text-xs ${
                      isDeveloper ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {new Date(project.createdAt).getFullYear()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isDeveloper
                          ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      title="View Source"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isDeveloper
                          ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      title="Live Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Description */}
              <p className={`mb-4 ${
                isDeveloper ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                      isDeveloper
                        ? 'bg-gray-800/50 text-gray-300 border border-gray-700'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className={`px-2 py-1 rounded-md text-xs ${
                    isDeveloper ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>

              {/* Category Badge */}
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDeveloper
                    ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30'
                    : 'bg-blue-50 text-blue-600 border border-blue-200'
                }`}>
                  {project.category === 'aialchemist' ? 'AIALCHEMIST' : 
                   project.category === 'vasiliades' ? 'VASILIADES' : 
                   project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </span>
                {project.longDescription && (
                  <button
                    className={`text-xs font-medium transition-colors duration-200 ${
                      isDeveloper
                        ? 'text-green-400 hover:text-green-300'
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Read More →
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`text-6xl mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-400'}`}>
              🚧
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              isDeveloper ? 'text-green-400' : 'text-gray-900'
            }`}>
              No projects found
            </h3>
            <p className={`${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
              Projects in this category are coming soon!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}