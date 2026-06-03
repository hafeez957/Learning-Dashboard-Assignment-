'use client';

import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import GlowCard from './GlowCard';
import ActivityChart from './ActivityChart';
import Achievements from './Achievements';
import { Flame, Target, Clock, TrendingUp } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

interface BentoGridProps {
  courses: Course[];
  activeTab: string;
}

export default function BentoGrid({ courses, activeTab }: BentoGridProps) {
  const totalProgress = courses.length > 0 
    ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)
    : 0;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const totalMinutes = courses.reduce((acc, c) => acc + (c.progress * 5), 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  };

  // Different content based on active tab
  if (activeTab === 'courses') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen p-6 md:p-8"
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            My Courses
          </h1>
          <p className="text-gray-500 mt-2">{courses.length} active courses</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div key={course.id} variants={itemVariants}>
              <CourseCard course={course} index={index} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (activeTab === 'activity') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen p-6 md:p-8"
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Activity Overview
          </h1>
          <p className="text-gray-500 mt-2">Track your learning progress</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlowCard>
            <ActivityChart />
          </GlowCard>
          <GlowCard>
            <Achievements />
          </GlowCard>
        </div>
      </motion.div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen p-6 md:p-8"
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-500 mt-2">Manage your preferences</p>
        </div>
        <div className="max-w-2xl space-y-4">
          {['Profile Settings', 'Notification Preferences', 'Learning Goals', 'Theme Settings'].map((setting, i) => (
            <motion.div
              key={setting}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-white font-medium">{setting}</h3>
              <p className="text-sm text-gray-500 mt-1">Configure your {setting.toLowerCase()}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Default Dashboard view
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-6 md:p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          Learning Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Track your progress and continue learning</p>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
        
        {/* Hero Tile */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlowCard>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <p className="text-purple-400 text-sm font-medium mb-2">Welcome back,</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Hafeez</h2>
                  <p className="text-gray-400">Ready to continue your learning journey?</p>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full border border-orange-500/30">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-white">7 day streak</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
                <div>
                  <p className="text-gray-500 text-sm">Active Courses</p>
                  <p className="text-2xl font-bold text-white">{courses.length}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Avg Progress</p>
                  <p className="text-2xl font-bold text-white">{totalProgress}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{completedCourses}</p>
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Stats Tile */}
        <motion.div variants={itemVariants}>
          <GlowCard>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">Total Time</h3>
              </div>
              <p className="text-3xl font-bold text-white">{totalMinutes}<span className="text-lg text-gray-500"> mins</span></p>
              <p className="text-sm text-gray-500 mt-2">Across all courses</p>
              <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                />
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Streak Tile */}
        <motion.div variants={itemVariants}>
          <GlowCard>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-orange-400" />
                <h3 className="font-semibold text-white">Daily Goal</h3>
              </div>
              <p className="text-3xl font-bold text-white">45<span className="text-lg text-gray-500">/60 min</span></p>
              <p className="text-sm text-green-400 mt-2">75% completed</p>
              <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                />
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Activity Chart - spans 2 columns */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlowCard>
            <ActivityChart />
          </GlowCard>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlowCard>
            <Achievements />
          </GlowCard>
        </motion.div>

        {/* Course Grid Title */}
        <motion.div variants={itemVariants} className="lg:col-span-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full" />
              Your Active Courses
            </h3>
            <div className="flex items-center gap-1 text-sm text-purple-400">
              <TrendingUp className="w-4 h-4" />
              <span>{courses.length} courses</span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Course Cards */}
        {courses.map((course, index) => (
          <motion.div key={course.id} variants={itemVariants}>
            <CourseCard course={course} index={index} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}