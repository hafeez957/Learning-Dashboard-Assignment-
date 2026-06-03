'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Calendar, ChevronUp, Award } from 'lucide-react';
import { useState } from 'react';

const weeklyData = [
  { day: 'Mon', minutes: 65, fullDate: 'Monday, May 26', completed: 3 },
  { day: 'Tue', minutes: 45, fullDate: 'Tuesday, May 27', completed: 2 },
  { day: 'Wed', minutes: 80, fullDate: 'Wednesday, May 28', completed: 4 },
  { day: 'Thu', minutes: 70, fullDate: 'Thursday, May 29', completed: 3 },
  { day: 'Fri', minutes: 90, fullDate: 'Friday, May 30', completed: 5 },
  { day: 'Sat', minutes: 55, fullDate: 'Saturday, May 31', completed: 2 },
  { day: 'Sun', minutes: 75, fullDate: 'Sunday, June 1', completed: 4 },
];

export default function ActivityChart() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes));
  
  return (
    <div className="p-6">
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">Weekly Activity</h3>
            <p className="text-xs text-gray-500">Last 7 days performance</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-white">480 <span className="text-sm text-gray-500">mins</span></p>
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <ChevronUp className="w-3 h-3" />
              <span>+12% vs last week</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <Award className="w-5 h-5 text-green-400" />
          </div>
        </div>
      </div>
      
      {/* Chart bars */}
      <div className="flex items-end justify-between gap-3 h-56 mt-6">
        {weeklyData.map((data, i) => {
          const heightPercent = (data.minutes / maxMinutes) * 100;
          
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              {/* Tooltip */}
              {hoveredBar === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -mt-24 z-10 bg-gray-800 rounded-lg px-3 py-2 shadow-xl border border-gray-700"
                  style={{ transform: 'translateX(-50%)', marginLeft: '50%' }}
                >
                  <p className="text-sm font-semibold text-white">{data.minutes} minutes</p>
                  <p className="text-xs text-gray-400">{data.fullDate}</p>
                  <p className="text-xs text-purple-400 mt-1">{data.completed} lessons completed</p>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 border-r border-b border-gray-700" />
                </motion.div>
              )}
              
              {/* Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, type: 'spring', stiffness: 200 }}
                className="relative w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-xl cursor-pointer transition-all duration-200 hover:opacity-80"
                style={{ height: `${heightPercent}%`, minHeight: '4px' }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-white/20 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              
              {/* Day label */}
              <span className={`text-xs font-medium transition-colors duration-200 ${
                hoveredBar === i ? 'text-purple-400' : 'text-gray-500'
              }`}>
                {data.day}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-800">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">23</p>
          <p className="text-xs text-gray-500">Lessons completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">4.2</p>
          <p className="text-xs text-gray-500">Avg daily (hours)</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">#3</p>
          <p className="text-xs text-gray-500">Global rank</p>
        </div>
      </div>
      
      {/* Motivation message based on best day */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
      >
        <p className="text-sm text-center text-gray-300">
          🎉 Your best day was <span className="text-purple-400 font-semibold">Friday</span> with 90 minutes! 
          Keep the momentum going! 🔥
        </p>
      </motion.div>
    </div>
  );
}