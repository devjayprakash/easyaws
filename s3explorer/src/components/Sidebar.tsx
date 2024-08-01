import { FolderDotIcon, SearchIcon, Settings, XCircle } from 'lucide-react'
import React, { useEffect } from 'react'
import useTabs from '../store/tab-store'
import FolderContent from './FolderContent'
import SettingsPage from './Settings'
import { Button } from './ui/button'

function Sidebar() {
    const [buckets, setBuckets] = React.useState<Array<string>>([])
    const [searchTerm, setSearchTerm] = React.useState<string>('')

    const { addTab } = useTabs()

    useEffect(() => {
        const getBucketData = async () => {
            const result = await window.s3_api.getBuckets()
            setBuckets(result.map((r) => r.Name))
        }
        getBucketData()
    }, [])

    return (
        <div className="w-[230px] pt-10 flex-shrink-0 h-screen dark:bg-gray-900 bg-gray-200 flex flex-col">
            <div className="flex gap-2 items-center mx-2 rounded-md px-2 dark:bg-gray-800 bg-gray-300">
                <SearchIcon size={20} />
                <input
                    value={searchTerm}
                    type="text"
                    placeholder="Search buckets"
                    className="p-2 outline-none w-full dark:bg-gray-800 bg-gray-300 dark:text-white text-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <XCircle
                        className="hover:text-red-500 cursor-pointer duration-150"
                        onClick={() => {
                            setSearchTerm('')
                        }}
                    />
                )}
            </div>
            <div className="flex-grow overflow-y-scroll mt-3 p-2 space-y-1">
                {buckets
                    .filter((b) => b.includes(searchTerm))
                    .map((bucket) => (
                        <div
                            key={bucket}
                            onClick={() => {
                                addTab(
                                    {
                                        name: bucket,
                                        id: bucket,
                                        content: (
                                            <FolderContent
                                                active_bucket={bucket}
                                            />
                                        ),
                                        type: 'folder',
                                    },
                                    true
                                )
                            }}
                            className="p-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 duration-150"
                        >
                            <FolderDotIcon
                                size={20}
                                className="flex-shrink-0 "
                            />
                            <div className="text-sm truncate">{bucket}</div>
                        </div>
                    ))}
            </div>
            <Button
                onClick={() => {
                    addTab(
                        {
                            name: 'Settings',
                            id: 'settings',
                            content: <SettingsPage />,
                            type: 'settings',
                        },
                        true
                    )
                }}
                className="flex text-black hover:dark:bg-slate-700 dark:bg-slate-950 dark:text-slate-400 m-2 p-2 gap-2 cursor-pointer bg-gray-300 rounded-md hover:bg-gray-400"
            >
                <Settings /> <span>Settings</span>
            </Button>
        </div>
    )
}

export default Sidebar
