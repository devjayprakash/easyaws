import { create } from 'zustand';

interface Tab {
  id: string;
  name: string;
  content: React.ReactNode;
}

interface TabsStore {
  tabs: Tab[];
  activeTab: Tab | null;
  addTab: (tab: Tab) => void;
  removeTab: (tab: Tab, i: number) => void;
  setActiveTab: (tab: Tab) => void;
}

const useTabs = create<TabsStore>((set) => ({
  tabs: [],
  activeTab: null,
  addTab: (tab) => set((state) => ({ tabs: [...state.tabs, tab] })),
  removeTab: (tab, i) => {
    set((state) => ({
      tabs: state.tabs.filter((t) => t.id !== tab.id),
      activeTab:
        state.activeTab?.id === tab.id
          ? i === 0
            ? null
            : state.tabs[i - 1]
          : state.activeTab,
    }));
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useTabs;
