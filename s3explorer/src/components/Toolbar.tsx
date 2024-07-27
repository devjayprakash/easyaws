import { Grid, List, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LayoutTypes } from '../reducers/folderContent.reducer'
import { Button } from './ui/button'

import CreateFileDialog from './CreateFileDialog'

function Toolbar({
    onSearch,
    layout,
    setLayout,
    bucket,
    onFileCreate,
    path,
}: {
    path: string
    onSearch: (term: string) => void
    layout: LayoutTypes
    setLayout: (layout: LayoutTypes) => void
    bucket: string
    onFileCreate: (key: string) => void
}) {
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        onSearch(searchTerm)
    }, [searchTerm])

    return (
        <div className="w-full px-6 flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 dark:bg-slate-900 bg-slate-200 px-2 rounded-md">
                <Search size={16} className="text-slate-300" />
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSearch(searchTerm)
                        }
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="dark:bg-slate-900 bg-slate-200 w-[230px] placeholder:text-slate-300 px-2 py-2 text-sm outline-none"
                    placeholder="Search bucket"
                />
            </div>
            <div className="flex items-center gap-2">
                <CreateFileDialog
                    bucket={bucket}
                    path={path}
                    onFileCreate={onFileCreate}
                />
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        setLayout(layout === 'grid' ? 'list' : 'grid')
                    }}
                    className="flex dark:text-white  text-sm items-center bg-slate-200 dark:bg-slate-900 px-3 py-1 text-slate-600 rounded-md cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-950 p-2"
                >
                    {layout === 'grid' ? (
                        <List size={24} className="p-1 " />
                    ) : (
                        <Grid size={24} className="p-1 " />
                    )}
                </Button>
            </div>
        </div>
    )
}

export default Toolbar
