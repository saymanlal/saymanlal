'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Github, Linkedin, Twitter, Instagram,
  Globe, Code, Briefcase, ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import teamsData from '../../lib/data/teams.json';

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <Github size={16} />,
  LinkedIn: <Linkedin size={16} />,
  Twitter: <Twitter size={16} />,
  Instagram: <Instagram size={16} />,
  Website: <Globe size={16} />,
  X: <Twitter size={16} />,
  Behance: <Globe size={16} />,
  Dribbble: <Globe size={16} />
};

const roleColors: Record<string, string> = {
  'Founder': 'from-purple-500 to-pink-500',
  'CEO': 'from-blue-500 to-cyan-400',
  'COO': 'from-green-500 to-emerald-400',
  'CTO': 'from-orange-500 to-amber-400',
  'Lead': 'from-red-500 to-pink-400',
  'Core': 'from-indigo-500 to-blue-400',
  'Team': 'from-yellow-500 to-orange-400',
  'Designer': 'from-pink-500 to-rose-400',
  'Developer': 'from-blue-500 to-indigo-400',
  'Production': 'from-emerald-500 to-teal-400',
  'default': 'from-gray-500 to-gray-400'
};

export default function TeamsPage() {
  const [expandedBio, setExpandedBio] = useState<string | null>(null);
  const [isDeveloper] = useState(true); // You can make this dynamic if needed

  const toggleBio = (id: string) => {
    setExpandedBio(expandedBio === id ? null : id);
  };

  const getImageUrl = (url: string, isLogo = false) => {
    if (url.startsWith('http')) return url;
    return isLogo ? `${url}` : `${url}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {teamsData.organizations.map((org) => (
          <motion.section
            key={org.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-3xl overflow-hidden ${isDeveloper ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-2xl'}`}
          >
            {/* Organization Header */}
            <div className={`p-8 md:p-10 ${isDeveloper
              ? 'bg-gradient-to-r from-gray-900 to-gray-800'
              : 'bg-gradient-to-r from-blue-50 to-indigo-50'
              }`}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                    <Image
                      src={getImageUrl(org.logoUrl, true)}
                      alt={`${org.name} logo`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/256/3b82f6/ffffff?text=${org.name.substring(0, 2)}`;
                      }}
                    />
                  </div>
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${isDeveloper ? 'text-white' : 'text-gray-900'}`}>
                    {org.name}
                  </h2>
                  <p className={`text-lg mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                    {org.description}
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <motion.a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium ${isDeveloper
                        ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Globe size={18} />
                      Visit Website
                    </motion.a>
                    {org.type === 'hackathon' && (
                      <motion.div
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium ${isDeveloper
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                          : 'bg-purple-600 text-white'
                          }`}
                        whileHover={{ y: -2 }}
                      >
                        <Code size={18} />
                        Hackathon Team
                      </motion.div>
                    )}
                    {org.type === 'startup' && (
                      <motion.div
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium ${isDeveloper
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                          : 'bg-blue-600 text-white'
                          }`}
                        whileHover={{ y: -2 }}
                      >
                        <Briefcase size={18} />
                        Startup
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members Section */}
            <div className="p-8 md:p-10">
              {org.id === 'vasiliades' ? (
                <>
                  <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                    The Full Team
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {org.members.map((member) => (
                      <motion.div
                        key={member.id}
                        className={`rounded-2xl overflow-hidden ${isDeveloper
                          ? 'bg-gray-700/50 border border-gray-600'
                          : 'bg-white border border-gray-200 shadow-lg'
                          }`}
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="relative group">
                          <div className="w-full h-60 relative overflow-hidden">
                            <Image
                              src={getImageUrl(member.imageUrl)}
                              alt={member.name}
                              width={400}
                              height={240}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://i.pravatar.cc/300?u=${member.id}`;
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <h4 className="text-white text-xl font-bold">{member.name}</h4>
                              <p className={`text-sm ${isDeveloper ? 'text-green-400' : 'text-blue-300'}`}>
                                {member.role}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <AnimatePresence>
                            {expandedBio === member.id ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className={`text-sm mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {member.bio}
                                </p>
                              </motion.div>
                            ) : (
                              <motion.p
                                className={`text-sm mb-4 line-clamp-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}
                              >
                                {member.bio}
                              </motion.p>
                            )}
                          </AnimatePresence>

                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              {member.socials.map((social) => (
                                <motion.a
                                  key={social.platform}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2 rounded-lg ${isDeveloper
                                    ? 'bg-gray-600/50 text-gray-300 hover:bg-gray-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                  whileHover={{ y: -3 }}
                                  whileTap={{ scale: 0.9 }}
                                  title={social.platform}
                                >
                                  {socialIcons[social.platform] || <Globe size={16} />}
                                </motion.a>
                              ))}
                            </div>
                            <motion.button
                              onClick={() => toggleBio(member.id)}
                              className={`p-2 rounded-lg ${isDeveloper
                                ? 'bg-gray-600/50 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ChevronDown
                                size={18}
                                className={`transition-transform ${expandedBio === member.id ? 'rotate-180' : ''}`}
                              />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Founders Row - 2 cards */}
                  <div className="mb-16">
                    <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                      Founders
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      {org.members
                        .filter(m => m.role.includes('Founder') || m.role.includes('CEO') || m.role.includes('COO'))
                        .map((member) => (
                          <motion.div
                            key={member.id}
                            className={`rounded-2xl overflow-hidden ${isDeveloper
                              ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl'
                              }`}
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="p-6">
                              <motion.div
                                className={`w-24 h-24 rounded-full overflow-hidden border-4 mx-auto mb-5 ${isDeveloper ? 'border-green-400/30' : 'border-blue-400/30'}`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                              >
                                <Image
                                  src={getImageUrl(member.imageUrl)}
                                  alt={member.name}
                                  width={96}
                                  height={96}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://i.pravatar.cc/300?u=${member.id}`;
                                  }}
                                />
                              </motion.div>
                              <div>
                                <h4 className={`font-bold text-xl text-center ${isDeveloper ? 'text-white' : 'text-gray-900'}`}>
                                  {member.name}
                                </h4>
                                <p className={`text-sm text-center ${roleColors[member.role.split(' ')[0]] || roleColors.default
                                  } bg-clip-text text-transparent bg-gradient-to-r font-semibold`}>
                                  {member.role}
                                </p>
                              </div>

                              <p className={`text-sm my-6 text-center ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                                {member.bio}
                              </p>

                              <div className="flex justify-center gap-4">
                                {member.socials.map((social) => (
                                  <motion.a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg ${isDeveloper
                                      ? 'bg-gray-600/50 text-gray-300 hover:bg-gray-600'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                      }`}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={social.platform}
                                  >
                                    {socialIcons[social.platform] || <Globe size={16} />}
                                  </motion.a>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>

                  {/* Department Leads - 4 cards */}
                  <div className="mb-16">
                    <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                      Department Leads
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {org.members
                        .filter(member => member.role.includes('Lead') &&
                          !['Founder', 'CEO', 'COO'].some(title => member.role.includes(title)))
                        .slice(0, 4)
                        .map((member) => (
                          <motion.div
                            key={member.id}
                            className={`rounded-xl overflow-hidden ${isDeveloper
                              ? 'bg-gray-700/50 border border-gray-600'
                              : 'bg-white border border-gray-200 shadow-md'
                              }`}
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="p-5">
                              <motion.div
                                className={`w-20 h-20 rounded-full overflow-hidden border-2 mx-auto mb-4 ${isDeveloper ? 'border-green-400/30' : 'border-blue-400/30'}`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                              >
                                <Image
                                  src={getImageUrl(member.imageUrl)}
                                  alt={member.name}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://i.pravatar.cc/300?u=${member.id}`;
                                  }}
                                />
                              </motion.div>
                              <div className="text-center">
                                <h4 className={`font-bold ${isDeveloper ? 'text-white' : 'text-gray-900'}`}>
                                  {member.name}
                                </h4>
                                <p className={`text-xs ${roleColors[member.role.split(' ')[0]] || roleColors.default
                                  } bg-clip-text text-transparent bg-gradient-to-r font-semibold`}>
                                  {member.role}
                                </p>
                              </div>
                              <p className={`text-xs my-4 line-clamp-3 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                                {member.bio}
                              </p>
                              <div className="flex justify-center gap-2">
                                {member.socials.slice(0, 2).map((social) => (
                                  <motion.a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-1.5 rounded-lg ${isDeveloper
                                      ? 'bg-gray-600/50 text-gray-300 hover:bg-gray-600'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                      }`}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={social.platform}
                                  >
                                    {socialIcons[social.platform] || <Globe size={14} />}
                                  </motion.a>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>

                  {/* Core Team - 6 cards */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                      Core Team
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {org.members
                        .filter(m => m.role.includes('Core'))
                        .slice(0, 6)
                        .map((member) => (
                          <motion.div
                            key={member.id}
                            className={`rounded-lg overflow-hidden ${isDeveloper
                              ? 'bg-gray-700/30 border border-gray-600'
                              : 'bg-white border border-gray-200 shadow-sm'
                              }`}
                            whileHover={{ y: -3 }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="p-4 text-center">
                              <motion.div
                                className={`w-20 h-20 rounded-full overflow-hidden border-2 mx-auto mb-3 ${isDeveloper ? 'border-green-400/20' : 'border-blue-400/20'}`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                              >
                                <Image
                                  src={getImageUrl(member.imageUrl)}
                                  alt={member.name}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://i.pravatar.cc/300?u=${member.id}`;
                                  }}
                                />
                              </motion.div>
                              <h4 className={`font-bold text-sm mb-1 ${isDeveloper ? 'text-white' : 'text-gray-900'}`}>
                                {member.name}
                              </h4>
                              <p className={`text-xs mb-3 ${isDeveloper ? 'text-gray-400' : 'text-gray-500'}`}>
                                {member.role}
                              </p>
                              <div className="flex justify-center gap-1">
                                {member.socials.slice(0, 1).map((social) => (
                                  <motion.a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-1 rounded ${isDeveloper
                                      ? 'bg-gray-600/50 text-gray-300 hover:bg-gray-600'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                      }`}
                                    whileHover={{ y: -2, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={social.platform}
                                  >
                                    {socialIcons[social.platform] || <Globe size={14} />}
                                  </motion.a>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Organization Timeline */}
            {org.timeline && org.timeline.length > 0 && (
              <div className={`p-8 md:p-10 ${isDeveloper ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'}`}>
                  Key Milestones
                </h3>
                <div className="relative max-w-4xl mx-auto">
                  <div className={`absolute left-4 top-0 h-full w-0.5 ${isDeveloper ? 'bg-green-400/30' : 'bg-blue-400/30'}`}></div>

                  {org.timeline.map((event, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-12 pb-8"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${isDeveloper ? 'bg-green-400/20 border border-green-400/30' : 'bg-blue-100 border border-blue-200'}`}>
                        <div className={`w-3 h-3 rounded-full ${isDeveloper ? 'bg-green-400' : 'bg-blue-600'}`}></div>
                      </div>

                      <div className={`p-5 rounded-xl ${isDeveloper ? 'bg-gray-700/30 border border-gray-600' : 'bg-white border border-gray-200 shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-bold ${isDeveloper ? 'text-white' : 'text-gray-900'}`}>
                            {event.title}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded ${isDeveloper ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <p className={`text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        ))}
      </div>
    </div>
  );
}