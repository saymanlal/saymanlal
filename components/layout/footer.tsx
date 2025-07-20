'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme-context';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import personalInfo from '@/lib/data/personal-info.json';

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
};

export default function Footer() {
  const { settings } = useTheme();
  const isDeveloper = settings.theme === 'developer';

  return (
    <footer className={`${
      isDeveloper 
        ? 'bg-black border-green-500/30 text-gray-300' 
        : 'bg-gray-50 border-gray-200 text-gray-600'
    } border-t transition-all duration-300`}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-lg font-bold mb-4 ${
              isDeveloper ? 'text-green-400 font-mono' : 'text-blue-600'
            }`}>
              {isDeveloper ? '<CodeChemist />' : 'Sayman Lal'}
            </h3>
            <p className={`mb-4 max-w-md ${
              isDeveloper ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {personalInfo.bio}
            </p>
            <div className="flex space-x-4">
              {personalInfo.socials.slice(0, 4).map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons] || ExternalLink;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isDeveloper
                        ? 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    title={social.platform}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              isDeveloper ? 'text-green-400' : 'text-gray-900'
            }`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'About', href: '/about' },
                { name: 'Projects', href: '/projects' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 ${
                      isDeveloper
                        ? 'text-gray-400 hover:text-green-400'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              isDeveloper ? 'text-green-400' : 'text-gray-900'
            }`}>
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Certificates', href: '/certificates' },
                { name: 'CLI Playground', href: '/cli' },
                { name: 'Resume', href: personalInfo.resumeUrl || '#' },
                { name: 'AIALCHEMIST', href: 'https://aialchemist.dev' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`transition-colors duration-200 ${
                      isDeveloper
                        ? 'text-gray-400 hover:text-green-400'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${
          isDeveloper ? 'border-green-500/30' : 'border-gray-200'
        } flex flex-col md:flex-row justify-between items-center`}>
          <p className={`text-sm ${
            isDeveloper ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} Sayman Lal. All rights reserved.
          </p>
          <p className={`text-sm mt-2 md:mt-0 ${
            isDeveloper ? 'text-gray-400 font-mono' : 'text-gray-600'
          }`}>
            {isDeveloper ? '> Built with Next.js, TypeScript & ❤️' : 'Built with Next.js, TypeScript & ❤️'}
          </p>
        </div>
      </div>
    </footer>
  );
}