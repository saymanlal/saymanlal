'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  isDeveloper: boolean;
}

export default function StatCard({ icon: Icon, value, label, isDeveloper }: StatCardProps) {
  return (
    <div className={`p-4 rounded-xl border ${
      isDeveloper 
        ? 'glass-dark border-green-500/30' 
        : 'bg-white border-gray-200 shadow-lg'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${
            isDeveloper ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {label}
          </p>
          <p className={`text-2xl font-bold ${
            isDeveloper ? 'text-green-400' : 'text-gray-900'
          }`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${
          isDeveloper 
            ? 'bg-green-400/10 text-green-400'
            : 'bg-blue-50 text-blue-600'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}