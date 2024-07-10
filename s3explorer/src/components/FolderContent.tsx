import React, { useEffect, useReducer } from "react";
import {
  ContentResult,
  folderContentReducer,
  initialState,
} from "../reducers/folderContent.reducer";
import Breadcrumb from "./Breadcrumb";
import GridFileItem from "./GridFileItem";
import ListFileItem from "./ListFileItem";
import Toolbar from "./Toolbar";

const FolderContent: React.FC<{
  active_bucket: string;
}> = ({ active_bucket }) => {
  const [state, dispatch] = useReducer(folderContentReducer, initialState);

  useEffect(() => {
    const fetchBucketContents = async () => {
      if (active_bucket) {
        dispatch({
          type: "SET_LOADING",
          payload: true,
        });
        const contents_result: Array<ContentResult> =
          await window.s3_api.getBucketContents(active_bucket);
        dispatch({
          type: "SET_TREE",
          payload: contents_result,
        });
        dispatch({
          type: "SET_LOADING",
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
      <Breadcrumb dispatch={dispatch} bucket={active_bucket} state={state} />

      <Toolbar
        path={state.current_path.join("/")}
        onFileCreate={(name) => {
          dispatch({
            type: "ADD_FILE",
            payload: name,
          });
        }}
        bucket={active_bucket}
        layout={state.layout}
        setLayout={(layout) =>
          dispatch({ type: "SET_LAYOUT", payload: layout })
        }
        onSearch={(term) => {
          dispatch({
            type: "SEARCH",
            payload: term,
          });
        }}
      />

      {state.layout === "list" && (
        <div className="overflow-auto w-full mt-6 mx-3">
          <table className="mx-6 table w-full table-auto border-separate border-spacing-0 border-spacing-y-2">
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
                .sort((a) => (a.type === "folder" ? -1 : 1))
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

      {state.layout === "grid" && (
        <div className={`gap-3 flex-wrap flex overflow-auto p-2`}>
          {state.currentTree
            .sort((a) => (a.type === "folder" ? -1 : 1))
            .map((content) => (
              <GridFileItem
                key={`grid_${content.key}`}
                dispatch={dispatch}
                bucket={active_bucket}
                content={content}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default FolderContent;
