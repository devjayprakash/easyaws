import { CompassIcon } from 'lucide-react';
import React from 'react';
import FolderContent from '../components/FolderContent';
import Sidebar from '../components/Sidebar';

function HomePage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[300px] bg-slate-100 h-full">
        <h1 className="font-bold text-2xl flex gap-3 items-center p-6">
          <CompassIcon size={42} />
          S3 Explorer
        </h1>
        <Sidebar />
      </div>
      <main className="flex-grow h-full">
        <FolderContent />
      </main>
    </div>
  );
}

export default HomePage;
