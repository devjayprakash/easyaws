import { Editor } from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';

const TextEditor: React.FC<{ obj_key: string; bucket: string }> = ({
  obj_key,
  bucket,
}) => {
  const [value, setValue] = useState('');

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
      if (e.ctrlKey && e.key === 's') {
        window.s3_api.saveObjectContent(value, obj_key, bucket);
      }
    };
    window.addEventListener('keydown', handleSave);
    return () => {
      window.removeEventListener('keydown', handleSave);
    };
  }, []);

  return (
    <div className="h-screen">
      <Editor
        onChange={(value) => setValue(value)}
        defaultValue={value}
        theme="vs-dark"
      />
    </div>
  );
};

export default TextEditor;
