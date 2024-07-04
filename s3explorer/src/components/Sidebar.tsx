import { Folder } from 'lucide-react';
import React, { useEffect } from 'react';
import useGlobalStore from '../store/global';

function Sidebar() {
  const [buckets, setBuckets] = React.useState<Array<string>>([]);

  const { setActiveBucket } = useGlobalStore();

  useEffect(() => {
    const getBucketData = async () => {
      const result = await window.s3_api.getBuckets();
      setBuckets(result.map((r: any) => r.Name));
    };
    getBucketData();
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="mt-4 text-xl font-semibold px-6">Buckets</h2>
      <div className="flex-grow">
        <ul className="select-none overflow-auto h-[600px] px-6">
          {buckets.map((bucket) => (
            <li
              onClick={() => setActiveBucket(bucket)}
              key={bucket}
              className="p-2 flex gap-3 hover:bg-slate-200 cursor-pointer rounded-md text-black h-[40px]"
            >
              <Folder size={24} />{' '}
              <span className="truncate w-full">{bucket}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
