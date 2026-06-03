'use client';

import { motion } from 'framer-motion';

export default function GlowCard({ children, className = '', delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className={`relative group ${className}`}
    >
      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600/0 via-purple-600/40 to-purple-600/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}