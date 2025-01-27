import React, { useEffect, useReducer } from 'react'
import {
    folderContentReducer,
    initialState,
} from '../reducers/folderContent.reducer'
import Breadcrumb from './Breadcrumb'
import GridFileItem from './GridFileItem'
import ListFileItem from './ListFileItem'
import Toolbar from './Toolbar'
import mixpanel from 'mixpanel-browser'
import { File } from 'lucide-react'

const FolderContent: React.FC<{
    active_bucket: string
}> = ({ active_bucket }) => {
    const [state, dispatch] = useReducer(folderContentReducer, initialState)

    useEffect(() => {
        const fetchBucketContents = async () => {
            if (active_bucket) {
                dispatch({
                    type: 'SET_LOADING',
                    payload: true,
                })
                const contents_result = await window.s3_api.getBucketContents(
                    active_bucket
                )
                dispatch({
                    type: 'SET_TREE',
                    payload: contents_result,
                })
                dispatch({
                    type: 'SET_LOADING',
                    payload: false,
                })
            }
        }
        fetchBucketContents()
    }, [active_bucket])

    if (state.loading)
        return (
            <div className="w-full h-full flex justify-center items-center text-xl text-gray-400">
                Loading...
            </div>
        )

    return (
        <div className="flex flex-col flex-grow overflow-auto">
            <Breadcrumb
                dispatch={dispatch}
                bucket={active_bucket}
                state={state}
            />
            <Toolbar
                path={state.current_path.join('/')}
                onFileCreate={(name) => {
                    mixpanel.track('file_created', {
                        event: 'file_created',
                        name,
                    })
                    dispatch({
                        type: 'ADD_FILE',
                        payload: name,
                    })
                }}
                bucket={active_bucket}
                layout={state.layout}
                setLayout={(layout) => {
                    mixpanel.track('layout_changed', {
                        event: 'layout_changed',
                        layout,
                    })
                    dispatch({ type: 'SET_LAYOUT', payload: layout })
                }}
                onSearch={(term) => {
                    mixpanel.track('searched file', {
                        event: 'searched_file',
                        term,
                    })
                    dispatch({
                        type: 'SEARCH',
                        payload: term,
                    })
                }}
            />

            {state.currentTree.length === 0 && (
                <div className="flex-grow flex-col flex items-center justify-center text-xl text-gray-400 gap-3">
                    <File size={54} />
                    No files or folders
                </div>
            )}

            {state.currentTree.length > 0 && state.layout === 'list' && (
                <div className="overflow-auto mt-6 flex-grow mx-6">
                    <table className="table w-full table-auto border-separate border-spacing-0 border-spacing-y-2">
                        <thead>
                            <tr className="table-row">
                                <th></th>
                                <th className="text-start">Name</th>
                                <th className="text-start">Type</th>
                                <th className="text-start">Last Modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.currentTree
                                .sort((a) => (a.type === 'folder' ? -1 : 1))
                                .map((content) => (
                                    <ListFileItem
                                        key={`list_${content.key}`}
                                        dispatch={dispatch}
                                        bucket={active_bucket}
                                        content={content}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
            {state.currentTree.length > 0 && state.layout === 'grid' && (
                <div className={`px-6 flex-grow overflow-scroll`}>
                    <div className="flex flex-wrap gap-3 ">
                        {state.currentTree
                            .sort((a) => (a.type === 'folder' ? -1 : 1))
                            .map((content) => (
                                <GridFileItem
                                    key={`grid_${content.key}`}
                                    dispatch={dispatch}
                                    bucket={active_bucket}
                                    content={content}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FolderContent
