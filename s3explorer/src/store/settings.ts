import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import storage from './store-storage'

interface SettingsState {
    editorTheme: 'dark' | 'light' | 'system'
    setEditorTheme: (theme: 'dark' | 'light' | 'system') => void
}

const useSettingsStore = create(
    persist<SettingsState>(
        (set) => ({
            editorTheme: 'system',
            setEditorTheme: (theme) => set({ editorTheme: theme }),
        }),
        {
            name: 'settings-store',
            storage: createJSONStorage(() => storage),
        }
    )
)

export default useSettingsStore
