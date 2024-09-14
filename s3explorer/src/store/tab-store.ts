import { produce } from 'immer'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import storage from './store-storage'

export interface Tab {
    id: string
    name: string
    type?: 'folder' | 'file' | 'settings'
    bucket_id?: string
}

interface TabsStore {
    tabs: Tab[]
    activeTabId: string | null
    addTab: (tab: Tab, set_active: boolean) => void
    removeTab: (i: number) => void
    setActiveTab: (tab_id: string) => void
}

const useTabs = create(
    persist<TabsStore>(
        (set) => ({
            tabs: [],
            activeTabId: null,
            addTab: (tab, set_active) =>
                set((state) => {
                    // if the tab already exists make it active
                    const existing_tab = state.tabs.find((t) => t.id === tab.id)
                    console.log(tab)

                    if (existing_tab) {
                        return { activeTabId: tab.id }
                    }
                    // if the tab does not exits add it
                    const new_state: Partial<TabsStore> = {
                        tabs: [...state.tabs, tab],
                    }

                    // if set_active is true make the tab active
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
        }),
        {
            name: 'tabs-store',
            storage: createJSONStorage(() => storage),
        }
    )
)

export default useTabs
