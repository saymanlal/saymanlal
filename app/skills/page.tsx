'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../lib/theme-context';
import { 
  Trophy, Star, ExternalLink, Award, TrendingUp, Code, 
  Brain, Globe, Cloud, Wrench, Cpu, Database, 
  Lock, Server, GitBranch, Layers, CpuIcon 
} from 'lucide-react';
import skillsData from '../../lib/data/skills.json';
import LeetCodeLogo from '../../public/logos/leetcode.svg';
import GitHubLogo from '../../public/logos/github.svg';
import StackOverflowLogo from '../../public/logos/stackoverflow.svg';
import Image from 'next/image';

export default function SkillsPage() {
  const { settings } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const isDeveloper = settings.theme === 'developer';

  // High-quality transparent logos from CDNs
  const platformLogos: Record<string, string> = {
    'LeetCode': LeetCodeLogo,
    'GitHub': GitHubLogo,
    'Stack Overflow': StackOverflowLogo,
    'HackerRank': 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png'
  };

  // Comprehensive technology logos from Devicon CDN
  const technologyLogos = {
    // Languages
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'Go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    'Rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
    'Swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    'Kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
    
    // Frontend
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'Vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Svelte': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'Nuxt.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
    
    // Backend
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    'Spring': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    
    // AI/ML
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'Keras': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    
    // Databases
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    
    // DevOps
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'AWS': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    'GCP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    'Terraform': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
    
    // Tools
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'GitHub Actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'Jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
    'Nginx': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    
    // Mobile
    'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    
    // Web3
    'Solidity': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg',
    'Ethereum': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg'
  };

  const categoryIcons = {
    'ai-ml': Brain,
    'frontend': Code,
    'backend': Server,
    'web3': Globe,
    'devops': Cloud,
    'databases': Database,
    'security': Lock,
    'systems': Cpu
  };

  const filteredSkills = selectedCategory 
    ? skillsData.categories.filter(cat => cat.id === selectedCategory)
    : skillsData.categories;

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
              isDeveloper ? 'text-green-400 neon-text font-quantum' : 'text-gray-900'
            }`}>
              Technical Expertise
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
              A comprehensive overview of my technical skills, certifications, and platform achievements
            </p>
          </div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                !selectedCategory
                  ? isDeveloper
                    ? 'bg-green-400/20 text-green-400 border border-green-400/30 quantum-glow'
                    : 'bg-blue-600 text-white shadow-lg'
                  : isDeveloper
                    ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
              }`}
            >
              All Skills
            </button>
            {skillsData.categories.map((category) => {
              const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons];
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30 quantum-glow'
                        : 'bg-blue-600 text-white shadow-lg'
                      : isDeveloper
                        ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  {IconComponent && <IconComponent className="h-4 w-4" />}
                  <span>{category.name}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Skills Grid */}
          <div className="space-y-12">
            {filteredSkills.map((category, categoryIndex) => {
              const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  className={`p-8 rounded-2xl ${
                    isDeveloper ? 'quantum-card' : 'elevated-card'
                  }`}
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-4 mb-8">
                    <div className={`p-3 rounded-xl ${
                      isDeveloper ? 'bg-green-400/20 text-green-400' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {IconComponent && <IconComponent className="h-6 w-6" />}
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${
                        isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                      }`}>
                        {category.name}
                      </h2>
                      <p className={`text-sm ${
                        isDeveloper ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {category.skills.length} skills • {category.skills.reduce((sum, skill) => sum + skill.projects, 0)} projects
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.skills.map((skill, skillIndex) => {
                      const logoUrl = technologyLogos[skill.name as keyof typeof technologyLogos];
                      return (
                        <motion.div
                          key={skill.name}
                          className={`p-6 rounded-xl transition-all duration-300 ${
                            isDeveloper 
                              ? 'bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700 hover:border-green-400/30' 
                              : 'bg-gray-50 hover:bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${
                                isDeveloper ? 'bg-green-400/20 text-green-400' : 'bg-blue-50 text-blue-600'
                              }`}>
                                {logoUrl ? (
                                  <Image 
                                    src={logoUrl}
                                    alt={`${skill.name} logo`}
                                    width={20}
                                    height={20}
                                    className="h-5 w-5 object-contain"
                                  />
                                ) : (
                                  <Code className="h-5 w-5" />
                                )}
                              </div>
                              <div>
                                <h3 className={`font-semibold ${
                                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                                }`}>
                                  {skill.name}
                                </h3>
                                <p className={`text-sm ${
                                  isDeveloper ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  {skill.yearsOfExperience} years • {skill.projects} projects
                                </p>
                              </div>
                            </div>
                            <div className={`text-right ${
                              isDeveloper ? 'text-green-400' : 'text-blue-600'
                            }`}>
                              <div className="text-lg font-bold">{skill.level}%</div>
                            </div>
                          </div>

                          {/* Skill Progress Bar */}
                          <div className={`w-full h-3 rounded-full mb-4 ${
                            isDeveloper ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            <motion.div
                              className={`h-full rounded-full ${
                                isDeveloper 
                                  ? 'bg-gradient-to-r from-green-400 to-cyan-400' 
                                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            />
                          </div>

                          {/* Skill Description */}
                          <p className={`text-sm mb-4 ${
                            isDeveloper ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {skill.description}
                          </p>

                          {/* Certifications */}
                          {skill.certifications.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {skill.certifications.map((cert) => (
                                <span
                                  key={cert}
                                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                                    isDeveloper
                                      ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                                  }`}
                                >
                                  <Award className="h-3 w-3 mr-1" />
                                  {cert}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Platform Statistics */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className={`text-2xl font-bold text-center mb-8 ${
              isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
            }`}>
              Platform Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillsData.platforms.map((platform, index) => {
                const logoUrl = platformLogos[platform.name as keyof typeof platformLogos];
                return (
                  <motion.div
                    key={platform.name}
                    className={`p-6 rounded-xl text-center ${
                      isDeveloper ? 'quantum-card' : 'elevated-card'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex justify-center mb-4">
                      {logoUrl ? (
                        <Image 
                          src={logoUrl} 
                          alt={`${platform.name} logo`} 
                          width={40} 
                          height={40} 
                          className="h-10 w-10 object-contain"
                        />
                      ) : (
                        <Globe className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    
                    <h3 className={`text-lg font-semibold mb-4 ${
                      isDeveloper ? 'text-green-400' : 'text-gray-900'
                    }`}>
                      {platform.name}
                    </h3>
                    
                    <div className="space-y-2">
                      {Object.entries(platform.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className={`text-sm ${
                            isDeveloper ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <span className={`text-sm font-medium ${
                            isDeveloper ? 'text-green-400' : 'text-blue-600'
                          }`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-2 mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDeveloper
                          ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <span>View Profile</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className={`text-2xl font-bold text-center mb-8 ${
              isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
            }`}>
              Notable Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillsData.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className={`p-6 rounded-xl ${
                    isDeveloper ? 'quantum-card' : 'elevated-card'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      isDeveloper ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {achievement.type === 'award' ? (
                        <Trophy className="h-6 w-6" />
                      ) : achievement.type === 'certification' ? (
                        <Award className="h-6 w-6" />
                      ) : (
                        <TrendingUp className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-2 ${
                        isDeveloper ? 'text-green-400' : 'text-gray-900'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm mb-2 ${
                        isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {achievement.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium ${
                          isDeveloper ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {achievement.organization}
                        </span>
                        <span className={`text-xs ${
                          isDeveloper ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {achievement.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}