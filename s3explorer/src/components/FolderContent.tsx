import { FolderArchiveIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import useGlobalStore, { ContentResult } from '../store/global';

function FolderContent() {
  const {
    active_bucket,
    currentTree,
    createTree,
    path,
    setCurrentTree,
    addPath,
    setPath,
  } = useGlobalStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      <div className="w-full h-screen flex justify-center items-center text-xl text-slate-400">
        Loading...
      </div>
    );

  return (
    <div className="p-6 flex h-screen flex-col">
      <div className="flex flex-wrap gap-3">
        <h1
          onClick={() => {
            setPath([]);
          }}
          className="flex gap-3 text-xl items-center cursor-pointer hover:bg-slate-200 p-2 rounded-md duration-150"
        >
          <FolderArchiveIcon size={42} />
          <span>{active_bucket}</span>
        </h1>
        {path.map((p, i) => (
          <div
            onClick={() => {
              setPath(path.slice(0, i + 1));
            }}
            className="flex gap-3 text-xl items-center cursor-pointer hover:bg-slate-200 p-2 rounded-md duration-150"
          >
            <span>&gt;</span>
            <FolderArchiveIcon size={42} />
            <span>{p}</span>
          </div>
        ))}
      </div>
      <div className="gap-3 mt-6 flex-wrap flex overflow-auto">
        {currentTree
          ?.sort((a) => (a.type === 'folder' ? -1 : 1))
          .map((content) => (
            <div
              onClick={() => {
                if (content.type === 'folder') {
                  addPath(content.name);
                }
              }}
              className="p-3 rounded-md flex w-[140px] h-[140px] flex-col items-center justify-start  cursor-pointer hover:bg-slate-200 duration-150"
            >
              <img
                src={content.type === 'file' ? '/file_icon.png' : 'folder.png'}
                alt="folder icon"
                width={90}
              />
              <span className="w-[120px] text-center truncate">
                {content.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FolderContent;
