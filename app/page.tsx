import { supabase } from './lib/supabase';

async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Supabase error:', error);
    return [];
  }
  return data || [];
}

export default async function Home() {
  const courses = await getCourses();
  return <ClientDashboard courses={courses} />;
}

// Client component is defined in the same file
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HomeIcon, BookOpen, Activity, Settings, Flame, TrendingUp, Clock, Target } from 'lucide-react';

function ClientDashboard({ courses }: { courses: any[] }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const totalProgress = courses.length > 0 
    ? Math.round(courses.reduce((acc: number, c: any) => acc + c.progress, 0) / courses.length)
    : 0;
  const completedCourses = courses.filter((c: any) => c.progress === 100).length;
  const totalMinutes = courses.reduce((acc: number, c: any) => acc + (c.progress * 5), 0);

  if (activeTab === 'courses') {
    return (
      <div className="min-h-screen p-6 md:p-8 bg-black">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Courses</h1>
        <p className="text-gray-500 mb-8">{courses.length} active courses</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any, index: number) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'activity') {
    return (
      <div className="min-h-screen p-6 md:p-8 bg-black">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Activity Overview</h1>
        <p className="text-gray-500 mb-8">Track your learning progress</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityChart />
          <Achievements />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 bg-black">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          Learning Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Track your progress and continue learning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Hero Tile */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-purple-400 text-sm font-medium mb-2">Welcome back,</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Student Name</h2>
              <p className="text-gray-400">Ready to continue your learning journey?</p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full border border-orange-500/30">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-white">7 day streak</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
            <div><p className="text-gray-500 text-sm">Active Courses</p><p className="text-2xl font-bold text-white">{courses.length}</p></div>
            <div><p className="text-gray-500 text-sm">Avg Progress</p><p className="text-2xl font-bold text-white">{totalProgress}%</p></div>
            <div><p className="text-gray-500 text-sm">Completed</p><p className="text-2xl font-bold text-white">{completedCourses}</p></div>
          </div>
        </div>

        {/* Stats Tile */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
          <Clock className="w-5 h-5 text-blue-400 mb-4" />
          <p className="text-3xl font-bold text-white">{totalMinutes}<span className="text-lg text-gray-500"> mins</span></p>
          <p className="text-sm text-gray-500 mt-2">Across all courses</p>
        </div>

        {/* Streak Tile */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
          <Target className="w-5 h-5 text-orange-400 mb-4" />
          <p className="text-3xl font-bold text-white">45<span className="text-lg text-gray-500">/60 min</span></p>
          <p className="text-sm text-green-400 mt-2">75% completed</p>
        </div>

        {/* Course Grid Title */}
        <div className="lg:col-span-4 mt-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-500 rounded-full" />
            Your Active Courses
          </h3>
        </div>

        {/* Course Cards */}
        {courses.map((course: any, index: number) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </div>
  );
}

// CourseCard Component
function CourseCard({ course, index }: { course: any; index: number }) {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{course.title}</h3>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">Progress</span>
        <span className="text-white font-medium">{course.progress}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${course.progress}%` } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className={`h-full bg-gradient-to-r ${getProgressGradient()} rounded-full`}
        />
      </div>
    </motion.div>
  );
}

// ActivityChart Component
function ActivityChart() {
  const weeklyData = [65, 45, 80, 70, 90, 55, 75];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxMinutes = Math.max(...weeklyData);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
      <h3 className="font-semibold text-white mb-6">Weekly Activity</h3>
      <div className="flex items-end justify-between gap-2 h-56">
        {weeklyData.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(height / maxMinutes) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg"
              style={{ height: `${(height / maxMinutes) * 100}%` }}
            />
            <span className="text-xs text-gray-500">{days[i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex justify-between">
          <div><p className="text-gray-500 text-sm">Total</p><p className="text-xl font-bold text-white">480 mins</p></div>
          <div className="text-right"><p className="text-gray-500 text-sm">vs last week</p><p className="text-green-400">+12% ↑</p></div>
        </div>
      </div>
    </div>
  );
}

// Achievements Component
function Achievements() {
  const achievements = [
    { name: 'Quick Learner', desc: 'Completed 3 lessons in one day' },
    { name: 'Consistency', desc: '7 day learning streak' },
    { name: 'Top Performer', desc: 'Top 10% this month' },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
      <h3 className="font-semibold text-white mb-6">Achievements</h3>
      <div className="space-y-3">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
          >
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div><p className="text-sm font-medium text-white">{achievement.name}</p><p className="text-xs text-gray-500">{achievement.desc}</p></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Import React at the top (add this line after the 'use client' directive)
import React from 'react';