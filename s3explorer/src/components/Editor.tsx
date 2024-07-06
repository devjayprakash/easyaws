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

  return (
    <div className="h-screen">
      <Editor defaultValue={value} />
    </div>
  );
};

export default TextEditor;
