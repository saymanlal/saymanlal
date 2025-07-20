'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal, Briefcase, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'About', href: '/about', icon: '👤' },
  { name: 'Projects', href: '/projects', icon: '💼' },
  { name: 'Blog', href: '/blog', icon: '✍️' },
  { name: 'Contact', href: '/contact', icon: '📬' },
  { name: 'CLI', href: '/cli', icon: '🧑‍💻' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { settings, toggleTheme } = useTheme();

  const isDeveloper = settings.theme === 'developer';

  return (
    <header className={`sticky top-0 z-50 ${
      isDeveloper 
        ? 'bg-black/90 border-green-500/30' 
        : 'bg-white/90 border-gray-200/50'
    } backdrop-blur-md border-b transition-all duration-300`}>
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className={`text-xl font-bold ${
                isDeveloper 
                  ? 'text-green-400 hover:text-green-300' 
                  : 'text-blue-600 hover:text-blue-700'
              } transition-colors duration-200`}
            >
              <span className="font-mono">
                {isDeveloper ? '<CodeChemist />' : 'Sayman Lal'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? isDeveloper
                          ? 'text-green-400 bg-green-400/10 neon-text'
                          : 'text-blue-600 bg-blue-50'
                        : isDeveloper
                          ? 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDeveloper
                  ? 'text-green-400 hover:bg-green-400/10 hover:text-green-300'
                  : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
              title={`Switch to ${isDeveloper ? 'Entrepreneur' : 'Developer'} mode`}
            >
              {isDeveloper ? (
                <Briefcase className="h-5 w-5" />
              ) : (
                <Terminal className="h-5 w-5" />
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className={`p-2 rounded-md ${
                  isDeveloper
                    ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                } transition-colors duration-200`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className={`py-4 space-y-2 ${
                isDeveloper
                  ? 'border-t border-green-500/30'
                  : 'border-t border-gray-200'
              }`}>
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
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
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}