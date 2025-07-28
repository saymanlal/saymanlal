// components/layout/header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Terminal, 
  Briefcase, 
  Home, 
  User, 
  Folder, 
  PenTool,
  Book, 
  Mail,
  Command
} from 'lucide-react';
import { useTheme } from '../../lib/theme-context';
import { motion, AnimatePresence } from 'framer-motion';

const getNavigation = (isDeveloper: boolean) => [
  { name: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
  { name: 'About', href: '/about', icon: <User className="h-4 w-4" /> },
  { name: 'Projects', href: '/projects', icon: <Folder className="h-4 w-4" /> },
  { name: 'Blog', href: '/blog', icon: <PenTool className="h-4 w-4" /> },
  { name: 'Contact', href: '/contact', icon: <Mail className="h-4 w-4" /> },
  { 
    name: isDeveloper ? 'CLI' : 'Book', 
    href: '/cli', 
    icon: isDeveloper ? <Command className="h-4 w-4" /> : <Book className="h-4 w-4" /> 
  },
];

export default function Header() {  // Removed the logoUrl prop since we're not using it
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { settings, toggleTheme } = useTheme();

  const isDeveloper = settings.theme === 'developer';
  const navigation = getNavigation(isDeveloper);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isDeveloper 
          ? scrolled 
            ? 'bg-black/80 backdrop-blur-md border-b border-green-500/20'
            : 'bg-transparent'
          : scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200'
            : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Now just text */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link 
                href="/" 
                className={`text-xl font-bold flex items-center ${
                  isDeveloper 
                    ? 'text-green-400 hover:text-green-300' 
                    : 'text-blue-600 hover:text-blue-700'
                } transition-colors duration-200`}
              >
                <span className="font-mono">
                  {isDeveloper ? (
                    <span className="text-2xl">&lt;CodeChemist/&gt;</span>
                  ) : (
                    <span className="text-2xl">Sayman Lal</span>
                  )}
                </span>
              </Link>
            </motion.div>

            {/* Rest of your existing code remains the same... */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? isDeveloper
                              ? 'text-green-400 bg-green-400/10'
                              : 'text-blue-600 bg-blue-50'
                            : isDeveloper
                              ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDeveloper
                    ? 'text-green-400 hover:bg-green-400/10 hover:text-green-300'
                    : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
                title={`Switch to ${isDeveloper ? 'Entrepreneur' : 'Developer'} mode`}
                whileHover={{ rotate: 15, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDeveloper ? (
                  <Briefcase className="h-5 w-5" />
                ) : (
                  <Terminal className="h-5 w-5" />
                )}
              </motion.button>

              <div className="md:hidden">
                <motion.button
                  type="button"
                  className={`p-2 rounded-full ${
                    isDeveloper
                      ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  } transition-colors duration-200`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden"
              >
                <div className={`pt-2 pb-4 space-y-1 ${
                  isDeveloper
                    ? 'border-t border-green-500/20'
                    : 'border-t border-gray-200'
                }`}>
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center px-4 py-3 mx-2 rounded-lg text-base font-medium transition-all duration-200 ${
                            isActive
                              ? isDeveloper
                                ? 'text-green-400 bg-green-400/10'
                                : 'text-blue-600 bg-blue-50'
                              : isDeveloper
                                ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
      
      <div className="h-20"></div>
    </>
  );
}