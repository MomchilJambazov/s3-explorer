import { useContext } from 'react';
import { TreeNode } from '@/types'
import { TreeContext } from '@/contexts/TreeContext'
import { findNodeByKey } from '@/utils/findTreeNode'
import useDeleteObject from '@/hooks/useDeleteObject'
import Breadcrumbs from './Breadcrumbs'
import './styles.css';

interface TreeViewProps {
  tree: TreeNode;
  currentDir: string | null;
  refetch: () => void;
}

const DetailView: React.FC<TreeViewProps> = ({ tree, currentDir, refetch }) => {
  const currentNode = findNodeByKey(tree, currentDir);
  const isFolder = currentNode?.type === "folder";
  const currentDirObjects = Object.values(currentNode?.children || {});
  const { setCurrentDir } = useContext(TreeContext);
  const deleteObject = useDeleteObject();

  const handleDelete = (event:React.MouseEvent, key:string) => {
    event.stopPropagation();
    deleteObject(key);
  }

  return (
    <div>
      <Breadcrumbs currentDir={currentDir} refetch={refetch} />
      <div className="detail-view card">
        {(!!currentDir && !currentDirObjects.length && isFolder) && <p>Folder is empty</p>}
        {currentDirObjects.map(childNode => {
          return (
            <li className='link' onClick={() => setCurrentDir(childNode.key)} key={childNode.key}>
              {childNode.name}
              <span className='link' onClick={(e) => handleDelete(e, childNode.key)}>[x]</span>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default DetailView;
