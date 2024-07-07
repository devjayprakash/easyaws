import { FolderArchiveIcon, HomeIcon } from 'lucide-react';
import React, { useEffect, useReducer } from 'react';
import { FileIcon } from 'react-file-icon';
import {
  ContentResult,
  folderContentReducer,
  initialState,
} from '../reducers/folderContent.reducer';
import useTabs from '../store/tab-store';
import TextEditor from './Editor';
import Toolbar from './Toolbar';

const FolderContent: React.FC<{
  active_bucket: string;
}> = ({ active_bucket }) => {
  const { addTab, setActiveTab } = useTabs();
  const [state, dispatch] = useReducer(folderContentReducer, initialState);

  useEffect(() => {
    //mouse back click detect
    const backFn = (e: MouseEvent) => {
      if (e.button === 3) {
        dispatch({
          type: 'GO_BACK',
        });
      }
    };
    window.addEventListener('mousedown', backFn);

    return () => {
      window.removeEventListener('mousedown', backFn);
    };
  }, []);

  useEffect(() => {
    const fetchBucketContents = async () => {
      if (active_bucket) {
        dispatch({
          type: 'SET_LOADING',
          payload: true,
        });
        const contents_result: Array<ContentResult> =
          await window.s3_api.getBucketContents(active_bucket);
        dispatch({
          type: 'SET_TREE',
          payload: contents_result,
        });
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        });
      }
    };
    fetchBucketContents();
  }, [active_bucket]);

  if (state.loading)
    return (
      <div className="w-full h-full flex justify-center items-center text-xl text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex flex-wrap gap-1 px-5 py-2 items-center">
        <div
          onClick={() => {
            dispatch({
              type: 'GO_TO_ROOT',
            });
          }}
          className="p-2 flex gap-2 text-sm items-center max-w-[200px] dark:hover:bg-gray-900 rounded-md cursor-pointer"
        >
          <HomeIcon className="flex-shrink-0" size={16} />
          <div className="truncate">{active_bucket}</div>
        </div>
        {state.current_path.map((p, i) => (
          <div
            key={`path-${i}`}
            onClick={() => {
              dispatch({
                type: 'SET_CURRENT_PATH',
                payload: state.current_path.slice(0, i + 1),
              });
            }}
            className="flex gap-2 text-sm items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 p-2 rounded-md duration-150"
          >
            <span>&gt;</span>
            <FolderArchiveIcon size={16} />
            <span className="max-w-[200px] truncate">{p}</span>
          </div>
        ))}
      </div>
      <Toolbar
        layout={state.layout}
        setLayout={(layout) =>
          dispatch({ type: 'SET_LAYOUT', payload: layout })
        }
        onSearch={(term) => {
          dispatch({
            type: 'SEARCH',
            payload: term,
          });
        }}
      />
      {state.layout === 'list' && (
        <div className="overflow-auto w-full mt-6 mx-3">
          <table className="mx-6 table w-full table-auto border-separate border-spacing-0 border-spacing-y-2">
            <thead>
              <tr className="table-row">
                <th></th>
                <th className="text-start">Name</th>
                <th className="text-start">Type</th>
              </tr>
            </thead>
            <tbody>
              {state.currentTree
                .sort((a) => (a.type === 'folder' ? -1 : 1))
                .map((content) => (
                  <tr
                    className="table-row dark:hover:bg-slate-700 hover:bg-slate-200 rounded-md cursor-pointer"
                    onClick={() => {
                      if (content.type === 'folder') {
                        dispatch({
                          type: 'ADD_PATH',
                          payload: content.name,
                        });
                      } else {
                        const tab = {
                          name: content.name,
                          id: content.key,
                          content: (
                            <TextEditor
                              bucket={active_bucket}
                              obj_key={content.key}
                            />
                          ),
                        };
                        addTab(tab);
                        setActiveTab(tab);
                      }
                    }}
                  >
                    <td className="p-2">
                      {content.type === 'file' ? (
                        <div className="w-8 h-8">
                          <FileIcon extension={content.name.split('.').pop()} />
                        </div>
                      ) : (
                        <img src={'/folder.png'} alt="folder icon" width={20} />
                      )}
                    </td>
                    <td className="table-cell">{content.name}</td>
                    <td>{content.type}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {state.layout === 'grid' && (
        <div className={`gap-3 flex-wrap flex overflow-auto p-2`}>
          {state.currentTree
            .sort((a) => (a.type === 'folder' ? -1 : 1))
            .map((content) => (
              <div
                key={content.name}
                onClick={() => {
                  if (content.type === 'folder') {
                    dispatch({
                      type: 'ADD_PATH',
                      payload: content.name,
                    });
                  } else {
                    const tab = {
                      name: content.name,
                      id: content.key,
                      content: (
                        <TextEditor
                          bucket={active_bucket}
                          obj_key={content.key}
                        />
                      ),
                    };
                    addTab(tab);
                    setActiveTab(tab.id);
                  }
                }}
                className="p-3 rounded-md flex w-[90px] flex-col items-center justify-start  cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 duration-150"
              >
                {content.type === 'file' ? (
                  <div className="w-14 h-14 mb-5">
                    <FileIcon extension={content.name.split('.').pop()} />
                  </div>
                ) : (
                  <img src={'/folder.png'} alt="folder icon" width={60} />
                )}
                <span className="w-[80px] text-xs text-center line-clamp-3">
                  {content.name}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FolderContent;
