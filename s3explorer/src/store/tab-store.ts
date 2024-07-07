import { produce } from 'immer';
import { create } from 'zustand';

interface Tab {
  id: string;
  name: string;
  content: React.ReactNode;
}

interface TabsStore {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Tab) => void;
  removeTab: (i: number) => void;
  setActiveTab: (tab_id: string) => void;
}

const useTabs = create<TabsStore>((set) => ({
  tabs: [],
  activeTabId: null,
  addTab: (tab) =>
    set((state) => {
      if (state.tabs.some((t) => t.id === tab.id)) {
        return { activeTab: tab.id };
      }
      return { tabs: [...state.tabs, tab], activeTabId: tab.id };
    }),
  removeTab: (i) => {
    set((state) =>
      produce(state, (cpy) => {
        if (i == 0 && cpy.tabs.length > 1) {
          cpy.activeTabId = cpy.tabs[0].id;
        } else {
          cpy.activeTabId = cpy.tabs[i - 1].id;
        }

        if (cpy.tabs.length === 1) {
          cpy.activeTabId = null;
          cpy.tabs = [];
          return;
        }
        cpy.tabs.splice(i, 1);
      })
    );
  },
  setActiveTab(tab_id) {
    set(() => {
      return { activeTabId: tab_id };
    });
  },
}));

export default useTabs;
