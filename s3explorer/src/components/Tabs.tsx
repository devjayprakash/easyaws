import { File, XIcon } from 'lucide-react';
import React from 'react';
import useTabs from '../store/tab-store';

const Tabs: React.FC = () => {
  const { tabs, activeTab, removeTab, setActiveTab } = useTabs();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-shrink-0 border-b border-gray-600 w-full items-center overflow-x-auto">
        {tabs.map((tab) => (
          <div
            onClick={() => setActiveTab(tab)}
            key={tab.name}
            className={`px-3 py-1 flex-shrink-0 flex gap-2 items-center cursor-pointer text-sm border-t-[2px] border-r border-gray-600 ${
              tab.id === activeTab?.id
                ? 'text-white border-t-sky-500'
                : 'bg-slate-950 text-gray-400'
            }`}
          >
            <File size={12} /> <span className="text-sm">{tab.name}</span>
            <XIcon
              onClick={() => {
                removeTab(tab);
              }}
              className="cursor-pointer hover:text-white hover:bg-red-300 rounded-full duration-150"
              size={16}
            />
          </div>
        ))}
      </div>
      <div className="flex-grow overflow-auto">{activeTab?.content}</div>
    </div>
  );
};

export default Tabs;
