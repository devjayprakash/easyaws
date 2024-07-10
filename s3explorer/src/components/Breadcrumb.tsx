import { FolderArchiveIcon, HomeIcon } from "lucide-react";
import React, { useEffect } from "react";
import {
  FolderContentAction,
  FolderContentReducerState,
} from "../reducers/folderContent.reducer";

function Breadcrumb({
  dispatch,
  bucket,
  state,
}: {
  dispatch: React.Dispatch<FolderContentAction>;
  bucket: string;
  state: FolderContentReducerState;
}) {
  useEffect(() => {
    //mouse back click detect
    const backFn = (e: MouseEvent) => {
      if (e.button === 3) {
        dispatch({
          type: "GO_BACK",
        });
      }
    };
    window.addEventListener("mousedown", backFn);

    return () => {
      window.removeEventListener("mousedown", backFn);
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-1 px-5 py-2 items-center">
      <div
        onClick={() => {
          dispatch({
            type: "GO_TO_ROOT",
          });
        }}
        className="p-2 flex gap-2 text-sm items-center max-w-[200px] dark:hover:bg-gray-900 rounded-md cursor-pointer"
      >
        <HomeIcon className="flex-shrink-0" size={16} />
        <div className="truncate">{bucket}</div>
      </div>
      {state.current_path.map((p, i) => (
        <div
          key={`path-${i}`}
          onClick={() => {
            dispatch({
              type: "SET_CURRENT_PATH",
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
  );
}

export default Breadcrumb;
