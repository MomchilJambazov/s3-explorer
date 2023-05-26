export interface TreeNode {
    name: string;
    type: 'folder' | 'file';
    lastModified?: string;
    size?: number;
    children?: Record<string, TreeNode>;
  }