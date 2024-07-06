import React from 'react';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';

function HomePage() {
  return (
    <div className="w-full h-screen flex dark:bg-slate-800 dark:text-white">
      <Sidebar />
      <main className="flex-grow">
        <Tabs />
      </main>
    </div>
  );
}

export default HomePage;
