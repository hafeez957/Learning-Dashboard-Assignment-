'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import * as Icons from 'lucide-react';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    progress: number;
    icon_name: string;
  };
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const IconComponent = (Icons as any)[course.icon_name] || Icons.BookOpen;

  const getProgressGradient = () => {
    if (course.progress >= 75) return 'from-emerald-500 to-teal-500';
    if (course.progress >= 40) return 'from-blue-500 to-cyan-500';
    return 'from-purple-500 to-pink-500';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className="relative group"
    >
      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600/0 via-purple-600/40 to-purple-600/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
            <IconComponent className="w-6 h-6 text-purple-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {course.title}
          </h3>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-white font-medium">{course.progress}%</span>
            </div>
            
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${course.progress}%` } : {}}
                transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${getProgressGradient()} rounded-full relative`}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}