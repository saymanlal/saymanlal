'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { MapPin, Mail, Phone, Download, ExternalLink } from 'lucide-react';
import personalInfo from '@/lib/data/personal-info.json';

export default function AboutPage() {
  const { settings } = useTheme();
  const isDeveloper = settings.theme === 'developer';

  const socialIcons = {
    GitHub: '🐙',
    Twitter: '🐦',
    LinkedIn: '💼',
    'Dev.to': '👨‍💻',
    Medium: '✍️',
    CodeChef: '👨‍🍳'
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className={`mb-4 ${
              isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'
            }`}>
              About Me
            </h1>
            <p className={`text-xl ${
              isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get to know the person behind the code
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image & Basic Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={`p-8 rounded-xl text-center ${
                isDeveloper 
                  ? 'glass-dark border-green-500/30' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <div className="relative mb-6">
                  <img
                    src={personalInfo.imageUrl}
                    alt={personalInfo.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-current"
                    style={{
                      borderColor: isDeveloper ? '#00ff88' : '#3b82f6'
                    }}
                  />
                  <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    isDeveloper ? 'bg-green-400 text-black' : 'bg-blue-600 text-white'
                  }`}>
                    🚀
                  </div>
                </div>

                <h2 className={`text-2xl font-bold mb-2 ${
                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                }`}>
                  {personalInfo.name}
                </h2>
                <p className={`text-lg mb-4 ${
                  isDeveloper ? 'text-green-300 font-mono' : 'text-blue-600'
                }`}>
                  {personalInfo.alias}
                </p>
                <p className={`mb-6 ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {personalInfo.title}
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className={`flex items-center justify-center space-x-2 text-sm ${
                    isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <MapPin className="h-4 w-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className={`flex items-center justify-center space-x-2 text-sm ${
                    isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                      {personalInfo.email}
                    </a>
                  </div>
                  {personalInfo.phone && (
                    <div className={`flex items-center justify-center space-x-2 text-sm ${
                      isDeveloper ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <Phone className="h-4 w-4" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                </div>

                {/* Download Resume */}
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isDeveloper
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>

            {/* Bio & Details */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Bio */}
              <div className={`p-8 rounded-xl ${
                isDeveloper 
                  ? 'glass-dark border-green-500/30' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                }`}>
                  {isDeveloper ? '// About CodeChemist' : 'My Story'}
                </h3>
                <div className={`prose prose-lg ${
                  isDeveloper ? 'prose-invert' : ''
                } max-w-none`}>
                  <p className={`leading-relaxed ${
                    isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {personalInfo.bio}
                  </p>
                  <p className={`leading-relaxed ${
                    isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    With over 5 years of experience in cutting-edge technology development, I specialize in creating 
                    intelligent solutions that bridge the gap between complex technical challenges and real-world applications. 
                    My journey spans from building neural networks for computer vision to architecting decentralized 
                    financial systems.
                  </p>
                  <p className={`leading-relaxed ${
                    isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    As the founder of AIALCHEMIST and VASILIADES, I'm passionate about democratizing access to AI 
                    technology and empowering the next generation of developers to build the future we envision.
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className={`p-8 rounded-xl ${
                isDeveloper 
                  ? 'glass-dark border-green-500/30' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                }`}>
                  {isDeveloper ? '// Connect' : 'Let\'s Connect'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {personalInfo.socials.map((social) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 ${
                        isDeveloper
                          ? 'bg-gray-800/50 hover:bg-green-400/10 text-gray-300 hover:text-green-400 border border-gray-700 hover:border-green-400/30'
                          : 'bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xl">
                        {socialIcons[social.platform as keyof typeof socialIcons] || '🔗'}
                      </span>
                      <div>
                        <div className="font-medium text-sm">{social.platform}</div>
                        <div className="text-xs opacity-70">Follow</div>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto opacity-50" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              <div className={`p-8 rounded-xl ${
                isDeveloper 
                  ? 'glass-dark border-green-500/30' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                }`}>
                  {isDeveloper ? '// Fun Facts' : 'Quick Facts'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Favorite Programming Language', value: 'Python 🐍', icon: '💻' },
                    { label: 'Coffee Consumed Daily', value: '5+ cups ☕', icon: '☕' },
                    { label: 'Favorite AI Framework', value: 'TensorFlow', icon: '🧠' },
                    { label: 'Preferred IDE', value: 'VS Code', icon: '⚡' },
                    { label: 'Years of Experience', value: '5+ years', icon: '📅' },
                    { label: 'Passion Project', value: 'AI for Good', icon: '🌟' },
                  ].map((fact, index) => (
                    <motion.div
                      key={fact.label}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        isDeveloper ? 'bg-gray-800/30' : 'bg-gray-50'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <span className="text-2xl">{fact.icon}</span>
                      <div>
                        <div className={`text-sm ${
                          isDeveloper ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {fact.label}
                        </div>
                        <div className={`font-medium ${
                          isDeveloper ? 'text-green-400' : 'text-gray-900'
                        }`}>
                          {fact.value}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}