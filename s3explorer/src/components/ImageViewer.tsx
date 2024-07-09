import React from 'react';

function ImageViewer({ obj_key, bucket }: { obj_key: string; bucket: string }) {
  const [url, setUrl] = React.useState<string>('');

  React.useEffect(() => {
    const fetchPresignedUrl = async () => {
      const result = await window.s3_api.getPresignedUrl(obj_key, bucket);
      if (result) {
        setUrl(`data:image/${obj_key.split('.').pop()};base64,${result}`);
      }
    };
    fetchPresignedUrl();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-auto">
      {url ? (
        <img src={url} alt="image" className="w-3/5" />
      ) : (
        <div className="text-xl text-gray-500 dark:text-white">Loading ...</div>
      )}
    </div>
  );
}

export default ImageViewer;
