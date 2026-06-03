'use client';

import { useState } from 'react';
import BentoGrid from './components/BentoGrid';
import Sidebar from './components/Sidebar';

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

export default function BentoGridWrapper({ courses }: { courses: Course[] }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-950 to-black">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 lg:ml-64">
        <BentoGrid courses={courses} activeTab={activeTab} />
      </main>
    </div>
  );
}