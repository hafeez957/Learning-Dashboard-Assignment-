'use client';

import { motion } from 'framer-motion';
import { Award, Zap, Target, Crown } from 'lucide-react';

const achievements = [
  { icon: Zap, name: 'Quick Learner', description: 'Completed 3 lessons in one day', color: 'from-yellow-400 to-orange-500' },
  { icon: Target, name: 'Consistency', description: '7 day learning streak', color: 'from-blue-400 to-cyan-500' },
  { icon: Crown, name: 'Top Performer', description: 'Top 10% this month', color: 'from-purple-400 to-pink-500' },
];

export default function Achievements() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-yellow-500/10">
          <Award className="w-5 h-5 text-yellow-400" />
        </div>
        <h3 className="font-semibold text-white">Achievements</h3>
      </div>
      
      <div className="space-y-4">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
              <achievement.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{achievement.name}</p>
              <p className="text-xs text-gray-500">{achievement.description}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}