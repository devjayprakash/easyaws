import { File, Folder, XIcon, Settings, FolderArchiveIcon } from 'lucide-react'
import React, { useEffect, useMemo, lazy } from 'react'
import useTabs, { Tab } from '../store/tab-store'
import { isImageFileByKey } from '../utils'
import useSettingsStore from '../store/settings'
import DeveloperCenter from './DeveloperCenter'

const SettingsPage = lazy(() => import('./Settings'))
const TextEditor = lazy(() => import('./Editor'))
const ImageViewer = lazy(() => import('./ImageViewer'))
const FolderContent = lazy(() => import('./FolderContent'))

const Tabs: React.FC = () => {
    const { tabs, removeTab, setActiveTab, activeTabId } = useTabs()
    const { accentColor } = useSettingsStore()

    const active_tab = useMemo(
        () => tabs.find((tab) => tab.id === activeTabId),
        [activeTabId, tabs]
    )

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'w' && (e.ctrlKey || e.metaKey)) {
                removeTab(tabs.findIndex((tab) => tab.id === activeTabId))
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const getContent = (tab: Tab) => {
        if (!tab) {
            return (
                <div className="w-full h-full flex flex-col justify-center items-center text-gray-400 gap-5">
                    <div>
                        <FolderArchiveIcon size={98} />
                    </div>
                    <div className="text-2xl font-thin max-w-md text-center">
                        No buckets selected. Select a bucket from the sidebar to
                        get started
                    </div>
                </div>
            )
        }

        switch (tab.type) {
            case 'file':
                if (isImageFileByKey(tab.id)) {
                    return (
                        <ImageViewer bucket={tab.bucket_id} obj_key={tab.id} />
                    )
                } else {
                    return (
                        <TextEditor bucket={tab.bucket_id} obj_key={tab.id} />
                    )
                }
                return null
            case 'settings':
                return <SettingsPage />
            case 'folder':
                return <FolderContent active_bucket={tab.id} />
            case 'developer':
                return <DeveloperCenter />
        }
    }

    return (
        <div className="h-screen flex flex-col pt-8 overflow-hidden">
            <div className="border-b flex dark:border-gray-600">
                {tabs.map((tab, i) => (
                    <div
                        onMouseDown={(e) => {
                            if (e.button === 1) {
                                removeTab(i)
                            }
                        }}
                        key={tab.name}
                        style={{
                            borderTop: `2px solid ${
                                tab.id === activeTabId
                                    ? accentColor
                                    : 'transparent'
                            }`,
                        }}
                        className={`px-3 max-w-[220px] select-none truncate py-1 flex-shrink-0 flex gap-2 items-center cursor-pointer text-sm border-t-[2px] border-r dark:border-gray-600 ${
                            tab.id === activeTabId
                                ? 'dark:text-white'
                                : 'dark:bg-gray-950 dark:text-gray-400'
                        }`}
                    >
                        {tab.type === 'file' ? (
                            <File size={16} className="flex-shrink-0" />
                        ) : tab.type === 'settings' ? (
                            <Settings size={16} className="flex-shrink-0" />
                        ) : (
                            <Folder size={16} className="flex-shrink-0" />
                        )}{' '}
                        <span
                            onClick={() => {
                                setActiveTab(tab.id)
                            }}
                            className="text-sm overflow-hidden"
                        >
                            {tab.name}
                        </span>
                        <XIcon
                            onClick={() => {
                                removeTab(i)
                            }}
                            className="cursor-pointer flex-shrink-0 hover:text-white hover:bg-red-300 rounded-full duration-150"
                            size={16}
                        />
                    </div>
                ))}
            </div>
            <div className="w-full h-full flex flex-col overflow-hidden">
                {getContent(active_tab)}
            </div>
        </div>
    )
}

export default Tabs
