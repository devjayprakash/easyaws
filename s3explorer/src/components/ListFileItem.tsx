import React from 'react'
import { FileIcon } from 'react-file-icon'
import useFile from '../hooks/useFile'
import { Content, FolderContentAction } from '../reducers/folderContent.reducer'
import { getFileIconStyle } from '../utils'

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
                    <img
                        src={require('../images/folder.png')}
                        alt="folder icon"
                        width={20}
                    />
                )}
            </td>
            <td className="table-cell">{content.name}</td>
            <td>{content.type}</td>
            <td>{content.listModified.toDateString()}</td>
        </tr>
    )
}

export default ListFileItem
