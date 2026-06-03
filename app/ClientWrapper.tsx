'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Activity, Settings, Flame, Clock, Target, TrendingUp } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

export default function ClientWrapper({ courses }: { courses: Course[] }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const totalProgress = courses.length > 0 
    ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)
    : 0;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const totalMinutes = courses.reduce((acc, c) => acc + (c.progress * 5), 0);

  // Sidebar Component
  const Sidebar = () => (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-purple-600 rounded-xl shadow-lg"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed left-0 top-0 h-full 
          ${isCollapsed ? 'w-20' : 'w-64'}
          bg-gray-900 border-r border-purple-500/20 shadow-2xl
          transition-all duration-300 z-40
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className={`p-5 border-b border-purple-500/20 ${isCollapsed ? 'px-3' : ''}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              {!isCollapsed && <span className="font-bold text-lg text-white">LearnHub</span>}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              { icon: Home, label: 'Dashboard', id: 'dashboard' },
              { icon: BookOpen, label: 'Courses', id: 'courses' },
              { icon: Activity, label: 'Activity', id: 'activity' },
              { icon: Settings, label: 'Settings', id: 'settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center px-2' : ''}
                `}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-purple-500/20">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
            >
              {isCollapsed ? '→' : '← Collapse'}
            </button>
          </div>
        </div>
      </motion.aside>

      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  );

  // Course Card Component
  const CourseCard = ({ course, index }: { course: Course; index: number }) => {
    const [isInView, setIsInView] = useState(false);
    
  useEffect(() => {
  const timer = setTimeout(() => setIsInView(true), index * 100);
  return () => clearTimeout(timer);
}, [index]);

    const getGradient = () => {
      if (course.progress >= 75) return 'from-emerald-500 to-teal-500';
      if (course.progress >= 40) return 'from-blue-500 to-cyan-500';
      return 'from-purple-500 to-pink-500';
    };

    return (
      <motion.div
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
            className={`h-full bg-gradient-to-r ${getGradient()} rounded-full`}
          />
        </div>
      </motion.div>
    );
  };

  // Different views based on active tab
  if (activeTab === 'courses') {
    return (
      <div className="min-h-screen bg-black">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Courses</h1>
          <p className="text-gray-500 mb-8">{courses.length} active courses</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (activeTab === 'activity') {
    const weeklyData = [65, 45, 80, 70, 90, 55, 75];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxMinutes = Math.max(...weeklyData);

    return (
      <div className="min-h-screen bg-black">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Activity Overview</h1>
          <p className="text-gray-500 mb-8">Track your learning progress</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <div><p className="text-gray-500 text-sm">vs last week</p><p className="text-green-400">+12% ↑</p></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-6">Achievements</h3>
              {[{ name: 'Quick Learner', desc: '3 lessons in one day' }, { name: 'Consistency', desc: '7 day streak' }, { name: 'Top Performer', desc: 'Top 10% this month' }].map((a, i) => (
                <motion.div key={a.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div><p className="text-sm font-medium text-white">{a.name}</p><p className="text-xs text-gray-500">{a.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (activeTab === 'settings') {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Settings
        </h1>

        <p className="text-gray-500 mb-8">
          Manage your preferences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-3">
              Profile
            </h3>
            <p className="text-gray-400">
              User profile settings and account information.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-3">
              Notifications
            </h3>
            <p className="text-gray-400">
              Configure reminders and learning alerts.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-3">
              Appearance
            </h3>
            <p className="text-gray-400">
              Dark mode enabled.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-3">
              Learning Goals
            </h3>
            <p className="text-gray-400">
              Customize your daily learning targets.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

  // Dashboard View (default)
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 md:p-8">
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Hafeez</h2>
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

          {/* Course Title */}
          <div className="lg:col-span-4 mt-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full" />
              Your Active Courses
            </h3>
          </div>

          {/* Course Cards */}
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}

// Import Menu icon
import { Menu } from 'lucide-react';