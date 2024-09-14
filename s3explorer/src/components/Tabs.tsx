import { File, Folder, XIcon, Settings } from 'lucide-react'
import React, { useEffect } from 'react'
import useTabs, { Tab } from '../store/tab-store'
import FolderContent from './FolderContent'
import { isImageFileByKey } from '../utils'
import ImageViewer from './ImageViewer'
import TextEditor from './Editor'
import SettingsPage from './Settings'

const Tabs: React.FC = () => {
    const { tabs, removeTab, setActiveTab, activeTabId } = useTabs()

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
        }
    }

    return (
        <div className="h-screen flex flex-col pt-8">
            <div className="flex flex-shrink-0 border-b h-8 dark:border-gray-600 w-full items-center overflow-x-hidden">
                {tabs.map((tab, i) => (
                    <div
                        onMouseDown={(e) => {
                            if (e.button === 1) {
                                removeTab(i)
                            }
                        }}
                        key={tab.name}
                        className={`px-3 max-w-[220px] select-none truncate py-1 flex-shrink-0 flex gap-2 items-center cursor-pointer text-sm border-t-[2px] border-r dark:border-gray-600 ${
                            tab.id === activeTabId
                                ? 'dark:text-white dark:border-t-sky-400 border-t-sky-400'
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

            {tabs.map((tab) => (
                <div
                    hidden={tab.id !== activeTabId}
                    key={tab.id}
                    className="w-full h-full"
                >
                    {getContent(tab)}
                </div>
            ))}
        </div>
    )
}

export default Tabs
