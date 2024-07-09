import { File, XIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import useTabs from '../store/tab-store';

const Tabs: React.FC = () => {
  const { tabs, removeTab, setActiveTab, activeTabId } = useTabs();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' && (e.ctrlKey || e.metaKey)) {
        removeTab(tabs.findIndex((tab) => tab.id === activeTabId));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col pt-8">
      <div className="flex flex-shrink-0 border-b h-8 dark:border-gray-600 w-full items-center overflow-x-hidden">
        {tabs.map((tab, i) => (
          <div
            onMouseDown={(e) => {
              if (e.button === 1) {
                removeTab(i);
              }
            }}
            onClick={() => setActiveTab(tab.id)}
            key={tab.name}
            className={`px-3 max-w-[220px] truncate py-1 flex-shrink-0 flex gap-2 items-center cursor-pointer text-sm border-t-[2px] border-r dark:border-gray-600 ${
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
      {tabs.map((tab) => (
        <div
          hidden={tab.id !== activeTabId}
          key={tab.id}
          className="w-full h-full"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
