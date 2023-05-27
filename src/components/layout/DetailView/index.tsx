import { useContext } from 'react';
import { TreeNode } from '@/types'
import { TreeContext } from '@/contexts/TreeContext'
import { findNodeByKey } from '@/utils/findTreeNode'
import Breadcrumbs from './Breadcrumbs'
import './styles.css';

interface TreeViewProps {
  tree: TreeNode;
  currentDir: string | null;
}

const DetailView: React.FC<TreeViewProps> = ({ tree, currentDir }) => {
  const currentNode = findNodeByKey(tree, currentDir);
  const isFolder = currentNode?.type === "folder";
  const currentDirObjects = Object.values(currentNode?.children || {});
  const { setCurrentDir } = useContext(TreeContext);

  return (
    <div>
      <Breadcrumbs currentDir={currentDir} />
      <div className="detail-view card">
        {(!!currentDir && !currentDirObjects.length && isFolder) && <p>Folder is empty</p>}
        {currentDirObjects.map(childNode => {
          return (
            <li onClick={() => setCurrentDir(childNode.key)} key={childNode.key}>{childNode.name}</li>
          );
        })}
      </div>
    </div>
  );
}

export default DetailView;
