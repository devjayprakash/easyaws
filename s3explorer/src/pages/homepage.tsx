import React from 'react';
import FolderContent from '../components/FolderContent';
import Sidebar from '../components/Sidebar';

function HomePage() {
  return (
    <div className="w-full h-screen flex dark:bg-slate-800 dark:text-white">
      <Sidebar />
      <main className="flex-grow">
        <FolderContent />
      </main>
    </div>
  );
}

export default HomePage;
