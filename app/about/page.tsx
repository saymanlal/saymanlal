'use client';

import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../lib/theme-context';
import { MapPin, Mail, Phone, Download, ExternalLink } from 'lucide-react';
import personalInfo from '../../lib/data/personal-info.json';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const { settings } = useTheme();
  const isDeveloper = settings.theme === 'developer';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useAnimation();

  const socialIcons = {
    GitHub: '🐙',
    Twitter: '🐦',
    LinkedIn: '💼',
    'Dev.to': '👨‍💻',
    Medium: '✍️',
    CodeChef: '👨‍🍳'
  };

  // Binary effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Binary characters
    const binaryChars = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let animationFrameId: number;

    // Inside your useEffect, modify the draw function:
    const draw = () => {
      // Make background more opaque in entrepreneur mode
      ctx.fillStyle = isDeveloper ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Make text much more subtle in entrepreneur mode
      ctx.fillStyle = isDeveloper ? 'rgba(0, 255, 0, 0.8)' : 'rgba(0, 0, 0, 0.1)';
      ctx.font = `bold ${fontSize}px monospace`;

      // Draw the characters
      for (let i = 0; i < drops.length; i++) {
        const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDeveloper]);

  return (
    <>
      <Head>
        <title>About Sayman Lal</title>
        <meta name="description" content="Learn about Sayman&apos;s journey in development and business" />
        <meta property="og:title" content="About Sayman Lal" />
        <meta property="og:description" content="Learn about Sayman&apos;s journey in development and business" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=About`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      {/* Binary Effect Canvas - Only shown in developer mode */}
      {isDeveloper && (
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      <div className="relative min-h-[calc(100vh-64px)] py-8 z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Header - Positioned higher */}
            <div className="text-center mb-10">
              <motion.h1
                className={`text-4xl font-bold mb-3 ${isDeveloper ? 'text-green-400' : 'text-gray-900'
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                About Me
              </motion.h1>
              <motion.p
                className={`text-xl ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Get to know the person behind the code
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile Card */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className={`p-6 rounded-xl h-full ${isDeveloper
                  ? 'bg-gray-900/80 border-2 border-green-500/40 shadow-xl shadow-green-500/10 backdrop-blur-sm'
                  : 'bg-white/90 border-2 border-gray-200 shadow-xl backdrop-blur-sm'
                  }`}>
                  <div className="relative mb-5 flex justify-center">
                    <div className="relative">
                      <Image
                        src={personalInfo.imageUrl}
                        alt={personalInfo.name}
                        width={160}
                        height={160}
                        className="w-40 h-40 rounded-full object-cover border-4"
                        style={{
                          borderColor: isDeveloper ? '#00ff88' : '#3b82f6'
                        }}
                      />
                      <div className={`absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-xl ${isDeveloper ? 'bg-green-400 text-black' : 'bg-blue-600 text-white'
                        }`}>
                        🚀
                      </div>
                    </div>
                  </div>

                  <h2 className={`text-2xl font-bold text-center mb-2 ${isDeveloper ? 'text-green-400' : 'text-gray-900'
                    }`}>
                    {personalInfo.name}
                  </h2>
                  <p className={`text-lg text-center mb-3 ${isDeveloper ? 'text-green-300 font-mono' : 'text-blue-600'
                    }`}>
                    {personalInfo.alias}
                  </p>
                  <p className={`text-center mb-6 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    {personalInfo.title}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className={`flex items-center justify-center space-x-2 text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      <MapPin className="h-4 w-4" />
                      <span>{personalInfo.location}</span>
                    </div>
                    <div className={`flex items-center justify-center space-x-2 text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                        {personalInfo.email}
                      </a>
                    </div>
                    {personalInfo.phone && (
                      <div className={`flex items-center justify-center space-x-2 text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        <Phone className="h-4 w-4" />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <motion.a
                      href={personalInfo.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Resume</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Content Sections */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio Section */}
                <motion.div
                  className={`p-6 rounded-xl ${isDeveloper
                    ? 'bg-gray-900/80 border-2 border-green-500/40 shadow-xl shadow-green-500/10 backdrop-blur-sm'
                    : 'bg-white/90 border-2 border-gray-200 shadow-xl backdrop-blur-sm'
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className={`text-2xl font-bold mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-900'
                    }`}>
                    {isDeveloper ? 'Hi, CodeChemist' : 'My Story'}
                  </h3>
                  <div className={`prose ${isDeveloper ? 'prose-invert' : ''
                    } max-w-none`}>
                    <p className={`leading-relaxed ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      I&apos;m Sayman Lal, a passionate {personalInfo.bio}
                    </p>
                    <p className={`leading-relaxed ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      With over 3 years of experience in cutting-edge technology development, I specialize in creating
                      intelligent solutions that bridge the gap between complex technical challenges and real-world applications.
                    </p>
                    <p className={`leading-relaxed ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      As the founder of AIALCHEMIST and TEAM VASILIADES, I&apos;m passionate about democratizing access to AI
                      technology and empowering the next generation of developers.
                    </p>
                  </div>
                </motion.div>

                {/* Social Links Section */}
                <motion.div
                  className={`p-6 rounded-xl ${isDeveloper
                    ? 'bg-gray-900/80 border-2 border-green-500/40 shadow-xl shadow-green-500/10 backdrop-blur-sm'
                    : 'bg-white/90 border-2 border-gray-200 shadow-xl backdrop-blur-sm'
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className={`text-2xl font-bold mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-900'
                    }`}>
                    {isDeveloper ? 'Connect With Me' : 'Let&apos;s Connect'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {personalInfo.socials.map((social) => (
                      <motion.a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 p-3 rounded-lg ${isDeveloper
                          ? 'bg-gray-800/50 hover:bg-green-400/10 text-gray-300 hover:text-green-400 border border-gray-700 hover:border-green-400/30'
                          : 'bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200'
                          }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="text-lg">
                          {socialIcons[social.platform as keyof typeof socialIcons] || '🔗'}
                        </span>
                        <div>
                          <div className="font-medium text-sm">{social.platform}</div>
                          <div className="text-xs opacity-70">Follow</div>
                        </div>
                        <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Fun Facts Section */}
                <motion.div
                  className={`p-6 rounded-xl ${isDeveloper
                    ? 'bg-gray-900/80 border-2 border-green-500/40 shadow-xl shadow-green-500/10 backdrop-blur-sm'
                    : 'bg-white/90 border-2 border-gray-200 shadow-xl backdrop-blur-sm'
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className={`text-2xl font-bold mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-900'
                    }`}>
                    {isDeveloper ? 'Fun Facts' : 'Quick Facts'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: 'Favorite Language', value: 'Java', icon: '💻' },
                      { label: 'Daily Coffee', value: '2+ cups', icon: '☕' },
                      { label: 'AI Framework', value: 'TensorFlow', icon: '🧠' },
                      { label: 'Preferred IDE', value: 'VS Code', icon: '⚡' },
                      { label: 'Experience', value: '3+ years', icon: '📅' },
                      { label: 'Passion Project', value: 'AI for Good', icon: '🌟' },
                    ].map((fact, index) => (
                      <motion.div
                        key={fact.label}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${isDeveloper ? 'bg-gray-800/30' : 'bg-gray-50'
                          }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <span className="text-xl">{fact.icon}</span>
                        <div>
                          <div className={`text-sm ${isDeveloper ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            {fact.label}
                          </div>
                          <div className={`font-medium ${isDeveloper ? 'text-green-400' : 'text-gray-900'
                            }`}>
                            {fact.value}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}