'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../lib/theme-context';
import {
  ExternalLink, Mail, Github, Linkedin, Twitter, Instagram,
  Globe, Award, Calendar, Users, Code, Briefcase, Star, ChevronDown, User
} from 'lucide-react';

// Type definitions
type SocialLink = {
  platform: string;
  url: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  email: string;
  socials: SocialLink[];
  skills?: string[];
};

type Organization = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
  type: 'startup' | 'hackathon';
  members: TeamMember[];
  timeline?: {
    title: string;
    date: string;
    description: string;
  }[];
};

// Component definitions
const MemberCard = ({ member, isDeveloper }: { member: TeamMember; isDeveloper: boolean }) => {
  const cardStyle = isDeveloper
    ? 'bg-gray-700/50 border border-gray-600'
    : 'bg-white border border-gray-200 shadow-md';

  const textStyle = isDeveloper ? 'text-white' : 'text-gray-900';
  const secondaryTextStyle = isDeveloper ? 'text-gray-300' : 'text-gray-600';
  const buttonStyle = isDeveloper
    ? 'bg-gray-600/50 hover:bg-gray-600 text-gray-300'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-600';

  return (
    <motion.div
      className={`rounded-xl overflow-hidden ${cardStyle}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${isDeveloper ? 'border-green-400/30' : 'border-blue-400/30'
            }`}>
            <img
              src={member.imageUrl.startsWith('/') ? member.imageUrl : `/images/${member.imageUrl}`}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://i.pravatar.cc/300?u=${member.id}`;
              }}
            />
          </div>
          <div>
            <h4 className={`font-bold ${textStyle}`}>{member.name}</h4>
            <p className={`text-xs ${roleColors[member.role.split(' ')[0] as keyof typeof roleColors] || roleColors.default
              } bg-clip-text text-transparent bg-gradient-to-r font-semibold`}>
              {member.role}
            </p>
          </div>
        </div>
        <p className={`text-sm mb-4 line-clamp-3 ${secondaryTextStyle}`}>
          {member.bio}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {member.socials.slice(0, 2).map((social) => (
              <SocialButton
                key={social.platform}
                social={social}
                isDeveloper={isDeveloper}
              />
            ))}
          </div>
          <EmailButton
            email={member.email}
            buttonStyle={buttonStyle}
          />
        </div>
      </div>
    </motion.div>
  );
};

const SocialButton = ({ social, isDeveloper }: { social: SocialLink; isDeveloper: boolean }) => (
  <motion.a
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-1.5 rounded-lg ${isDeveloper
      ? 'bg-gray-600/50 text-gray-300 hover:bg-gray-600'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.9 }}
    title={social.platform}
  >
    {socialIcons[social.platform as keyof typeof socialIcons] || <Globe size={14} />}
  </motion.a>
);

const EmailButton = ({ email, buttonStyle }: { email: string; buttonStyle: string }) => (
  <motion.a
    href={`mailto:${email}`}
    className={`text-xs px-3 py-1.5 rounded-lg ${buttonStyle}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Contact
  </motion.a>
);

// Constants
const socialIcons = {
  GitHub: <Github size={16} />,
  LinkedIn: <Linkedin size={16} />,
  Twitter: <Twitter size={16} />,
  Instagram: <Instagram size={16} />,
  Website: <Globe size={16} />,
  X: <Twitter size={16} />
};

const roleColors = {
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

// Main component
export default function TeamsPage() {
  const { settings } = useTheme();
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [expandedBio, setExpandedBio] = useState<string | null>(null);
  const isDeveloper = settings.theme === 'developer';

  const toggleBio = (memberId: string) => {
    setExpandedBio(expandedBio === memberId ? null : memberId);
  };

  const getImageUrl = (url: string, isLogo = false) => {
    if (url.startsWith('/')) {
      return url;
    }
    return isLogo
      ? `https://via.placeholder.com/256/3b82f6/ffffff?text=${url.split('/').pop()?.split('.')[0]}`
      : `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`;
  };

  return (
    <div className={`min-h-screen ${isDeveloper ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container-custom py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${isDeveloper ? 'from-green-400 to-blue-500' : 'from-blue-600 to-purple-600'
            }`}>
            Team Support
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Meet the brilliant minds behind our innovative organizations
          </p>
        </motion.div>

        {/* Organization Selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12 sticky top-4 z-10 py-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => setSelectedOrg(null)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${!selectedOrg
              ? isDeveloper
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
              : isDeveloper
                ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
          >
            {!selectedOrg && <Star className="w-5 h-5 mr-2" />}
            All Teams
          </button>
          {teamsData.organizations.map((org) => (
            <motion.button
              key={org.id}
              onClick={() => setSelectedOrg(org.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${selectedOrg === org.id
                ? isDeveloper
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                : isDeveloper
                  ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedOrg === org.id && <Star className="w-5 h-5 mr-2" />}
              {org.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Organizations */}
        <div className="space-y-20">
          {teamsData.organizations
            .filter(org => !selectedOrg || org.id === selectedOrg)
            .map((organization) => (
              <OrganizationSection
                key={organization.id}
                organization={organization}
                isDeveloper={isDeveloper}
                expandedBio={expandedBio}
                toggleBio={toggleBio}
                getImageUrl={getImageUrl}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

const OrganizationSection = ({
  organization,
  isDeveloper,
  expandedBio,
  toggleBio,
  getImageUrl
}: {
  organization: Organization;
  isDeveloper: boolean;
  expandedBio: string | null;
  toggleBio: (id: string) => void;
  getImageUrl: (url: string, isLogo?: boolean) => string;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-3xl overflow-hidden ${isDeveloper ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-2xl'
        }`}
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
              <img
                src={getImageUrl(organization.logoUrl, true)}
                alt={`${organization.name} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/256/3b82f6/ffffff?text=${organization.name.substring(0, 2)}`;
                }}
              />
            </div>
          </motion.div>
          <div className="flex-1 text-center md:text-left">
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${isDeveloper ? 'text-white' : 'text-gray-900'
              }`}>
              {organization.name}
            </h2>
            <p className={`text-lg mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {organization.description}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <motion.a
                href={organization.website}
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
              {organization.type === 'hackathon' && (
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
              {organization.type === 'startup' && (
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
        {organization.id === 'vasiliades' ? (
          <VasiliadesTeam
            organization={organization}
            isDeveloper={isDeveloper}
            expandedBio={expandedBio}
            toggleBio={toggleBio}
            getImageUrl={getImageUrl}
          />
        ) : (
          <AialchemistTeam
            organization={organization}
            isDeveloper={isDeveloper}
            getImageUrl={getImageUrl}
          />
        )}
      </div>

      {/* Organization Timeline */}
      {organization.timeline && organization.timeline.length > 0 && (
        <div className={`p-8 md:p-10 ${isDeveloper ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
          <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'
            }`}>
            Key Milestones
          </h3>
          <div className="relative max-w-4xl mx-auto">
            <div className={`absolute left-4 top-0 h-full w-0.5 ${isDeveloper ? 'bg-green-400/30' : 'bg-blue-400/30'
              }`}></div>

            {organization.timeline.map((event, index) => (
              <motion.div
                key={index}
                className="relative pl-12 pb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${isDeveloper ? 'bg-green-400/20 border border-green-400/30' : 'bg-blue-100 border border-blue-200'
                  }`}>
                  <div className={`w-3 h-3 rounded-full ${isDeveloper ? 'bg-green-400' : 'bg-blue-600'
                    }`}></div>
                </div>

                <div className={`p-5 rounded-xl ${isDeveloper ? 'bg-gray-700/30 border border-gray-600' : 'bg-white border border-gray-200 shadow-sm'
                  }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-bold ${isDeveloper ? 'text-white' : 'text-gray-900'
                      }`}>
                      {event.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded ${isDeveloper ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className={`text-sm ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
};

const VasiliadesTeam = ({
  organization,
  isDeveloper,
  expandedBio,
  toggleBio,
  getImageUrl
}: {
  organization: Organization;
  isDeveloper: boolean;
  expandedBio: string | null;
  toggleBio: (id: string) => void;
  getImageUrl: (url: string, isLogo?: boolean) => string;
}) => {
  return (
    <>
      <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'
        }`}>
        The Full Team
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {organization.members.map((member) => (
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
                <img
                  src={getImageUrl(member.imageUrl.startsWith('/') ? member.imageUrl : `/images/${member.imageUrl}`)}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://i.pravatar.cc/300?u=${member.id}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white text-xl font-bold">{member.name}</h4>
                  <p className={`text-sm ${isDeveloper ? 'text-green-400' : 'text-blue-300'
                    }`}>
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
                    <p className={`text-sm mb-4 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      {member.bio}
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    className={`text-sm mb-4 line-clamp-2 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}
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
                      {socialIcons[social.platform as keyof typeof socialIcons] || <Globe size={16} />}
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
                    className={`transition-transform ${expandedBio === member.id ? 'rotate-180' : ''
                      }`}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

const AialchemistTeam = ({
  organization,
  isDeveloper,
  getImageUrl
}: {
  organization: Organization;
  isDeveloper: boolean;
  getImageUrl: (url: string, isLogo?: boolean) => string;
}) => {
  return (
    <>
      {/* Founders Row - 2 cards */}
      <div className="mb-16">
        <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'
          }`}>
          Founders
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {organization.members
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
                    <img
                      src={member.imageUrl.startsWith('/') ? member.imageUrl : `/images/${member.imageUrl}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://i.pravatar.cc/300?u=${member.id}`;
                      }}
                    />
                  </motion.div>
                  <div>
                    <h4 className={`font-bold text-xl text-center ${isDeveloper ? 'text-white' : 'text-gray-900'
                      }`}>
                      {member.name}
                    </h4>
                    <p className={`text-sm text-center ${roleColors[member.role.split(' ')[0] as keyof typeof roleColors] || roleColors.default
                      } bg-clip-text text-transparent bg-gradient-to-r font-semibold`}>
                      {member.role}
                    </p>
                  </div>

                  <p className={`text-sm my-6 text-center ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                    }`}>
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
                        {socialIcons[social.platform as keyof typeof socialIcons] || <Globe size={16} />}
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
        <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'
          }`}>
          Department Leads
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {organization.members
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
                    <img
                      src={member.imageUrl.startsWith('/') ? member.imageUrl : `/images/${member.imageUrl}`}
                      alt={member.name}
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
                    <p className={`text-xs ${roleColors[member.role.split(' ')[0] as keyof typeof roleColors] || roleColors.default
                      } bg-clip-text text-transparent bg-gradient-to-r font-semibold`}>
                      {member.role}
                    </p>
                  </div>
                  <p className={`text-xs my-4 line-clamp-3 ${isDeveloper ? 'text-gray-300' : 'text-gray-600'
                    }`}>
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
                        {socialIcons[social.platform as keyof typeof socialIcons] || <Globe size={14} />}
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
        <h3 className={`text-2xl font-bold mb-8 text-center ${isDeveloper ? 'text-green-400' : 'text-blue-600'
          }`}>
          Core Team
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {organization.members
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
                    <img
                      src={member.imageUrl.startsWith('/') ? member.imageUrl : `/images/${member.imageUrl}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://i.pravatar.cc/300?u=${member.id}`;
                      }}
                    />
                  </motion.div>
                  <h4 className={`font-bold text-sm mb-1 ${isDeveloper ? 'text-white' : 'text-gray-900'
                    }`}>
                    {member.name}
                  </h4>
                  <p className={`text-xs mb-3 ${isDeveloper ? 'text-gray-400' : 'text-gray-500'
                    }`}>
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
                        {socialIcons[social.platform as keyof typeof socialIcons] || <Globe size={14} />}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </>
  );
};

// Data
const teamsData = {
  organizations: [
    {
      id: 'vasiliades',
      name: 'Team Vasiliades',
      description: 'Innovative design collective pushing creative boundaries',
      logoUrl: '/logos/team-vasiliades.png',
      website: 'https://vasiliades.com',
      type: 'hackathon',
      members: [
        // Leadership
        {
          id: 'sayman',
          name: 'Sayman Lal',
          role: 'Team Lead',
          imageUrl: 'sayman.png',
          bio: 'Visionary leader with 3+ years in creative direction and brand strategy.',
          email: 'businesssayman@gmail.com',
          socials: [
            { platform: 'GitHub', url: 'https://github.com/worksofsayman' },
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/worksofsayman' },
            { platform: 'Website', url: 'https://worksofsayman.vercel.app' }
          ]
        },
        // Department Leads
        {
          id: 'utkarsh',
          name: 'Utkarsh Kushwaha',
          role: 'Technical Lead',
          imageUrl: 'utkarsh.png',
          bio: 'Full-stack developer with expertise in creative coding and interactive installations.',
          email: 'utkarsh@vasiliades.com',
          socials: [
            { platform: 'GitHub', url: 'https://github.com/worksofsayman' },
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/worksofsayman' },
            { platform: 'Website', url: 'https://worksofsayman.vercel.app' }
          ]
        },
        {
          id: 'praveen',
          name: 'Praveen Rajak',
          role: 'Design Lead',
          imageUrl: 'praveen.png',
          bio: 'Award-winning designer specializing in UX/UI and brand identity systems.',
          email: 'praveen@vasiliades.com',
          socials: [
            { platform: 'GitHub', url: 'https://github.com/worksofsayman' },
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/worksofsayman' },
            { platform: 'Website', url: 'https://worksofsayman.vercel.app' }
          ]
        },
        {
          id: 'kaustubh',
          name: 'Kaustubh Sen',
          role: 'Marketing Lead',
          imageUrl: 'kaustubh.png',
          bio: 'Digital marketing strategist with a focus on creative communities and brand growth.',
          email: 'kaustubh@vasiliades.com',
          socials: [
            { platform: 'GitHub', url: 'https://github.com/worksofsayman' },
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/worksofsayman' },
            { platform: 'Website', url: 'https://worksofsayman.vercel.app' }
          ]
        },
        {
          id: 'yash',
          name: 'Yash Namdeo',
          role: 'Production Lead',
          imageUrl: 'yash.png',
          bio: 'Experienced producer managing complex creative projects and client relationships.',
          email: 'yash@vasiliades.com',
          socials: [
            { platform: 'GitHub', url: 'https://github.com/worksofsayman' },
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/worksofsayman' },
            { platform: 'Website', url: 'https://worksofsayman.vercel.app' }
          ]
        }
      ],
      timeline: [
        {
          title: 'Assembled',
          date: '2024-12-11',
          description: 'Built ALGOVisualizer'
        },
        {
          title: 'Built ALGOVisualizer',
          date: '2024-12-23',
          description: 'Won 2nd position in "Genethon" Hackathon'
        },
        {
          title: 'CodeNakshatra 2025',
          date: '2024-04-04',
          description: 'Presented ArtMart in Greater Noida'
        }
      ]
    },
    {
      id: 'aialchemist',
      name: 'AIALCHEMIST',
      description: 'Transforming ideas into AI-powered solutions',
      logoUrl: '/logos/aialchemist.png',
      website: 'https://aialchemist.vercel.app',
      type: 'startup',
      members: [
        // Founders (2)
        {
          id: 'sayman',
          name: 'Sayman Lal',
          role: 'Founder & CEO',
          imageUrl: 'sayman.png',
          bio: 'Serial entrepreneur with background in AI research and product development.',
          email: 'businesssayman@gmail.com',
          socials: [
            { platform: 'GitHub', url: 'https://github.com/worksofsayman' },
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/saymanlal' },
            { platform: 'X', url: 'https://x.com/saymanlal' }
          ]
        },
        {
          id: 'aadeesh',
          name: 'Aadeesh Jain',
          role: 'Co-Founder & COO',
          imageUrl: 'aadeesh.png',
          bio: 'Operations expert with experience scaling multiple tech startups.',
          email: 'aadeesh@aialchemist.io',
          socials: [

            { platform: 'GitHub', url: 'https://github.com/itsmeaadeesh' },
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/itsmeaadeesh' },
            { platform: 'X', url: 'https://x.com/itsmeaadeesh' }
          ]
        },
        // Department Leads (4)
        {
          id: 'kaustubh',
          name: 'Kaustubh Sen',
          role: 'Technology Lead',
          imageUrl: 'kaustubh.png',
          bio: 'Machine learning specialist leading our technical vision and architecture.',
          email: 'kaustubh@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },
            { platform: 'X', url: 'https://x.com/itsmeaadeesh' }
          ]
        },
        {
          id: 'yash',
          name: 'Yash Namdeo',
          role: 'Engineering Lead',
          imageUrl: 'yash.png',
          bio: 'Full-stack developer with expertise in AI integration and cloud infrastructure.',
          email: 'yash@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },
            { platform: 'X', url: 'https://x.com/itsmeaadeesh' }
          ]
        },
        {
          id: 'shalab',
          name: 'Shalab Shrivastava',
          role: 'Management Lead',
          imageUrl: 'shalab.png',
          bio: 'Operations specialist managing team workflows and client relationships.',
          email: 'shalab@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },
            { platform: 'X', url: 'https://x.com/itsmeaadeesh' }
          ]
        },
        {
          id: 'shailendra',
          name: 'Shailendra Yadav',
          role: 'Design Lead',
          imageUrl: 'shailendra.png',
          bio: 'Creative director focused on human-centered AI interactions and branding.',
          email: 'shailendra@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },
            { platform: 'X', url: 'https://x.com/itsmeaadeesh' }
          ]
        },
        // Core Team (6)
        {
          id: 'utkarsh',
          name: 'Utkarsh Kushwaha',
          role: 'Core Team',
          imageUrl: 'utkarsh.png',
          bio: 'Backend engineer building our API infrastructure and services.',
          email: 'utkarsh@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },
          ]
        },
        {
          id: 'shreya',
          name: 'Shreya Patel',
          role: 'Core Team',
          imageUrl: 'shreya.png',
          bio: 'Frontend developer creating intuitive interfaces for complex AI tools.',
          email: 'shreya@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },
          ]
        },
        {
          id: 'praveen',
          name: 'Praveen Rajak',
          role: 'Core Team',
          imageUrl: 'praveen.png',
          bio: 'Full-stack developer working on AI integration features.',
          email: 'praveen@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },]
        },
        {
          id: 'swastik',
          name: 'Swastik Dubey',
          role: 'Core Team',
          imageUrl: 'swastik.png',
          bio: 'Mobile developer building our cross-platform applications.',
          email: 'swastik@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },]
        },
        {
          id: 'divyansh',
          name: 'Divyansh Gautam',
          role: 'Core Team',
          imageUrl: 'divyansh.png',
          bio: 'DevOps engineer managing our cloud infrastructure and deployments.',
          email: 'divyansh@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },]
        },
        {
          id: 'priya',
          name: 'Priya Chaturvedi',
          role: 'Core Team',
          imageUrl: 'priya.png',
          bio: 'QA engineer ensuring product quality and performance.',
          email: 'priya@aialchemist.io',
          socials: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/kaustubh' },]
        }
      ]
    }
  ]
};