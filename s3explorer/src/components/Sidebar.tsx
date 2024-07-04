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
    <div>
      <h2 className="mt-4 text-xl font-semibold">Buckets</h2>
      <div className="p-3">
        <ul className="select-none">
          {buckets.map((bucket) => (
            <li
              onClick={() => setActiveBucket(bucket)}
              key={bucket}
              className="p-2 flex gap-3 hover:bg-slate-200 cursor-pointer rounded-md text-black"
            >
              <Folder /> <span className="truncate">{bucket}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
