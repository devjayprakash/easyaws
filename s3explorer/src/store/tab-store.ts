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
  removeTab: (tab: Tab) => void;
  setActiveTab: (tab: Tab) => void;
}

const useTabs = create<TabsStore>((set) => ({
  tabs: [],
  activeTab: null,
  addTab: (tab) => set((state) => ({ tabs: [...state.tabs, tab] })),
  removeTab: (tab) =>
    set((state) => ({
      tabs: state.tabs.filter((t) => t.id !== tab.id),
      activeTab: state.tabs.length === 1 ? null : state.activeTab,
    })),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useTabs;
