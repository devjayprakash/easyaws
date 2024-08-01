import { Delete, Download } from 'lucide-react'
import React from 'react'
import { FileIcon } from 'react-file-icon'
import useFile from '../hooks/useFile'
import folderIcon from '../images/folder.png'
import { Content, FolderContentAction } from '../reducers/folderContent.reducer'
import { getFileIconStyle } from '../utils'

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from './ui/context-menu'

function GridFileItem({
    content,
    dispatch,
    bucket,
}: {
    content: Content
    dispatch: React.Dispatch<FolderContentAction>
    bucket: string
}) {
    const { onFileOpen } = useFile(bucket, content, dispatch)

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    onClick={() => onFileOpen()}
                    className="p-3 rounded-md flex w-[90px] flex-col items-center justify-start  cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 duration-150"
                >
                    {content.type === 'file' ? (
                        <div className="w-[40px] h-10 mb-5">
                            <FileIcon {...getFileIconStyle(content.key)} />
                        </div>
                    ) : (
                        <img src={folderIcon} alt="folder icon" width={60} />
                    )}
                    <span className="w-[80px] text-xs text-center line-clamp-3">
                        {content.name}
                    </span>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem>
                    <div className="flex items-center gap-3">
                        <Download size={12} />
                        <span className="text-sm">Download</span>
                    </div>
                </ContextMenuItem>
                <ContextMenuItem>
                    <div className="flex items-center gap-3 text-red-400">
                        <Delete size={12} />
                        <span className="text-sm">Delete</span>
                    </div>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default GridFileItem
