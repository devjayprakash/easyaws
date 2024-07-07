import { FileIcon, Grid, List, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LayoutTypes } from '../reducers/folderContent.reducer';

function Toolbar({
  onSearch,
  layout,
  setLayout,
}: {
  onSearch: (term: string) => void;
  layout: LayoutTypes;
  setLayout: (layout: LayoutTypes) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="w-full px-6 flex justify-between items-center">
      <div className="flex items-center gap-2 bg-slate-900 px-2 rounded-md">
        <Search size={16} className="text-slate-300" />
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(searchTerm);
            }
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-900 w-[230px] placeholder:text-slate-300 px-2 py-2 text-sm outline-none"
          placeholder="Search bucket"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="flex text-sm items-center bg-slate-900 px-3 py-1 rounded-md ring-slate-700 cursor-pointer hover:bg-slate-950 ring-2">
          <FileIcon size={24} className="p-1 " />
        </button>
        <button
          onClick={() => {
            setLayout(layout === 'grid' ? 'list' : 'grid');
          }}
          className="flex text-sm items-center bg-slate-900 px-3 py-1 rounded-md ring-slate-700 cursor-pointer hover:bg-slate-950 ring-2"
        >
          {layout === 'grid' ? (
            <List size={24} className="p-1 " />
          ) : (
            <Grid size={24} className="p-1 " />
          )}
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
