import React from 'react'
import TextEditor from '../components/Editor'
import ImageViewer from '../components/ImageViewer'
import { Content, FolderContentAction } from '../reducers/folderContent.reducer'
import useTabs from '../store/tab-store'
import { isImageFileByKey } from '../utils'

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
                    content: isImageFileByKey(content.key) ? (
                        <ImageViewer
                            obj_key={content.key}
                            bucket={active_bucket}
                        />
                    ) : (
                        <TextEditor
                            bucket={active_bucket}
                            obj_key={content.key}
                        />
                    ),
                    type: 'file',
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
