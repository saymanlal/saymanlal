'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../lib/theme-context';
import { Calendar, ExternalLink, Award, Filter, Search, CheckCircle } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';
import Image from 'next/image';

interface Certificate {
  id: string;
  title: string;
  organization: string;
  credential_id?: string;
  credential_url?: string;
  image_url: string;
  issue_date: string;
  expiry_date?: string;
  verified: boolean;
  skills: string[];
  created_at: string;
}

export default function CertificatesPage() {
  const { settings } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const isDeveloper = settings.theme === 'developer';

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCertificates(data || []);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, [supabase]);

  // Get unique organizations and years for filtering
  const organizations = Array.from(
    new Set(certificates.map(cert => cert.organization))
  );
  
  const years = Array.from(
    new Set(certificates.map(cert => 
      new Date(cert.issue_date).getFullYear().toString()
    ))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesOrg = !selectedOrg || cert.organization === selectedOrg;
    const matchesYear = !selectedYear || new Date(cert.issue_date).getFullYear().toString() === selectedYear;
    return matchesSearch && matchesOrg && matchesYear;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
          </div>
        </div>
      </div>
    );
  }

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
              isDeveloper ? 'text-green-400 neon-text' : 'text-gray-900'
            }`}>
              Certificates &amp; Credentials
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDeveloper ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Professional certifications and achievements in technology and development
            </p>
          </div>

          {/* Search and Filters */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isDeveloper ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
                  isDeveloper
                    ? 'bg-gray-800/50 border-gray-600 text-green-400 placeholder-gray-400 focus:border-green-400 focus:ring-1 focus:ring-green-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Organization Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedOrg(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    !selectedOrg
                      ? isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                        : 'bg-blue-600 text-white'
                      : isDeveloper
                        ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  All Organizations
                </button>
                {organizations.map((org) => (
                  <button
                    key={org}
                    onClick={() => setSelectedOrg(org)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedOrg === org
                        ? isDeveloper
                          ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                          : 'bg-blue-600 text-white'
                        : isDeveloper
                          ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                          : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50'
                    }`}
                  >
                    {org}
                  </button>
                ))}
              </div>

              {/* Year Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedYear(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    !selectedYear
                      ? isDeveloper
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                        : 'bg-blue-600 text-white'
                      : isDeveloper
                        ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  All Years
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedYear === year
                        ? isDeveloper
                          ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                          : 'bg-blue-600 text-white'
                        : isDeveloper
                          ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-green-400/10'
                          : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className={`rounded-xl overflow-hidden transition-all duration-300 card-hover ${
                  isDeveloper 
                    ? 'glass-dark border-green-500/30' 
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Certificate Image */}
                {certificate.image_url && (
                  <div className="relative overflow-hidden w-full h-48">
                    <Image
                      src={certificate.image_url}
                      alt={certificate.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      {certificate.verified && (
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                          isDeveloper
                            ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          <CheckCircle className="h-3 w-3" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${
                        isDeveloper ? 'text-green-400' : 'text-gray-900'
                      }`}>
                        {certificate.title}
                      </h3>
                      <p className={`text-sm font-medium mb-1 ${
                        isDeveloper ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {certificate.organization}
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg ${
                      isDeveloper ? 'bg-green-400/20 text-green-400' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <Award className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className={`flex items-center space-x-4 text-sm mb-4 ${
                    isDeveloper ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Issued: {formatDate(certificate.issue_date)}</span>
                    </div>
                  </div>

                  {certificate.expiry_date && (
                    <div className={`text-sm mb-4 ${
                      isExpired(certificate.expiry_date)
                        ? 'text-red-500'
                        : isDeveloper ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Expires: {formatDate(certificate.expiry_date)}
                      {isExpired(certificate.expiry_date) && ' (Expired)'}
                    </div>
                  )}

                  {/* Credential ID */}
                  {certificate.credential_id && (
                    <div className={`text-xs mb-4 ${
                      isDeveloper ? 'text-gray-400 font-mono' : 'text-gray-500'
                    }`}>
                      ID: {certificate.credential_id}
                    </div>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {certificate.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          isDeveloper
                            ? 'bg-gray-800/50 text-gray-300 border border-gray-700'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 3 && (
                      <span className={`px-2 py-1 rounded-md text-xs ${
                        isDeveloper ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        +{certificate.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {certificate.credential_url && (
                        <a
                          href={certificate.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isDeveloper
                              ? 'bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Verify</span>
                        </a>
                      )}
                    </div>
                    <span className={`text-xs ${
                      isDeveloper ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {new Date(certificate.created_at).getFullYear()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCertificates.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className={`text-6xl mb-4 ${isDeveloper ? 'text-green-400' : 'text-gray-400'}`}>
                🏆
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDeveloper ? 'text-green-400' : 'text-gray-900'
              }`}>
                No certificates found
              </h3>
              <p className={`${isDeveloper ? 'text-gray-300' : 'text-gray-600'}`}>
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}

          {/* Stats Summary */}
          <motion.div
            className={`mt-16 p-8 rounded-xl ${
              isDeveloper 
                ? 'glass-dark border-green-500/30' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className={`text-3xl font-bold mb-2 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {certificates.length}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Total Certificates
                </div>
              </div>
              <div>
                <div className={`text-3xl font-bold mb-2 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {certificates.filter(c => c.verified).length}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Verified
                </div>
              </div>
              <div>
                <div className={`text-3xl font-bold mb-2 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {organizations.length}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Organizations
                </div>
              </div>
              <div>
                <div className={`text-3xl font-bold mb-2 ${
                  isDeveloper ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {certificates.filter(c => !c.expiry_date || new Date(c.expiry_date) > new Date()).length}
                </div>
                <div className={`text-sm ${
                  isDeveloper ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Active
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}