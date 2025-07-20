'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { Github, ExternalLink, Code, Brain, Rocket, Terminal, Zap, Globe } from 'lucide-react';
import ThemeToggle from '@/components/ui/theme-toggle';
import personalInfo from '@/lib/data/personal-info.json';
import projectsData from '@/lib/data/projects.json';
import skillsData from '@/lib/data/skills.json';

export default function HomePage() {
  const { settings } = useTheme();
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const isDeveloper = settings.theme === 'developer';

  const animatedWords = ['Leadership', 'Innovation', 'AI', 'Web3', 'Vision', 'Future'];

  // Enhanced typewriter effect for developer mode
  useEffect(() => {
    if (!isDeveloper) return;

    const commands = [
      '> initializing quantum_terminal...',
      '> loading user profile...',
      '> whoami',
      'CodeChemist@quantum:~$ Sayman Lal',
      '> cat /etc/mission.txt',
      'Building the decentralized future with AI',
      '> ls /skills',
      'AI/ML  Web3  TypeScript  Python  Solidity',
      '> echo $STATUS',
      'READY_TO_BUILD_THE_FUTURE',
      '> quantum_mode --active',
      'Welcome to the Matrix, CodeChemist.',
      '> _'
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let currentCommand = '';

    const typeWriter = () => {
      if (commandIndex < commands.length) {
        if (charIndex < commands[commandIndex].length) {
          currentCommand += commands[commandIndex].charAt(charIndex);
          setTerminalText(currentCommand);
          charIndex++;
          setTimeout(typeWriter, 50);
        } else {
          currentCommand += '\n';
          setTerminalText(currentCommand);
          commandIndex++;
          charIndex = 0;
          setTimeout(typeWriter, 800);
        }
      }
    };

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, [isDeveloper]);

  // Animated words for entrepreneur mode
  useEffect(() => {
    if (isDeveloper) return;

    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isDeveloper]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const featuredProjects = projectsData.projects.filter(p => p.featured).slice(0, 3);
  const topSkills = skillsData.categories.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {isDeveloper ? (
                // Developer Mode - Enhanced Terminal Style
                <div className="terminal-window min-h-[400px]">
                  <div className="terminal-header">
                    <div className="flex items-center mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="ml-4 text-sm text-green-500 font-mono">quantum_terminal.exe</span>
                        <div className="ml-auto flex items-center space-x-2">
                          <Terminal className="h-4 w-4 text-green-400" />
                          <span className="text-xs text-green-400">ACTIVE</span>
                        </div>
                      </div>
                      <span className="ml-4 text-sm text-green-300">terminal.js</span>
                    </div>
                  </div>
                  <div className="p-6 bg-black">
                    <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap crt-effect">
                      {terminalText}
                      {showCursor && <span className="bg-green-400 text-black animate-pulse">█</span>}
                    </pre>
                  </div>
                </div>
              ) : (
                // Entrepreneur Mode - Enhanced Business Style
                <div className="space-y-6">
                  <motion.h1
                    className="text-5xl md:text-7xl font-bold text-elevated font-display"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Sayman Lal
                  </motion.h1>

                  <motion.p
                    className="text-2xl md:text-3xl text-gray-600 font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    AI Developer & Entrepreneur
                  </motion.p>

                  <motion.div
                    className="text-xl md:text-2xl font-medium h-8 flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="text-gray-500 mr-2">Driving</span>
                    <motion.span
                      key={currentWordIndex}
                      className="text-blue-600 font-bold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {animatedWords[currentWordIndex]}
                    </motion.span>
                  </motion.div>

                  <motion.p
                    className="text-xl text-gray-600 max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    {personalInfo.bio}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <a
                      href="/contact"
                      className="btn-elevated flex items-center space-x-2 text-lg px-8 py-4"
                    >
                      <span>Get In Touch</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href="/projects"
                      className="btn-outline flex items-center space-x-2 text-lg px-8 py-4"
                    >
                      <span>View Projects</span>
                      <Code className="h-4 w-4" />
                    </a>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Right Column - Enhanced Stats & Theme Toggle */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex justify-center lg:justify-end">
                <ThemeToggle />
              </div>

              {/* Enhanced Stats Grid */}
              <div className={`grid grid-cols-2 gap-6 ${isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                <div className={`p-6 rounded-xl text-center ${isDeveloper ? 'quantum-card' : 'elevated-card'
                  }`}>
                  <div className={`text-4xl font-bold mb-2 ${isDeveloper ? 'font-quantum' : ''}`}>127</div>
                  <div className="text-sm opacity-80">Repositories</div>
                </div>
                <div className={`p-6 rounded-xl text-center ${isDeveloper ? 'quantum-card' : 'elevated-card'
                  }`}>
                  <div className={`text-4xl font-bold mb-2 ${isDeveloper ? 'font-quantum' : ''}`}>5+</div>
                  <div className="text-sm opacity-80">Years</div>
                </div>
                <div className={`p-6 rounded-xl text-center ${isDeveloper ? 'quantum-card' : 'elevated-card'
                  }`}>
                  <div className={`text-4xl font-bold mb-2 ${isDeveloper ? 'font-quantum' : ''}`}>2.8K</div>
                  <div className="text-sm opacity-80">Followers</div>
                </div>
                <div className={`p-6 rounded-xl text-center ${isDeveloper ? 'quantum-card' : 'elevated-card'
                  }`}>
                  <div className={`text-4xl font-bold mb-2 ${isDeveloper ? 'font-quantum' : ''}`}>∞</div>
                  <div className="text-sm opacity-80">Possibilities</div>
                </div>
              </div>

              {/* Platform Stats */}
              <div className={`p-6 rounded-xl ${isDeveloper ? 'quantum-card' : 'elevated-card'
                }`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                  }`}>
                  Platform Rankings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                      LeetCode
                    </span>
                    <span className={`text-sm font-medium ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                      Top 5%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                      HackerRank
                    </span>
                    <span className={`text-sm font-medium ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                      5 Star
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                      CodeChef
                    </span>
                    <span className={`text-sm font-medium ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                      2156 Rating
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Expertise Preview */}
      <section className={`section-padding ${isDeveloper ? 'bg-gray-900/50' : 'bg-gray-50'
        }`}>
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`mb-4 ${isDeveloper ? 'text-green-400 neon-text font-quantum' : 'text-gray-900'
              }`}>
              Core Expertise
            </h2>
            <p className={`text-lg ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
              } max-w-2xl mx-auto`}>
              Specialized in cutting-edge technologies that drive innovation and create value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topSkills.map((category, index) => (
              <motion.div
                key={category.id}
                className={`p-6 rounded-xl card-hover ${isDeveloper
                  ? 'quantum-card'
                  : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  <div className={`text-4xl mb-4 ${isDeveloper ? 'filter drop-shadow-lg' : ''}`}>
                    {category.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                    }`}>
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.skills.slice(0, 3).map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span className={`text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        {skill.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-16 h-2 rounded-full ${isDeveloper ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${isDeveloper ? 'bg-green-400' : 'bg-blue-500'
                              }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${isDeveloper ? 'text-green-400' : 'text-blue-600'
                          }`}>
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-xs">
                    <span className={`${isDeveloper ? 'text-gray-400' : 'text-gray-500'}`}>
                      {category.skills.reduce((sum, skill) => sum + skill.projects, 0)} Projects
                    </span>
                    <span className={`${isDeveloper ? 'text-gray-400' : 'text-gray-500'}`}>
                      {Math.max(...category.skills.map(skill => skill.yearsOfExperience))}+ Years
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/skills"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isDeveloper
                ? 'btn-quantum'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              <span>Explore All Skills</span>
              <Brain className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`mb-4 ${isDeveloper ? 'text-green-400 neon-text font-quantum' : 'text-gray-900'
              }`}>
              Featured Projects
            </h2>
            <p className={`text-lg ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
              } max-w-2xl mx-auto`}>
              Showcasing innovative solutions in AI, Web3, and cutting-edge technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`p-6 rounded-xl card-hover ${isDeveloper
                  ? 'quantum-card'
                  : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`text-xl font-semibold ${isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                    }`}>
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-all duration-200 ${isDeveloper
                          ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-all duration-200 ${isDeveloper
                          ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className={`mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                        : 'bg-blue-50 text-blue-600 border border-blue-200'
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/projects"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isDeveloper
                ? 'btn-quantum'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              <span>View All Projects</span>
              <Rocket className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className={`section-padding ${isDeveloper ? 'bg-gray-900/50' : 'bg-gray-50'
        }`}>
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`mb-4 ${isDeveloper ? 'text-green-400 neon-text font-quantum' : 'text-gray-900'
              }`}>
              Building the Future
            </h2>
            <p className={`text-lg ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
              } max-w-2xl mx-auto`}>
              Leading innovative companies that democratize AI and secure the decentralized web.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'AIALCHEMIST',
                role: 'Founder & CEO',
                description: 'Democratizing AI development with cutting-edge tools and platforms',
                stats: '10,000+ developers',
                color: isDeveloper ? 'text-green-400' : 'text-blue-600',
                icon: Brain,
                url: 'https://aialchemist.dev'
              },
              {
                name: 'VASILIADES',
                role: 'Co-Founder & CTO',
                description: 'Leading blockchain security firm specializing in smart contract auditing',
                stats: '$100M+ audited',
                color: isDeveloper ? 'text-cyan-400' : 'text-purple-600',
                icon: Globe,
                url: 'https://vasiliades.dev'
              }
            ].map((company, index) => (
              <motion.div
                key={company.name}
                className={`p-8 rounded-xl card-hover ${isDeveloper ? 'quantum-card' : 'elevated-card'
                  }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                      }`}>
                      {company.name}
                    </h3>
                    <p className={`text-sm font-medium ${company.color}`}>
                      {company.role}
                    </p>
                  </div>
                  <company.icon className={`h-8 w-8 ${company.color}`} />
                </div>

                <p className={`mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {company.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`text-lg font-semibold ${company.color}`}>
                    {company.stats}
                  </span>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDeveloper
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/teams"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isDeveloper
                ? 'btn-quantum'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              <span>Meet the Teams</span>
              <Zap className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}