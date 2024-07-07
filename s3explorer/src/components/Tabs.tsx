import { File, XIcon } from 'lucide-react';
import React from 'react';
import useTabs from '../store/tab-store';

const Tabs: React.FC = () => {
  const { tabs, removeTab, setActiveTab, activeTabId } = useTabs();

  return (
    <div className="h-screen flex flex-col pt-8">
      <div className="flex flex-shrink-0 border-b h-8 dark:border-gray-600 w-full items-center overflow-x-hidden">
        {tabs.map((tab, i) => (
          <div
            onClick={() => setActiveTab(tab.id)}
            key={tab.name}
            className={`px-3 py-1 flex-shrink-0 flex gap-2 items-center cursor-pointer text-sm border-t-[2px] border-r dark:border-gray-600 ${
              tab.id === activeTabId
                ? 'dark:text-white border-t-sky-400'
                : 'dark:bg-gray-950 dark:text-gray-400'
            }`}
          >
            <File size={16} /> <span className="text-sm">{tab.name}</span>
            <XIcon
              onClick={() => {
                removeTab(i);
              }}
              className="cursor-pointer hover:text-white hover:bg-red-300 rounded-full duration-150"
              size={16}
            />
          </div>
        ))}
      </div>
      {activeTabId && tabs.find((tab) => tab.id === activeTabId)?.content}
    </div>
  );
};

export default Tabs;
