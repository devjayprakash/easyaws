import React, { useState } from 'react'
import { Edit2, FilePlus, Trash } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import CreateBucketDialog from './CreateBucketDialog'

interface ToolsProps {
    image: React.ReactNode
    onClick: () => void
    tooltip: string
    hidden: boolean
}

const Tool: React.FC<ToolsProps> = ({ image, onClick, tooltip, hidden }) => {
    if (hidden) {
        return null
    }

    return (
        <Tooltip delayDuration={2000}>
            <TooltipTrigger>
                <button
                    onClick={onClick}
                    className="p-1 rounded-md hover:text-black dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-700 text-xs"
                >
                    {image}
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <div className="text-xs">{tooltip}</div>
            </TooltipContent>
        </Tooltip>
    )
}

interface BucketToolsProps {
    hidden: boolean
}

const BucketTools: React.FC<BucketToolsProps> = ({ hidden }) => {
    const [showCreateModal, setShowCreateModal] = useState(false)

    const toolsData = [
        {
            name: 'create_new',
            icon: <FilePlus size={12} />,
            tooltip: 'Create New Bucket',
            hidden: false,
            onClick: () => {
                setShowCreateModal(true)
            },
        },
        {
            name: 'rename',
            icon: <Edit2 size={12} />,
            tooltip: 'Rename Bucket',
            hidden: hidden,
            onClick: () => {
                console.log('clicked on create_new')
            },
        },
        {
            name: 'delete',
            icon: <Trash size={12} />,
            tooltip: 'Delete Bucket',
            hidden: hidden,
            onClick: () => {
                console.log('clicked on create_new')
            },
        },
    ]

    return (
        <div className="flex justify-between gap-2 items-center px-3 mt-3 border-b-2 py-1 border-gray-300 dark:border-gray-800">
            <div className="text-xs text-gray-400">Explorer</div>
            <div className="flex gap-2 text-gray-400">
                {toolsData.map((tool) => (
                    <Tool
                        hidden={tool.hidden}
                        key={tool.name}
                        image={tool.icon}
                        tooltip={tool.tooltip}
                        onClick={tool.onClick}
                    />
                ))}
            </div>
            <CreateBucketDialog
                open={showCreateModal}
                onClose={setShowCreateModal}
            />
        </div>
    )
}

export default BucketTools
