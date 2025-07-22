'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTheme } from '../lib/theme-context';
import { 
  Github, ExternalLink, Code, Brain, Rocket, Terminal, Zap, Globe,
  Mail, BookOpen, Cpu, Shield, Lock, Database, Network, ChartLine,
  Users, Briefcase, Lightbulb, Award, Clock, Star, Layers, Settings,
  ChevronRight, ChevronDown, Circle, Square, Triangle
} from 'lucide-react';
import ThemeToggle from '../components/ui/theme-toggle';
import personalInfo from '../lib/data/personal-info.json';
import skillsData from '../lib/data/skills.json';
import { createClient } from '../lib/supabase/client';

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

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000/60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

export default function HomePage() {
  const { settings } = useTheme();
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [skillsInView, setSkillsInView] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const isDeveloper = settings.theme === 'developer';
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const animatedWords = ['Leadership', 'Innovation', 'AI', 'Web3', 'Vision', 'Future'];

  // Fixed variant types
  const fadeInUp: Variants = {
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

  const staggerContainer: Variants = {
    visible: { 
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const progressBarAnimation: Variants = {
    hidden: { width: 0 },
    visible: (width: number) => ({
      width: `${width}%`,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      }
    })
  };

  const fetchProjects = useCallback(async () => {
    try {
      setLoadingProjects(true);
      setProjectsError(null);

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeaturedProjects(data?.filter(project => project.featured).slice(0, 3) || []);
    } catch (error) {
      setProjectsError(error instanceof Error ? error.message : 'Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSkillsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (skillsSectionRef.current) observer.observe(skillsSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const typeWriter = useCallback(() => {
    const commands = [
      `> initializing the terminal...`,
      `> establishing neural interface...`,
      `> syncing with CodeChemist mainframe...`,
      ``,
      `> whoami`,
      `CodeChemist@2007:~$ Sayman Lal`,
      ``,
      `> cat /etc/mission.txt`,
      `// &quot;Engineering the autonomous web with Artificial Intelligence.&quot;`,
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

    const animate = () => {
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
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const startDelay = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (!isDeveloper) return;
    typeWriter();
  }, [isDeveloper, typeWriter]);

  useEffect(() => {
    if (isDeveloper) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isDeveloper, animatedWords.length]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  const topSkills = skillsData.categories.slice(0, 3);

  const renderFeaturedProjects = () => {
    if (loadingProjects) return (
      <div className="flex justify-center items-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isDeveloper ? 'border-green-400' : 'border-blue-500'}`}></div>
      </div>
    );

    if (projectsError) return (
      <div className={`p-8 rounded-xl text-center ${isDeveloper ? 'bg-gray-800/30 border border-red-400/20' : 'bg-red-50 border border-red-200'}`}>
        <div className={`text-2xl mb-4 ${isDeveloper ? 'text-red-400' : 'text-red-600'}`}>⚠️ Project Loading Error</div>
        <p className={`mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>{projectsError}</p>
        <button
          onClick={() => window.location.reload()}
          className={`px-4 py-2 rounded-lg ${isDeveloper ? 'bg-green-400/20 text-green-400' : 'bg-blue-600 text-white'}`}
        >
          Retry
        </button>
      </div>
    );

    if (featuredProjects.length === 0) return (
      <div className={`p-8 rounded-xl text-center ${isDeveloper ? 'bg-gray-800/30 border border-yellow-400/20' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className={`text-2xl mb-4 ${isDeveloper ? 'text-yellow-400' : 'text-yellow-600'}`}>No Featured Projects</div>
        <p className={`mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>Check back later for updates!</p>
      </div>
    );

    return (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {featuredProjects.map((project) => (
          <motion.div
            key={project.id}
            className={`p-6 rounded-xl card-hover ${isDeveloper ? 'bg-gray-800/30 border-2 border-green-500/40 shadow-xl shadow-green-500/10' : 'bg-white border-2 border-gray-200 shadow-xl'}`}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className={`text-xl font-semibold ${isDeveloper ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
                {project.title}
              </h3>
              <div className="flex space-x-2">
                {project.github_url && (
                  <motion.a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-200 ${isDeveloper ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="h-4 w-4" />
                  </motion.a>
                )}
                {project.demo_url && (
                  <motion.a
                    href={project.demo_url}
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
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {isDeveloper ? (
                <motion.div
                  className={`rounded-xl overflow-hidden ${isDeveloper ? 'bg-gray-900 border-2 border-green-500/40 shadow-xl shadow-green-500/10' : 'bg-white border-2 border-gray-200 shadow-xl'}`}
                  variants={fadeInUp}
                >
                  <div className="p-4 border-b border-gray-700 flex items-center">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-green-400 font-mono">terminal.js</span>
                  </div>
                  <div className="p-6 bg-black h-[350px] overflow-y-auto">
                    <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                      {terminalText}
                      {showCursor && <span className="bg-green-400 text-black animate-pulse">█</span>}
                    </pre>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <motion.h1
                    className="text-5xl md:text-7xl font-bold text-gray-900"
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

            {/* Right Column - Enhanced Stats with Counters */}
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
                  { value: 17, label: 'Repositories', icon: <Database className="h-6 w-6" /> },
                  { value: 3, label: 'Years', icon: <Clock className="h-6 w-6" /> },
                  { value: 2800, label: 'Followers', icon: <Users className="h-6 w-6" /> },
                  { value: 42, label: 'Projects', icon: <Lightbulb className="h-6 w-6" /> }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-xl text-center ${isDeveloper ? 'bg-gray-800/30 border-2 border-green-500/40 shadow-xl shadow-green-500/10' : 'bg-white border-2 border-gray-200 shadow-xl'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex justify-center mb-2">
                      {stat.icon}
                    </div>
                    <div className={`text-4xl font-bold mb-2 ${isDeveloper ? 'font-mono' : ''}`}>
                      {typeof stat.value === 'number' ? (
                        <Counter value={stat.value} duration={2} />
                      ) : (
                        stat.value
                      )}
                      {stat.label === 'Followers' && '+'}
                      {stat.label === 'Years' && '+'}
                    </div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className={`p-6 rounded-xl ${isDeveloper ? 'bg-gray-800/30 border-2 border-green-500/40 shadow-xl shadow-green-500/10' : 'bg-white border-2 border-gray-200 shadow-xl'}`}
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
                    { platform: 'LeetCode', rank: 'Top 75%', icon: <Cpu className="h-4 w-4" /> },
                    { platform: 'HackerRank', rank: '4 Star', icon: <Star className="h-4 w-4" /> },
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
        className={`py-16 px-4 sm:px-6 lg:px-8 ${isDeveloper ? 'bg-gray-900/50' : 'bg-gray-50'}`}
      >
        <div className="max-w-7xl mx-auto">
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
            {topSkills.map((category) => (
              <motion.div
                key={category.id}
                className={`p-6 rounded-xl ${isDeveloper ? 'bg-gray-800/30 border-2 border-green-500/40 shadow-xl shadow-green-500/10' : 'bg-white border-2 border-gray-200 shadow-xl'}`}
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
                      42 Projects
                    </span>
                    <span className={`${isDeveloper ? 'text-gray-400' : 'text-gray-500'}`}>
                      3+ Years
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <motion.a
              href="/skills"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isDeveloper ? 'bg-green-400/20 text-green-400 border-2 border-green-500/40 hover:bg-green-400/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

          {renderFeaturedProjects()}

          <div className="text-center mt-12">
            <motion.a
              href="/projects"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isDeveloper ? 'bg-green-400/20 text-green-400 border-2 border-green-500/40 hover:bg-green-400/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
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
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${isDeveloper ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
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
                stats: '2,000+ members',
                color: isDeveloper ? 'text-green-400' : 'text-blue-600',
                icon: Brain,
                url: 'https://aialchemist.vercel.app'
              },
              {
                name: 'TEAM VASILIADES',
                role: 'Team Lead & Developer',
                description: 'Leading blockchain security firm specializing in smart contract auditing',
                stats: '10+ Products/Projects',
                color: isDeveloper ? 'text-cyan-400' : 'text-purple-600',
                icon: Shield,
                url: 'https://vasiliades.dev'
              }
            ].map((company) => (
              <motion.div
                key={company.name}
                className={`p-8 rounded-xl ${isDeveloper ? 'bg-gray-800/30 border-2 border-green-500/40 shadow-xl shadow-green-500/10' : 'bg-white border-2 border-gray-200 shadow-xl'}`}
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
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDeveloper ? 'bg-green-400/20 text-green-400 border-2 border-green-500/40 hover:bg-green-400/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
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
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isDeveloper ? 'bg-green-400/20 text-green-400 border-2 border-green-500/40 hover:bg-green-400/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
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