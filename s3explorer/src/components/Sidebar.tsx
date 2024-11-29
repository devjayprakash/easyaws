import {
    FolderDotIcon,
    SearchIcon,
    Settings,
    Settings2,
    XCircle,
} from 'lucide-react'
import React, { useEffect, useMemo } from 'react'
import useTabs from '../store/tab-store'
import { Button } from './ui/button'
import mixpanel from 'mixpanel-browser'
import BucketTools from './BucketTools'
import useBucketStore from '../store/buckets'
import useSettingsStore from '../store/settings'
import { addAlpha } from '../utils'

function Sidebar() {
    const { tabs, activeTabId, addTab } = useTabs()
    const { buckets, setBuckets, loading, setLoading } = useBucketStore()
    const { accentColor } = useSettingsStore()

    const [searchTerm, setSearchTerm] = React.useState<string>('')

    const activeTab = useMemo(
        () => tabs.find((tab) => tab.id === activeTabId),
        [activeTabId, tabs]
    )

    useEffect(() => {
        const getBucketData = async () => {
            setLoading(true)
            mixpanel.track('get_buckets', {
                event: 'get_buckets',
            })
            const result = await window.s3_api.getBuckets()
            setBuckets(result.map((r) => r?.Name))
            setLoading(false)
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
                    className="py-2 placeholder:text-sm outline-none w-full dark:bg-gray-800 bg-gray-300 dark:text-white text-xs"
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
            <BucketTools hidden={!activeTab} />
            {loading && (
                <div className="text-xs text-gray-400 p-2">Loading...</div>
            )}
            <div className="flex-grow overflow-y-auto p-2 x-2 space-y-1">
                {buckets
                    .filter((b) => b.includes(searchTerm))
                    .map((bucket) => (
                        <div
                            key={bucket}
                            onClick={() => {
                                mixpanel.track('clicked_on_bucket', {
                                    event: 'open_bucket',
                                    bucket,
                                })
                                addTab(
                                    {
                                        name: bucket,
                                        id: bucket,
                                        type: 'folder',
                                        saved: true,
                                    },
                                    true
                                )
                            }}
                            className={`${
                                activeTab?.name === bucket
                                    ? `bg-[${accentColor}]/40`
                                    : 'bg-transparent'
                            } p-2 flex items-center gap-2 text-gray-600 dark:text-gray-300 rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 duration-150`}
                        >
                            <FolderDotIcon
                                size={16}
                                className="flex-shrink-0 "
                            />
                            <div className="text-xs truncate">{bucket}</div>
                        </div>
                    ))}
            </div>
            <Button
                onClick={() => {
                    mixpanel.track('clicked_on_settings')
                    addTab(
                        {
                            name: 'Settings',
                            id: 'settings',
                            type: 'settings',
                            saved: true,
                        },
                        true
                    )
                }}
                className="flex text-slate-700 text-xs hover:dark:bg-slate-700 dark:bg-slate-950 dark:text-slate-400 m-2 p-1 gap-2 cursor-pointer bg-gray-300 rounded-md hover:bg-gray-400"
            >
                <Settings size={18} /> <span>Settings</span>
            </Button>
            {import.meta.url.includes('localhost') && (
                <Button
                    onClick={() => {
                        addTab(
                            {
                                name: 'Developer center',
                                id: 'developer',
                                type: 'developer',
                                saved: true,
                            },
                            true
                        )
                    }}
                    className="flex text-slate-700 text-xs hover:dark:bg-slate-700 dark:bg-slate-950 dark:text-slate-400 m-2 p-1 gap-2 cursor-pointer bg-gray-300 rounded-md hover:bg-gray-400"
                >
                    <Settings2 size={18} />
                    Developer center
                </Button>
            )}
        </div>
    )
}

export default Sidebar
