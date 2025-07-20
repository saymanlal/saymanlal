'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { 
  Github, ExternalLink, Code, Brain, Rocket, Terminal, Zap, Globe,
  Mail, BookOpen, Cpu, Shield, Lock, Database, Network, ChartLine,
  Users, Briefcase, Lightbulb, Award, Clock, Star, Layers, Settings,
  ChevronRight, ChevronDown, Circle, Square, Triangle
} from 'lucide-react';
import ThemeToggle from '@/components/ui/theme-toggle';
import personalInfo from '@/lib/data/personal-info.json';
import projectsData from '@/lib/data/projects.json';
import skillsData from '@/lib/data/skills.json';

export default function HomePage() {
  const { settings } = useTheme();
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [skillsInView, setSkillsInView] = useState(false);
  const isDeveloper = settings.theme === 'developer';
  const skillsSectionRef = useRef<HTMLDivElement>(null);

  const animatedWords = ['Leadership', 'Innovation', 'AI', 'Web3', 'Vision', 'Future'];

  // Intersection Observer for skills section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsSectionRef.current) {
      observer.observe(skillsSectionRef.current);
    }

    return () => {
      if (skillsSectionRef.current) {
        observer.unobserve(skillsSectionRef.current);
      }
    };
  }, []);

  // Enhanced terminal effect with cursor
  useEffect(() => {
    if (!isDeveloper) return;

    const commands = [
      `> initializing the terminal...`,
      `> establishing neural interface...`,
      `> syncing with CodeChemist mainframe...`,
      ``,
      `> whoami`,
      `CodeChemist@2007:~$ Sayman Lal`,
      ``,
      `> cat /etc/mission.txt`,
      `// "Engineering the autonomous web with Artificial Intelligence."`,
      ``,
      `> ls /skills`,
      `AI/ML  |  Web3  |  MERN  |  Python  |  Cloud  |  Systems Design`,
      ``,
      `> echo $STATUS`,
      `>>> SYSTEM ONLINE — Ready to disrupt convention.`,
      ``,
      `> developer_mode --activate`,
      `⚡ All Protocols Engaged.`,
      `⌁ Welcome to my verse, CodeChemist.`
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let currentCommand = '';
    let animationFrameId: number;
    let lastUpdateTime = 0;
    const frameRate = 1000 / 15;

    const typeWriter = (timestamp: number) => {
      if (timestamp - lastUpdateTime > frameRate) {
        lastUpdateTime = timestamp;
        
        if (commandIndex < commands.length) {
          if (charIndex < commands[commandIndex].length) {
            currentCommand += commands[commandIndex].charAt(charIndex);
            setTerminalText(currentCommand);
            charIndex++;
          } else {
            currentCommand += '\n';
            setTerminalText(currentCommand);
            commandIndex++;
            charIndex = 0;
          }
        }
      }
      
      if (commandIndex < commands.length) {
        animationFrameId = requestAnimationFrame(typeWriter);
      }
    };

    const startDelay = setTimeout(() => {
      animationFrameId = requestAnimationFrame(typeWriter);
    }, 500);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDeveloper]);

  // Word rotation animation
  useEffect(() => {
    if (isDeveloper) return;

    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isDeveloper, animatedWords.length]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const featuredProjects = projectsData.projects.filter(p => p.featured).slice(0, 3);
  const topSkills = skillsData.categories.slice(0, 3);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const progressBarAnimation = {
    hidden: { width: 0 },
    visible: (width: number) => ({
      width: `${width}%`,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {isDeveloper ? (
                <motion.div 
                  className="terminal-window min-h-[400px] overflow-hidden"
                  variants={fadeInUp}
                >
                  <div className="terminal-header">
                    <div className="flex items-center mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="ml-4 text-sm text-green-500 font-mono">krushn@2007</span>
                        <div className="ml-auto flex items-center space-x-2">
                          <Terminal className="h-4 w-4 text-green-400" />
                          <span className="text-xs text-green-400">ACTIVE</span>
                        </div>
                      </div>
                      <span className="ml-4 text-sm text-green-300">terminal.js</span>
                    </div>
                  </div>
                  <div className="p-6 bg-black h-[350px] overflow-y-auto terminal-content">
                    <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap crt-effect">
                      {terminalText}
                      {showCursor && <span className="bg-green-400 text-black animate-pulse">█</span>}
                    </pre>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <motion.h1
                    className="text-5xl md:text-7xl font-bold text-gray-900 font-display"
                    variants={fadeInUp}
                  >
                    Sayman Lal
                  </motion.h1>

                  <motion.p
                    className="text-2xl md:text-3xl text-gray-600 font-light"
                    variants={fadeInUp}
                  >
                    Developer | Author | Entrepreneur
                  </motion.p>

                  <motion.div
                    className="text-xl md:text-2xl font-medium h-8 flex items-center"
                    variants={fadeInUp}
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
                    variants={fadeInUp}
                  >
                    {personalInfo.bio}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    variants={fadeInUp}
                  >
                    <motion.a
                      href="/contact"
                      className="flex items-center space-x-2 text-lg px-8 py-4 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Get In Touch</span>
                      <Mail className="h-4 w-4" />
                    </motion.a>
                    <motion.a
                      href="/projects"
                      className="flex items-center space-x-2 text-lg px-8 py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Projects</span>
                      <BookOpen className="h-4 w-4" />
                    </motion.a>
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

              <div className={`grid grid-cols-2 gap-6 ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                {[
                  { value: 127, label: 'Repositories', icon: <Database className="h-6 w-6" /> },
                  { value: '5+', label: 'Years', icon: <Clock className="h-6 w-6" /> },
                  { value: '2.8K', label: 'Followers', icon: <Users className="h-6 w-6" /> },
                  { value: '∞', label: 'Possibilities', icon: <Lightbulb className="h-6 w-6" /> }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-xl text-center ${isDeveloper ? 'bg-gray-800/30 border border-green-400/20' : 'bg-white border border-gray-200 shadow-lg'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex justify-center mb-2">
                      {stat.icon}
                    </div>
                    <div className={`text-4xl font-bold mb-2 ${isDeveloper ? 'font-mono' : ''}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className={`p-6 rounded-xl ${isDeveloper ? 'bg-gray-800/30 border border-green-400/20' : 'bg-white border border-gray-200 shadow-lg'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDeveloper ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
                  <Award className="h-5 w-5" />
                  Platform Rankings
                </h3>
                <div className="space-y-3">
                  {[
                    { platform: 'LeetCode', rank: 'Top 5%', icon: <Cpu className="h-4 w-4" /> },
                    { platform: 'HackerRank', rank: '5 Star', icon: <Star className="h-4 w-4" /> },
                    { platform: 'CodeChef', rank: '2156 Rating', icon: <ChartLine className="h-4 w-4" /> }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className={`text-sm flex items-center gap-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.icon}
                        {item.platform}
                      </span>
                      <span className={`text-sm font-medium ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                        {item.rank}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Expertise Preview */}
      <section 
        ref={skillsSectionRef}
        className={`section-padding ${isDeveloper ? 'bg-gray-900/50' : 'bg-gray-50'}`}
      >
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className={`mb-4 flex justify-center items-center gap-3 ${isDeveloper ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
              <Layers className="h-8 w-8" />
              Core Expertise
            </h2>
            <p className={`text-lg ${isDeveloper ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Specialized in cutting-edge technologies that drive innovation and create value.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {topSkills.map((category, index) => (
              <motion.div
                key={category.id}
                className={`p-6 rounded-xl card-hover ${isDeveloper ? 'bg-gray-800/30 border border-green-400/20' : 'bg-white border border-gray-200 shadow-lg'}`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="text-center mb-6">
                  <motion.div 
                    className={`text-4xl mb-4 ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}
                    whileHover={{ scale: 1.2 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDeveloper ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.skills.slice(0, 3).map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span className={`text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-700'}`}>
                        {skill.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-16 h-2 rounded-full ${isDeveloper ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <motion.div
                            className={`h-full rounded-full ${isDeveloper ? 'bg-green-400' : 'bg-blue-500'}`}
                            custom={skill.level}
                            initial="hidden"
                            animate={skillsInView ? "visible" : "hidden"}
                            variants={progressBarAnimation}
                          />
                        </div>
                        <span className={`text-xs font-medium ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
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
          </motion.div>

          <div className="text-center mt-12">
            <motion.a
              href="/skills"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isDeveloper ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore All Skills</span>
              <ChevronRight className="h-4 w-4" />
            </motion.a>
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
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className={`mb-4 flex justify-center items-center gap-3 ${isDeveloper ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
              <Briefcase className="h-8 w-8" />
              Featured Projects
            </h2>
            <p className={`text-lg ${isDeveloper ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Showcasing innovative solutions in AI, Web3, and cutting-edge technology.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`p-6 rounded-xl card-hover ${isDeveloper ? 'bg-gray-800/30 border border-green-400/20' : 'bg-white border border-gray-200 shadow-lg'}`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`text-xl font-semibold ${isDeveloper ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-all duration-200 ${isDeveloper ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="h-4 w-4" />
                      </motion.a>
                    )}
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-all duration-200 ${isDeveloper ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
                <p className={`mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <motion.span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${isDeveloper ? 'bg-green-400/20 text-green-400 border border-green-400/30' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <motion.a
              href="/projects"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isDeveloper ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Projects</span>
              <ChevronRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className={`section-padding ${isDeveloper ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className={`mb-4 flex justify-center items-center gap-3 ${isDeveloper ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
              <Settings className="h-8 w-8" />
              Building the Future
            </h2>
            <p className={`text-lg ${isDeveloper ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Leading innovative companies that democratize AI and secure the decentralized web.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
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
                icon: Shield,
                url: 'https://vasiliades.dev'
              }
            ].map((company, index) => (
              <motion.div
                key={company.name}
                className={`p-8 rounded-xl card-hover ${isDeveloper ? 'bg-gray-800/30 border border-green-400/20' : 'bg-white border border-gray-200 shadow-lg'}`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${isDeveloper ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
                      {company.name}
                    </h3>
                    <p className={`text-sm font-medium ${company.color}`}>
                      {company.role}
                    </p>
                  </div>
                  <company.icon className={`h-8 w-8 ${company.color}`} />
                </div>

                <p className={`mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                  {company.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`text-lg font-semibold ${company.color}`}>
                    {company.stats}
                  </span>
                  <motion.a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDeveloper ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Visit</span>
                    <ChevronRight className="h-3 w-3" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <motion.a
              href="/teams"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isDeveloper ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Meet the Teams</span>
              <ChevronRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}