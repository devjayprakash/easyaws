import React from 'react';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';

function HomePage() {
  return (
    <div className="w-full h-screen flex bg-transparent dark:text-white">
      <Sidebar />
      <main className="flex-grow">
        <Tabs />
      </main>
    </div>
  );
}

export default HomePage;
