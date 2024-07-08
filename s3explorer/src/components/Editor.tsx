import { Editor } from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import useSettingsStore from '../store/settings';
import { extensionData } from '../utils';

const TextEditor: React.FC<{ obj_key: string; bucket: string }> = ({
  obj_key,
  bucket,
}) => {
  const [value, setValue] = useState('');
  const { editorTheme } = useSettingsStore();
  const [theme, setTheme] = useState('vs-dark');

  useEffect(() => {
    if (editorTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme === 'dark' ? 'vs-dark' : 'vs-light');
      return;
    } else if (editorTheme === 'dark') {
      setTheme('vs-dark');
    } else {
      setTheme('vs-light');
    }
  }, [editorTheme]);

  useEffect(() => {
    const fetchContent = async () => {
      const content = await window.s3_api.getObjectContent(
        'text/plain',
        obj_key,
        bucket
      );
      setValue(content.value);
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const handleSave = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        window.s3_api.saveObjectContent(obj_key, value, bucket);
      }
    };
    window.addEventListener('keydown', handleSave);
    return () => {
      window.removeEventListener('keydown', handleSave);
    };
  }, [value]);

  return (
    <div className="h-screen">
      <Editor
        defaultLanguage={
          extensionData.find((d) => d.extension === obj_key.split('.').pop())
            ?.name || 'plaintext'
        }
        value={value}
        onChange={(value) => setValue(value)}
        theme={theme}
      />
    </div>
  );
};

export default TextEditor;
