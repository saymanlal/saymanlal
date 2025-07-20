'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { Calendar, MapPin, ExternalLink, Github, Award, Briefcase, GraduationCap, Mic, Trophy, Rocket } from 'lucide-react';
import timelineData from '@/lib/data/timeline.json';

type EventType = 'all' | 'company' | 'award' | 'certification' | 'hackathon' | 'speaking' | 'publication' | 'program' | 'product' | 'milestone';

export default function TimelinePage() {
  const { settings } = useTheme();
  const [selectedType, setSelectedType] = useState<EventType>('all');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const isDeveloper = settings.theme === 'developer';

  const eventTypes = [
    { id: 'all' as EventType, name: 'All Events', icon: Calendar },
    { id: 'company' as EventType, name: 'Companies', icon: Briefcase },
    { id: 'award' as EventType, name: 'Awards', icon: Trophy },
    { id: 'hackathon' as EventType, name: 'Hackathons', icon: Award },
    { id: 'speaking' as EventType, name: 'Speaking', icon: Mic },
    { id: 'certification' as EventType, name: 'Certifications', icon: GraduationCap },
    { id: 'publication' as EventType, name: 'Publications', icon: Rocket },
  ];

  const years = Array.from(
    new Set(timelineData.events.map(event => new Date(event.date).getFullYear().toString()))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  const filteredEvents = timelineData.events.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesYear = !selectedYear || new Date(event.date).getFullYear().toString() === selectedYear;
    return matchesType && matchesYear;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'company': return Briefcase;
      case 'award': return Trophy;
      case 'hackathon': return Award;
      case 'speaking': return Mic;
      case 'certification': return GraduationCap;
      case 'publication': return Rocket;
      case 'program': return GraduationCap;
      case 'product': return Rocket;
      case 'milestone': return Award;
      default: return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    if (isDeveloper) {
      switch (type) {
        case 'company': return 'text-green-400 bg-green-400/20 border-green-400/30';
        case 'award': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
        case 'hackathon': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
        case 'speaking': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
        case 'certification': return 'text-cyan-400 bg-cyan-400/20 border-cyan-400/30';
        case 'publication': return 'text-pink-400 bg-pink-400/20 border-pink-400/30';
        default: return 'text-green-400 bg-green-400/20 border-green-400/30';
      }
    } else {
      switch (type) {
        case 'company': return 'text-blue-600 bg-blue-50 border-blue-200';
        case 'award': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        case 'hackathon': return 'text-purple-600 bg-purple-50 border-purple-200';
        case 'speaking': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
        case 'certification': return 'text-teal-600 bg-teal-50 border-teal-200';
        case 'publication': return 'text-pink-600 bg-pink-50 border-pink-200';
        default: return 'text-blue-600 bg-blue-50 border-blue-200';
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              Career Timeline
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Major milestones, achievements, and key moments in my journey as an AI developer and entrepreneur
            </p>
          </div>

          {/* Filters */}
          <motion.div
            className="mb-12 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Event Type Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedType === type.id
                      ? isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30 quantum-glow'
                        : 'bg-blue-600 text-white shadow-lg'
                      : isDeveloper
                        ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  <type.icon className="h-4 w-4" />
                  <span>{type.name}</span>
                </button>
              ))}
            </div>

            {/* Year Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedYear(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  !selectedYear
                    ? isDeveloper
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                      : 'bg-blue-600 text-white'
                    : isDeveloper
                      ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
                }`}
              >
                All Years
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedYear === year
                      ? isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                        : 'bg-blue-600 text-white'
                      : isDeveloper
                        ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
              isDeveloper ? 'bg-green-400/30' : 'bg-blue-200'
            }`} />

            {/* Timeline Events */}
            <div className="space-y-8">
              {filteredEvents.map((event, index) => {
                const EventIcon = getEventIcon(event.type);
                const eventColors = getEventColor(event.type);
                
                return (
                  <motion.div
                    key={event.id}
                    className="relative flex items-start space-x-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    {/* Timeline Dot */}
                    <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${eventColors}`}>
                      <EventIcon className="h-6 w-6" />
                    </div>

                    {/* Event Content */}
                    <div className={`flex-1 p-6 rounded-xl ${
                      isDeveloper ? 'quantum-card' : 'elevated-card'
                    }`}>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-2 ${
                            isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
                          }`}>
                            {event.title}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-4 mb-3">
                            <div className="flex items-center space-x-2">
                              <Calendar className={`h-4 w-4 ${
                                isDeveloper ? 'text-gray-400' : 'text-gray-500'
                              }`} />
                              <span className={`text-sm ${
                                isDeveloper ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {formatDate(event.date)}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className={`h-4 w-4 ${
                                isDeveloper ? 'text-gray-400' : 'text-gray-500'
                              }`} />
                              <span className={`text-sm ${
                                isDeveloper ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {event.location}
                              </span>
                            </div>
                            
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${eventColors}`}>
                              {event.category}
                            </span>
                          </div>
                        </div>

                        {event.imageUrl && (
                          <div className="lg:ml-6 mb-4 lg:mb-0">
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full lg:w-32 h-32 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>

                      <p className={`mb-4 ${
                        isDeveloper ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {event.description}
                      </p>

                      {/* Technologies */}
                      {event.technologies && event.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                isDeveloper
                                  ? 'bg-gray-800/50 text-gray-300 border border-gray-700'
                                  : 'bg-gray-100 text-gray-700 border border-gray-200'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Impact */}
                      {event.impact && (
                        <div className={`p-3 rounded-lg mb-4 ${
                          isDeveloper ? 'bg-green-400/10 border border-green-400/20' : 'bg-green-50 border border-green-200'
                        }`}>
                          <p className={`text-sm font-medium ${
                            isDeveloper ? 'text-green-400' : 'text-green-700'
                          }`}>
                            Impact: {event.impact}
                          </p>
                        </div>
                      )}

                      {/* Links */}
                      {event.links && event.links.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {event.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isDeveloper
                                  ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {link.type === 'github' ? (
                                <Github className="h-4 w-4" />
                              ) : (
                                <ExternalLink className="h-4 w-4" />
                              )}
                              <span>{link.title}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className={`text-6xl mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-400'}`}>
                📅
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDeveloper ? 'text-green-400' : 'text-gray-900'
              }`}>
                No events found
              </h3>
              <p className={`${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                Try adjusting your filters to see more events.
              </p>
            </motion.div>
          )}

          {/* Statistics */}
          <motion.div
            className={`mt-16 p-8 rounded-xl ${
              isDeveloper ? 'quantum-card' : 'elevated-card'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className={`text-xl font-bold text-center mb-6 ${
              isDeveloper ? 'text-green-400 font-quantum' : 'text-gray-900'
            }`}>
              Career Statistics
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
              <div>
                <div className={`text-2xl font-bold mb-1 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {timelineData.stats.totalEvents}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Total Events
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold mb-1 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {timelineData.stats.companies}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Companies
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold mb-1 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {timelineData.stats.awards}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Awards
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold mb-1 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {timelineData.stats.certifications}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Certifications
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold mb-1 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {timelineData.stats.publications}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Publications
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold mb-1 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {timelineData.stats.speakingEngagements}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Speaking
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}