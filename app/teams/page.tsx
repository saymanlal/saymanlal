'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { ExternalLink, Mail, Users, MapPin, Calendar, Award, Handshake, Building } from 'lucide-react';
import teamsData from '@/lib/data/teams.json';

export default function TeamsPage() {
  const { settings } = useTheme();
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const isDeveloper = settings.theme === 'developer';

  const socialIcons = {
    GitHub: '🐙',
    LinkedIn: '💼',
    Twitter: '🐦',
    Medium: '✍️',
    'Dev.to': '👨‍💻'
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className={`mb-4 ${
              isDeveloper ? 'text-green-400 neon-text font-quantum' : 'text-gray-900'
            }`}>
              Organizations & Teams
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Building the future through innovative companies and exceptional teams
            </p>
          </div>

          {/* Organization Selector */}
          <motion.div
            className="flex justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
              onClick={() => setSelectedOrg(null)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                !selectedOrg
                  ? isDeveloper
                    ? 'bg-green-400/20 text-green-400 border border-green-400/30 quantum-glow'
                    : 'bg-blue-600 text-white shadow-lg'
                  : isDeveloper
                    ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
              }`}
            >
              All Organizations
            </button>
            {teamsData.organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrg(org.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedOrg === org.id
                    ? isDeveloper
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30 quantum-glow'
                      : 'bg-blue-600 text-white shadow-lg'
                    : isDeveloper
                      ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
                }`}
              >
                {org.name}
              </button>
            ))}
          </motion.div>

          {/* Organizations */}
          <div className="space-y-16">
            {teamsData.organizations
              .filter(org => !selectedOrg || org.id === selectedOrg)
              .map((organization, orgIndex) => (
                <motion.div
                  key={organization.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: orgIndex * 0.2 }}
                  className={`p-8 rounded-2xl ${
                    isDeveloper ? 'quantum-card' : 'elevated-card'
                  }`}
                >
                  {/* Organization Header */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Logo & Basic Info */}
                    <div className="lg:col-span-1">
                      <div className="text-center lg:text-left">
                        <img
                          src={organization.logoUrl}
                          alt={`${organization.name} logo`}
                          className="w-24 h-24 rounded-xl mx-auto lg:mx-0 mb-4 object-cover"
                        />
                        <h2 className={`text-3xl font-bold mb-2 ${
                          isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                        }`}>
                          {organization.name}
                        </h2>
                        <p className={`text-lg mb-4 ${
                          isDeveloper ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {organization.description}
                        </p>
                        <a
                          href={organization.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            isDeveloper
                              ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Mission & Details */}
                    <div className="lg:col-span-2">
                      <div className={`p-6 rounded-xl mb-6 ${
                        isDeveloper ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <h3 className={`text-lg font-semibold mb-3 ${
                          isDeveloper ? 'text-green-400' : 'text-gray-900'
                        }`}>
                          Mission
                        </h3>
                        <p className={`${
                          isDeveloper ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {organization.mission}
                        </p>
                      </div>

                      {/* Organization Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className={`p-4 rounded-lg text-center ${
                          isDeveloper ? 'bg-gray-800/30' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-center mb-2">
                            <Calendar className={`h-5 w-5 ${
                              isDeveloper ? 'text-green-400' : 'text-blue-600'
                            }`} />
                          </div>
                          <div className={`text-sm font-medium ${
                            isDeveloper ? 'text-green-400' : 'text-blue-600'
                          }`}>
                            Founded
                          </div>
                          <div className={`text-xs ${
                            isDeveloper ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {new Date(organization.founded).getFullYear()}
                          </div>
                        </div>

                        <div className={`p-4 rounded-lg text-center ${
                          isDeveloper ? 'bg-gray-800/30' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-center mb-2">
                            <MapPin className={`h-5 w-5 ${
                              isDeveloper ? 'text-green-400' : 'text-blue-600'
                            }`} />
                          </div>
                          <div className={`text-sm font-medium ${
                            isDeveloper ? 'text-green-400' : 'text-blue-600'
                          }`}>
                            Location
                          </div>
                          <div className={`text-xs ${
                            isDeveloper ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {organization.location}
                          </div>
                        </div>

                        <div className={`p-4 rounded-lg text-center ${
                          isDeveloper ? 'bg-gray-800/30' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-center mb-2">
                            <Users className={`h-5 w-5 ${
                              isDeveloper ? 'text-green-400' : 'text-blue-600'
                            }`} />
                          </div>
                          <div className={`text-sm font-medium ${
                            isDeveloper ? 'text-green-400' : 'text-blue-600'
                          }`}>
                            Team Size
                          </div>
                          <div className={`text-xs ${
                            isDeveloper ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {organization.size}
                          </div>
                        </div>

                        <div className={`p-4 rounded-lg text-center ${
                          isDeveloper ? 'bg-gray-800/30' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-center mb-2">
                            <Building className={`h-5 w-5 ${
                              isDeveloper ? 'text-green-400' : 'text-blue-600'
                            }`} />
                          </div>
                          <div className={`text-sm font-medium ${
                            isDeveloper ? 'text-green-400' : 'text-blue-600'
                          }`}>
                            Valuation
                          </div>
                          <div className={`text-xs ${
                            isDeveloper ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {organization.valuation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="mb-8">
                    <h3 className={`text-2xl font-bold mb-6 ${
                      isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                    }`}>
                      Team Members
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {organization.members.map((member, memberIndex) => (
                        <motion.div
                          key={member.id}
                          className={`p-6 rounded-xl ${
                            isDeveloper 
                              ? 'bg-gray-800/30 border border-gray-700 hover:border-green-400/30' 
                              : 'bg-white border border-gray-200 hover:border-blue-200 shadow-md hover:shadow-lg'
                          } transition-all duration-300`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: memberIndex * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-center mb-4">
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                            />
                            <h4 className={`text-lg font-semibold ${
                              isDeveloper ? 'text-green-400' : 'text-gray-900'
                            }`}>
                              {member.name}
                            </h4>
                            <p className={`text-sm font-medium ${
                              isDeveloper ? 'text-blue-400' : 'text-blue-600'
                            }`}>
                              {member.role}
                            </p>
                          </div>

                          <p className={`text-sm mb-4 ${
                            isDeveloper ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {member.bio}
                          </p>

                          {/* Social Links */}
                          <div className="flex justify-center space-x-3 mb-4">
                            {member.socials.map((social) => (
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
                                <span className="text-lg">
                                  {socialIcons[social.platform as keyof typeof socialIcons] || '🔗'}
                                </span>
                              </a>
                            ))}
                          </div>

                          {/* Contact Button */}
                          <a
                            href={`mailto:${member.email}`}
                            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isDeveloper
                                ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            <Mail className="h-4 w-4" />
                            <span>Contact</span>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-8">
                    <h3 className={`text-xl font-bold mb-4 ${
                      isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                    }`}>
                      Key Achievements
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teamsData.achievements
                        .filter(achievement => achievement.organization === organization.id)
                        .map((achievement, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${
                              isDeveloper ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                isDeveloper ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-50 text-yellow-600'
                              }`}>
                                <Award className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <h4 className={`font-semibold mb-1 ${
                                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                                }`}>
                                  {achievement.title}
                                </h4>
                                <p className={`text-sm mb-2 ${
                                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {achievement.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className={`text-xs ${
                                    isDeveloper ? 'text-gray-400' : 'text-gray-500'
                                  }`}>
                                    {new Date(achievement.date).toLocaleDateString()}
                                  </span>
                                  <span className={`text-xs font-medium ${
                                    isDeveloper ? 'text-blue-400' : 'text-blue-600'
                                  }`}>
                                    {achievement.impact}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Partnerships */}
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${
                      isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                    }`}>
                      Strategic Partnerships
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teamsData.partnerships
                        .filter(partnership => partnership.organization === organization.id)
                        .map((partnership, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${
                              isDeveloper ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                isDeveloper ? 'bg-purple-400/20 text-purple-400' : 'bg-purple-50 text-purple-600'
                              }`}>
                                <Handshake className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <h4 className={`font-semibold mb-1 ${
                                  isDeveloper ? 'text-green-400' : 'text-gray-900'
                                }`}>
                                  {partnership.partner}
                                </h4>
                                <p className={`text-sm mb-2 ${
                                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {partnership.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className={`text-xs font-medium ${
                                    isDeveloper ? 'text-blue-400' : 'text-blue-600'
                                  }`}>
                                    {partnership.type}
                                  </span>
                                  <span className={`text-xs ${
                                    isDeveloper ? 'text-gray-400' : 'text-gray-500'
                                  }`}>
                                    Since {new Date(partnership.startDate).getFullYear()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}