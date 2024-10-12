import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import storage from './store-storage'

interface SettingsState {
    editorTheme: 'dark' | 'light' | 'system'
    setEditorTheme: (theme: 'dark' | 'light' | 'system') => void
    accentColor: string
    setAccentColor: (color: string) => void
}

const useSettingsStore = create(
    persist<SettingsState>(
        (set) => ({
            editorTheme: 'system',
            setEditorTheme: (theme) => set({ editorTheme: theme }),
            accentColor: '#2563EB',
            setAccentColor: (color) => set({ accentColor: color }),
        }),
        {
            name: 'settings-store',
            storage: createJSONStorage(() => storage),
        }
    )
)

export default useSettingsStore
