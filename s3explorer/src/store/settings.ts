import { create } from 'zustand';

interface SettingsState {
  editorTheme: 'dark' | 'light' | 'system';
  setEditorTheme: (theme: 'dark' | 'light' | 'system') => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  editorTheme: 'system',
  setEditorTheme: (theme) => set({ editorTheme: theme }),
}));

export default useSettingsStore;
