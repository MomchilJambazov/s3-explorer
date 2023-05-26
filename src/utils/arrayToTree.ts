import { TreeNode } from '@/types'

// Function to convert array to tree
function arrayToTree(data: any[]): TreeNode {
    const root: TreeNode = { name: '', key: '', type: 'folder', children: {} };
  
    for (const item of data) {
      let pathParts = item.Key.split('/');
  
      if (!item.Key.endsWith('/')) {
        // it's a file
        pathParts = pathParts.slice(0, pathParts.length);
      } else {
        // it's a folder
        pathParts = pathParts.slice(0, pathParts.length - 1);
      }
  
      let currentNode = root;
  
      for (let i = 0; i < pathParts.length; i++) {
        const isFile = i === pathParts.length - 1 && !item.Key.endsWith('/');
        const pathPart = pathParts[i];
  
        if (currentNode.children && !currentNode.children[pathPart]) {
          currentNode.children[pathPart] = {
            name: pathPart,
            key:  item.Key,
            type: isFile ? 'file' : 'folder',
            children: isFile ? undefined : {},
          };
        }
  
        if (isFile && currentNode.children) {
          // add the file details
          currentNode.children[pathPart].lastModified = item.LastModified;
          currentNode.children[pathPart].size = item.Size;
        }
  
        // move to the next node in the path
        if (currentNode.children) {
          currentNode = currentNode.children[pathPart];
        }
      }
    }
  
    return root;
  }
  

export default arrayToTree;