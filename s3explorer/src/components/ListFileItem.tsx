import React from 'react'
import { FileIcon } from 'react-file-icon'
import useFile from '../hooks/useFile'
import { Content, FolderContentAction } from '../reducers/folderContent.reducer'
import { getFileIconStyle } from '../utils'
import folderIcon from '../images/folder.png'

function ListFileItem({
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
        <tr
            className="table-row dark:hover:bg-slate-700 hover:bg-slate-200 rounded-md cursor-pointer"
            onClick={() => {
                onFileOpen()
            }}
        >
            <td className="p-2">
                {content.type === 'file' ? (
                    <div className="w-4 h-4">
                        <FileIcon {...getFileIconStyle(content.key)} />
                    </div>
                ) : (
                    <img src={folderIcon} alt="folder icon" width={20} />
                )}
            </td>
            <td>
                {content.name.slice(0, 30)}
                {content.name.length > 30 && '...'}
            </td>
            <td>{content.type}</td>
            <td>{content.listModified.toDateString()}</td>
        </tr>
    )
}

export default ListFileItem
