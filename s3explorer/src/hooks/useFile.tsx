import React from 'react'
import { Content, FolderContentAction } from '../reducers/folderContent.reducer'
import useTabs from '../store/tab-store'

const useFile = (
    active_bucket: string,
    content: Content,
    dispatch: React.Dispatch<FolderContentAction>
) => {
    const { addTab } = useTabs()

    const onFileOpen = () => {
        if (content.type === 'folder') {
            dispatch({
                type: 'ADD_PATH',
                payload: content.name,
            })
        } else {
            addTab(
                {
                    name: content.name,
                    id: content.key,
                    type: 'file',
                    bucket_id: active_bucket,
                    saved: true,
                },
                true
            )
        }
    }

    return {
        onFileOpen,
    }
}

export default useFile
