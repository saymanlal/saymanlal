'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '../../lib/theme-context';
import { 
  Calendar, MapPin, ExternalLink, Github, Award, Briefcase, 
  GraduationCap, Mic, Trophy, Rocket, Star, ChevronDown, ChevronUp,
  Users, Code, BookOpen, Zap, Globe, Feather, Layers, Clock
} from 'lucide-react';
import timelineData from '../../lib/data/timeline.json';

type EventType = 'all' | 'company' | 'award' | 'certification' | 'hackathon' | 'speaking' | 'publication' | 'program' | 'product' | 'milestone';

const typeEmojis = {
  company: '🏢',
  award: '🏆',
  hackathon: '💻',
  speaking: '🎤',
  certification: '📜',
  publication: '📚',
  program: '🎓',
  product: '🚀',
  milestone: '✨'
};

export default function TimelinePage() {
  const { settings } = useTheme();
  const [selectedType, setSelectedType] = useState<EventType>('all');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDeveloper = settings.theme === 'developer';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const eventTypes = [
    { id: 'all' as EventType, name: 'All Events', icon: Calendar },
    { id: 'company' as EventType, name: 'Companies', icon: Briefcase },
    { id: 'award' as EventType, name: 'Awards', icon: Trophy },
    { id: 'hackathon' as EventType, name: 'Hackathons', icon: Code },
    { id: 'speaking' as EventType, name: 'Speaking', icon: Mic },
    { id: 'certification' as EventType, name: 'Certifications', icon: GraduationCap },
    { id: 'publication' as EventType, name: 'Publications', icon: BookOpen },
  ];

  const years = Array.from(
    new Set(timelineData.events.map(event => new Date(event.date).getFullYear().toString()))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  const filteredEvents = timelineData.events.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesYear = !selectedYear || new Date(event.date).getFullYear().toString() === selectedYear;
    return matchesType && matchesYear;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'company': return Briefcase;
      case 'award': return Trophy;
      case 'hackathon': return Code;
      case 'speaking': return Mic;
      case 'certification': return GraduationCap;
      case 'publication': return BookOpen;
      case 'program': return GraduationCap;
      case 'product': return Rocket;
      case 'milestone': return Star;
      default: return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    if (isDeveloper) {
      switch (type) {
        case 'company': return 'from-blue-500 to-cyan-500';
        case 'award': return 'from-yellow-500 to-amber-500';
        case 'hackathon': return 'from-purple-500 to-fuchsia-500';
        case 'speaking': return 'from-indigo-500 to-blue-500';
        case 'certification': return 'from-emerald-500 to-teal-500';
        case 'publication': return 'from-pink-500 to-rose-500';
        default: return 'from-gray-500 to-gray-600';
      }
    } else {
      switch (type) {
        case 'company': return 'from-blue-500 to-cyan-500';
        case 'award': return 'from-yellow-500 to-amber-500';
        case 'hackathon': return 'from-purple-500 to-fuchsia-500';
        case 'speaking': return 'from-indigo-500 to-blue-500';
        case 'certification': return 'from-emerald-500 to-teal-500';
        case 'publication': return 'from-pink-500 to-rose-500';
        default: return 'from-gray-500 to-gray-600';
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  // Define the "ACTIVE" pattern for the streak boxes
  const activePattern = [
    // A
    [1,0,1,1,0,1,1,1],
    // C
    [1,1,1,0,0,1,1,1],
    // T
    [1,1,1,0,1,0,1,0],
    // I
    [0,1,0,0,1,0,1,0],
    // V
    [1,0,1,0,1,0,1,1],
    // E
    [1,1,1,0,1,0,1,1]
  ];

  return (
    <div className={`min-h-screen ${isDeveloper ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Floating Filters */}
      <motion.div 
        className={`sticky top-0 z-20 py-4 backdrop-blur-md transition-all ${
          isDeveloper ? 'bg-gray-900/80 border-b border-gray-700' : 'bg-white/90 border-b border-gray-200'
        } ${isScrolled ? 'shadow-lg' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.h2 
              className={`text-xl font-bold ${
                isDeveloper ? 'text-green-400' : 'text-blue-600'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Career Timeline
            </motion.h2>
            
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedType === type.id
                      ? isDeveloper
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : isDeveloper
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <type.icon className="h-4 w-4" />
                  <span>{type.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container-custom py-12">
        {/* Year Navigation */}
        <motion.div 
          className="mb-12 overflow-x-auto pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex space-x-2 min-w-max">
            <motion.button
              onClick={() => setSelectedYear(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedYear
                  ? isDeveloper
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : isDeveloper
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Years
            </motion.button>
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedYear === year
                    ? isDeveloper
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : isDeveloper
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Decorative elements */}
          <div className={`absolute left-0 right-0 top-0 h-32 bg-gradient-to-b ${
            isDeveloper ? 'from-gray-900/80 to-transparent' : 'from-white/80 to-transparent'
          } pointer-events-none`} />
          
          <div className={`absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t ${
            isDeveloper ? 'from-gray-900/80 to-transparent' : 'from-white/80 to-transparent'
          } pointer-events-none`} />

          {/* Timeline line with perfect centering */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
            <div className={`absolute inset-0 w-full h-full ${
              isDeveloper 
                ? 'bg-gradient-to-b from-green-400/20 via-green-400/50 to-green-400/20' 
                : 'bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200'
            }`} />
            <div className={`absolute inset-0 w-full h-full ${
              isDeveloper 
                ? 'bg-gradient-to-b from-green-400/10 via-green-400/20 to-green-400/10' 
                : 'bg-gradient-to-b from-blue-100 via-blue-200 to-blue-100'
            } blur-md`} />
          </div>

          {/* Glowing orb at top of timeline */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className={`w-4 h-4 rounded-full ${
              isDeveloper ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-blue-500 shadow-lg shadow-blue-500/50'
            }`} />
            <div className={`absolute inset-0 rounded-full ${
              isDeveloper ? 'bg-green-400' : 'bg-blue-500'
            } animate-ping opacity-75`} />
          </div>

          {/* Timeline Events */}
          <div className="space-y-12 relative">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => {
                const EventIcon = getEventIcon(event.type);
                const eventColor = getEventColor(event.type);
                const isExpanded = expandedEvent === event.id;
                
                return (
                  <motion.div
                    key={event.id}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Year marker */}
                    {(index === 0 || 
                      formatYear(filteredEvents[index-1].date) !== formatYear(event.date)) && (
                      <motion.div 
                        className={`absolute -top-6 left-0 right-0 text-center z-10 ${
                          isDeveloper ? 'text-gray-400' : 'text-gray-500'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                          isDeveloper ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {formatYear(event.date)}
                        </span>
                      </motion.div>
                    )}

                    <div className="flex flex-col md:flex-row items-start gap-6">
                      {/* Date card - positioned to the left of center line */}
                      <motion.div 
                        className={`w-24 flex-shrink-0 p-3 rounded-lg text-center md:mr-6 ${
                          isDeveloper ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`text-xs mb-1 ${
                          isDeveloper ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className={`text-xl font-bold ${
                          isDeveloper ? 'text-green-400' : 'text-blue-600'
                        }`}>
                          {new Date(event.date).getDate()}
                        </div>
                        <div className={`text-xs ${
                          isDeveloper ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {new Date(event.date).getFullYear()}
                        </div>
                      </motion.div>

                      {/* Timeline dot - perfectly centered */}
                      <div className={`absolute top-6 left-1/2 w-6 h-6 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 ${
                        isDeveloper ? 'bg-gray-800 border-2 border-green-400' : 'bg-white border-2 border-blue-500 shadow-md'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          isDeveloper ? 'bg-green-400' : 'bg-blue-500'
                        }`} />
                        <div className={`absolute inset-0 rounded-full ${
                          isDeveloper ? 'bg-green-400' : 'bg-blue-500'
                        } animate-ping opacity-30`} />
                      </div>

                      {/* Event card - positioned to the right of center line */}
                      <motion.div 
                        className={`flex-1 rounded-xl overflow-hidden transition-all md:ml-6 ${
                          isDeveloper 
                            ? 'bg-gray-800/50 border border-gray-700 hover:border-green-400/30' 
                            : 'bg-white border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                        }`}
                        whileHover={{ y: -5 }}
                        layout
                      >
                        <div 
                          className={`p-6 cursor-pointer`}
                          onClick={() => toggleEventExpansion(event.id)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${eventColor}`}>
                                  <EventIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h3 className={`text-lg font-bold ${
                                    isDeveloper ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {event.title}
                                  </h3>
                                  <p className={`text-xs ${
                                    isDeveloper ? 'text-gray-400' : 'text-gray-500'
                                  }`}>
                                    {event.location} • {typeEmojis[event.type as keyof typeof typeEmojis]} {event.category}
                                  </p>
                                </div>
                              </div>

                              <AnimatePresence>
                                {isExpanded ? (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <p className={`text-sm mb-4 ${
                                      isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                      {event.description}
                                    </p>
                                  </motion.div>
                                ) : (
                                  <motion.p
                                    className={`text-sm mb-4 line-clamp-2 ${
                                      isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                    }`}
                                  >
                                    {event.description}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>

                            <motion.button
                              className={`p-2 rounded-lg ${
                                isDeveloper
                                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ChevronDown 
                                size={18} 
                                className={`transition-transform ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </motion.button>
                          </div>

                          {/* Expanded content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                {/* Image */}
                                {event.imageUrl && (
                                  <div className="mb-4 relative w-full h-48">
                                    <Image
                                      src={event.imageUrl}
                                      alt={event.title}
                                      fill
                                      className="object-cover rounded-lg"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `https://source.unsplash.com/random/800x400/?${event.type}`;
                                      }}
                                    />
                                  </div>
                                )}

                                {/* Technologies */}
                                {event.technologies && event.technologies.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className={`text-sm font-semibold mb-2 ${
                                      isDeveloper ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                      Technologies Used
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {event.technologies.map((tech) => (
                                        <span
                                          key={tech}
                                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            isDeveloper
                                              ? 'bg-gray-700/50 text-gray-300 border border-gray-600'
                                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                                          }`}
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Impact */}
                                {event.impact && (
                                  <div className={`p-3 rounded-lg mb-4 ${
                                    isDeveloper ? 'bg-green-400/10 border border-green-400/20' : 'bg-green-50 border border-green-200'
                                  }`}>
                                    <h4 className={`text-sm font-semibold mb-1 ${
                                      isDeveloper ? 'text-green-400' : 'text-green-700'
                                    }`}>
                                      Impact
                                    </h4>
                                    <p className={`text-sm ${
                                      isDeveloper ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                      {event.impact}
                                    </p>
                                  </div>
                                )}

                                {/* Links */}
                                {event.links && event.links.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className={`text-sm font-semibold ${
                                      isDeveloper ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                      Links
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {event.links.map((link, linkIndex) => (
                                        <motion.a
                                          key={linkIndex}
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            isDeveloper
                                              ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                          }`}
                                          whileHover={{ y: -2 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          {link.type === 'github' ? (
                                            <Github className="h-4 w-4" />
                                          ) : (
                                            <ExternalLink className="h-4 w-4" />
                                          )}
                                          <span>{link.title}</span>
                                        </motion.a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-6xl mb-4 ${isDeveloper ? 'text-green-400' : 'text-blue-500'}`}>
                  <Clock className="inline-block" size={48} />
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
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          className={`mt-16 rounded-xl overflow-hidden ${
            isDeveloper ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-xl'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={`p-6 ${
            isDeveloper ? 'bg-gray-800/30 border-b border-gray-700' : 'bg-gray-50 border-b border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold ${
              isDeveloper ? 'text-green-400' : 'text-blue-600'
            }`}>
              Career Statistics
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6">
            {[
              { icon: <Calendar className="h-6 w-6" />, label: 'Total Events', value: timelineData.stats.totalEvents },
              { icon: <Briefcase className="h-6 w-6" />, label: 'Companies', value: timelineData.stats.companies },
              { icon: <Trophy className="h-6 w-6" />, label: 'Awards', value: timelineData.stats.awards },
              { icon: <GraduationCap className="h-6 w-6" />, label: 'Certifications', value: timelineData.stats.certifications },
              { icon: <BookOpen className="h-6 w-6" />, label: 'Publications', value: timelineData.stats.publications },
              { icon: <Mic className="h-6 w-6" />, label: 'Speaking', value: timelineData.stats.speakingEngagements },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg ${
                  isDeveloper ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                }`}
                whileHover={{ y: -5 }}
              >
                <div className={`flex items-center gap-3 mb-3 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-500'
                }`}>
                  {stat.icon}
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <div className={`text-3xl font-bold ${
                  isDeveloper ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activity Streak Boxes */}
        <motion.div 
          className={`mt-16 rounded-xl overflow-hidden ${
            isDeveloper ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-xl'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className={`p-6 ${
            isDeveloper ? 'bg-gray-800/30 border-b border-gray-700' : 'bg-gray-50 border-b border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold ${
              isDeveloper ? 'text-green-400' : 'text-blue-600'
            }`}>
              Activity Streak
            </h3>
            <p className={`text-sm mt-1 ${
              isDeveloper ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Visual representation of your active periods
            </p>
          </div>

          <div className="p-6">
            {/* Create the "ACTIVE" pattern with streak boxes */}
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-8 gap-2 mb-4">
                {activePattern.flat().map((filled, i) => (
                  <motion.div
                    key={`box-${i}`}
                    className={`w-6 h-6 rounded-sm ${
                      filled ? 
                        (isDeveloper ? 'bg-green-400/70' : 'bg-blue-500') : 
                        (isDeveloper ? 'bg-gray-700/30' : 'bg-gray-100')
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3,
                      delay: i * 0.02,
                      type: 'spring',
                      stiffness: 500,
                      damping: 30
                    }}
                    whileHover={{ 
                      scale: 1.5,
                      zIndex: 10,
                      boxShadow: isDeveloper 
                        ? '0 0 10px rgba(74, 222, 128, 0.5)' 
                        : '0 0 10px rgba(59, 130, 246, 0.5)'
                    }}
                  >
                    <div className="relative w-full h-full">
                      <div className={`absolute inset-0 rounded-sm ${
                        isDeveloper 
                          ? 'backdrop-blur-[1px]' 
                          : 'backdrop-blur-[0.5px]'
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${
                    isDeveloper ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Less active
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((level) => (
                      <div 
                        key={`legend-${level}`}
                        className={`w-4 h-4 rounded-sm ${
                          level === 0 ? 
                            (isDeveloper ? 'bg-gray-700/30' : 'bg-gray-100') :
                            level === 1 ?
                              (isDeveloper ? 'bg-green-400/30' : 'bg-blue-200') :
                              level === 2 ?
                                (isDeveloper ? 'bg-green-400/50' : 'bg-blue-400') :
                                (isDeveloper ? 'bg-green-400/70' : 'bg-blue-500')
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs ${
                    isDeveloper ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    More active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}