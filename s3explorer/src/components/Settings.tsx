import React from 'react';
import useSettingsStore from '../store/settings';
import { ModeToggle } from './ModeToggle';
import { useTheme } from './ThemeProvider';
import { Card } from './ui/card';

function SettingsPage() {
  const { setEditorTheme } = useSettingsStore();
  const { setTheme } = useTheme();

  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Card className="p-3 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Theme</h3>
            <p className="text-sm text-muted-foreground">
              Switch to dark or light mode
            </p>
          </div>
          <div>
            <ModeToggle
              onChange={(theme: 'dark' | 'light') => setTheme(theme)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-3 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Editor Theme</h3>
            <p className="text-sm text-muted-foreground">
              Switch your editor theme to light or dark
            </p>
          </div>
          <div>
            <ModeToggle
              onChange={(theme) => {
                setEditorTheme(theme);
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage;
