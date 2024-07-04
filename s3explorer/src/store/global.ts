import { create } from 'zustand';

export interface S3TreeNode {
  name: string;
  type: 'folder' | 'file';
  children?: S3TreeNode[];
}
export interface ContentResult {
  Key: string;
  Size: number;
  LastModified: Date;
}

type GlobalStore = {
  active_bucket: string | null;
  setActiveBucket: (bucket: string) => void;
  tree: S3TreeNode[] | null;
  createTree: (objects: Array<ContentResult>) => void;
  path: Array<string>;
  addPath: (path: string) => void;
  removePath: (path: string) => void;
  setPath: (path: Array<string>) => void;
  currentTree: Array<S3TreeNode> | null;
  setCurrentTree: (path: Array<string>) => void;
};

const addToTree = (tree: S3TreeNode[], path: string) => {
  const parts = path.split('/');
  let current = tree;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const existing = current.find((c) => c.name === part);
    if (existing) {
      current = existing.children!;
    } else {
      const node: S3TreeNode = {
        name: part,
        type: i === parts.length - 1 ? 'file' : 'folder',
        children: i === parts.length - 1 ? undefined : [],
      };
      current.push(node);
      current = node.children!;
    }
  }
};

const useGlobalStore = create<GlobalStore>((set) => ({
  active_bucket: null,
  setActiveBucket: (bucket) => set({ active_bucket: bucket }),
  tree: null,
  path: [],
  createTree: (objects) =>
    set((state) => {
      const tree: S3TreeNode[] = [];
      objects.forEach((content) => {
        addToTree(tree, content.Key);
      });
      return { ...state, tree };
    }),
  addPath: (path) => set((state) => ({ path: [...state.path, path] })),
  removePath: (path) =>
    set((state) => {
      const index = state.path.indexOf(path);
      if (index !== -1) {
        state.path.splice(index, 1);
      }
      return { path: state.path };
    }),
  currentTree: null,
  setCurrentTree: (path) =>
    set((state) => {
      const findChildren = (tree: S3TreeNode[], path: string[]) => {
        let current = tree;
        for (let i = 0; i < path.length; i++) {
          const part = path[i];
          const existing = current.find((c) => c.name === part);
          if (existing) {
            current = existing.children;
          } else {
            return null;
          }
        }
        return current;
      };
      const tree =
        path.length > 0 ? findChildren(state.tree, path) : state.tree;

      return { ...state, currentTree: tree };
    }),
  setPath: (path) => set({ path }),
}));

export default useGlobalStore;
