interface Content {
  name: string;
  type: 'folder' | 'file';
  key: string;
}

export interface ContentResult {
  Key: string;
  Size: number;
  LastModified: Date;
}

export type LayoutTypes = 'grid' | 'list';

interface FolderContentReducerState {
  loading: boolean;
  tree: Array<Content>;
  currentTree: Array<Content>;
  path_history: Array<string>;
  current_path: Array<string>;
  layout: LayoutTypes;
}

const initialState: FolderContentReducerState = {
  loading: false,
  tree: [],
  currentTree: [],
  path_history: [],
  current_path: [],
  layout: 'grid',
};

type FolderContentAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TREE'; payload: Array<ContentResult> }
  | { type: 'SET_CURRENT_TREE'; payload: string }
  | { type: 'SET_PATH_HISTORY'; payload: Array<string> }
  | { type: 'SET_CURRENT_PATH'; payload: Array<string> }
  | { type: 'SET_LAYOUT'; payload: 'grid' | 'list' }
  | { type: 'GO_BACK' }
  | { type: 'ADD_PATH'; payload: string }
  | { type: 'GO_TO_ROOT' }
  | { type: 'SEARCH'; payload: string };

function createTree(objects: Array<ContentResult>): Array<Content> {
  const tree: Array<Content> = [];

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    const parts = object.Key.split('/');

    let current = tree;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const existing = current.find((c) => c.name === part);
      if (existing) {
        current = existing.children;
      } else {
        const node: Content = {
          name: part,
          type: i === parts.length - 1 ? 'file' : 'folder',
          key: object.Key,
        };
        current.push(node);
        current = node.type === 'folder' ? (node.children = []) : [];
      }
    }
  }

  return tree;
}

function getCurrentTreeByKey(
  tree: Array<Content>,
  key: string
): Array<Content> {
  const parts = key.split('/');
  let current = tree;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const existing = current.find((c) => c.name === part);
    if (existing) {
      current = existing.children;
    } else {
      return [];
    }
  }
  return current;
}

const folderContentReducer = (
  state: FolderContentReducerState = initialState,
  action: FolderContentAction
): FolderContentReducerState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TREE': {
      const tree = createTree(action.payload);
      return { ...state, tree, currentTree: tree };
    }
    case 'SET_CURRENT_TREE':
      return {
        ...state,
        currentTree: getCurrentTreeByKey(state.tree, action.payload),
      };
    case 'SET_PATH_HISTORY':
      return { ...state, path_history: action.payload };
    case 'SET_CURRENT_PATH':
      return {
        ...state,
        current_path: action.payload,
        currentTree: getCurrentTreeByKey(
          state.tree,
          action.payload[action.payload.length - 1]
        ),
      };
    case 'SET_LAYOUT':
      return { ...state, layout: action.payload };
    case 'ADD_PATH':
      return {
        ...state,
        current_path: [...state.current_path, action.payload],
        currentTree: getCurrentTreeByKey(state.tree, action.payload),
      };
    case 'GO_BACK':
      return {
        ...state,
        path_history: state.path_history.slice(
          0,
          state.path_history.length - 1
        ),
      };
    case 'GO_TO_ROOT':
      return {
        ...state,
        current_path: [],
        currentTree: state.tree,
      };
    case 'SEARCH':
      return {
        ...state,
        currentTree: state.currentTree.filter((c) =>
          c.name.includes(action.payload)
        ),
      };
    default:
      return state;
  }
};

export { folderContentReducer, initialState };
