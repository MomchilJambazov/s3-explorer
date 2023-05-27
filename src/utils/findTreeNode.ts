import { TreeNode } from '@/types'

export const findNodeByKey = (node: TreeNode, key: string | null): TreeNode | undefined => {
  if (node.key === key || !key) {
    return node;
  }

  if (node.children) {
    for (const childKey of Object.keys(node.children)) {
      const childNode = node.children[childKey];
      const foundNode = findNodeByKey(childNode, key);
      if (foundNode) {
        return foundNode;
      }
    }
  }

  return undefined;
};
