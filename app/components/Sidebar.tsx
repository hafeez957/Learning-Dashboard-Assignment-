'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Activity, Settings, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', id: 'dashboard' },
  { icon: BookOpen, label: 'Courses', id: 'courses' },
  { icon: Activity, label: 'Activity', id: 'activity' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-purple-600 rounded-xl shadow-lg shadow-purple-500/25"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed left-0 top-0 h-full 
          ${isCollapsed ? 'w-20' : 'w-64'}
          bg-gray-900
          border-r border-purple-500/20
          shadow-2xl
          transition-all duration-300
          z-40
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo section */}
          <div className={`p-5 border-b border-purple-500/20 ${isCollapsed ? 'px-3' : ''}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              {!isCollapsed && (
                <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LearnHub
                </span>
              )}
            </div>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center px-2' : ''}
                `}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Collapse button */}
          <div className="p-4 border-t border-purple-500/20">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm">Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}