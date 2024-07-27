import { produce } from 'immer'
import { create } from 'zustand'

interface Tab {
    id: string
    name: string
    content: React.ReactNode
    type?: 'folder' | 'file' | 'settings'
}

interface TabsStore {
    tabs: Tab[]
    activeTabId: string | null
    addTab: (tab: Tab, set_active: boolean) => void
    removeTab: (i: number) => void
    setActiveTab: (tab_id: string) => void
}

const useTabs = create<TabsStore>((set) => ({
    tabs: [],
    activeTabId: null,
    addTab: (tab, set_active) =>
        set((state) => {
            if (state.tabs.some((t) => t.id === tab.id)) {
                return { activeTabId: tab.id }
            }
            const new_state: Partial<TabsStore> = { tabs: [...state.tabs, tab] }

            if (set_active) {
                new_state.activeTabId = tab.id
            }

            return new_state
        }),
    removeTab: (i) => {
        set((state) =>
            produce(state, (cpy) => {
                if (cpy.tabs.length == 1) {
                    cpy.activeTabId = null
                    cpy.tabs = []
                    return
                }
                cpy.tabs.splice(i, 1)
                cpy.activeTabId = cpy.tabs[i - 1]?.id
            })
        )
    },
    setActiveTab(tab_id) {
        set(() => {
            return { activeTabId: tab_id }
        })
    },
}))

export default useTabs
