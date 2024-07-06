import { FolderArchiveIcon, HomeIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import useGlobalStore, { ContentResult } from '../store/global';
import useTabs from '../store/tab-store';
import TextEditor from './Editor';

const FolderContent: React.FC<{
  active_bucket: string;
}> = ({ active_bucket }) => {
  const { currentTree, createTree, path, setCurrentTree, addPath, setPath } =
    useGlobalStore();
  const { addTab, setActiveTab } = useTabs();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPath([]);
    const fetchBucketContents = async () => {
      if (active_bucket) {
        setLoading(true);
        const contents_result: Array<ContentResult> =
          await window.s3_api.getBucketContents(active_bucket);
        createTree(contents_result);
        setLoading(false);
      }
    };
    fetchBucketContents();
  }, [active_bucket]);

  useEffect(() => {
    setCurrentTree(path);
  }, [path, active_bucket, loading]);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center text-xl text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 items-center">
        <div
          onClick={() => {
            setPath([]);
          }}
          className="p-2 flex gap-2 text-sm items-center max-w-[200px] dark:hover:bg-gray-900 rounded-md cursor-pointer"
        >
          <HomeIcon className="flex-shrink-0" size={16} />
          <div className="truncate">{active_bucket}</div>
        </div>
        {path.map((p, i) => (
          <div
            key={`path-${i}`}
            onClick={() => {
              setPath(path.slice(0, i + 1));
            }}
            className="flex gap-2 text-sm items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 p-2 rounded-md duration-150"
          >
            <span>&gt;</span>
            <FolderArchiveIcon size={16} />
            <span className="max-w-[200px] truncate">{p}</span>
          </div>
        ))}
      </div>
      <div className="gap-3 flex-wrap flex overflow-auto p-2">
        {currentTree
          ?.sort((a) => (a.type === 'folder' ? -1 : 1))
          .map((content) => (
            <div
              key={content.name}
              onClick={() => {
                if (content.type === 'folder') {
                  addPath(content.name);
                } else {
                  const tab = {
                    name: content.name,
                    id: content.real_key,
                    content: (
                      <TextEditor
                        bucket={active_bucket}
                        obj_key={content.real_key}
                      />
                    ),
                  };
                  addTab(tab);
                  setActiveTab(tab);
                }
              }}
              className="p-3 rounded-md flex w-[90px] flex-col items-center justify-start  cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 duration-150"
            >
              <img
                src={content.type === 'file' ? '/file_icon.png' : 'folder.png'}
                alt="folder icon"
                width={90}
              />
              <span className="w-[80px] text-xs text-center line-clamp-3">
                {content.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FolderContent;
