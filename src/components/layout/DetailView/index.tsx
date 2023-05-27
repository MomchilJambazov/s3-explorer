import { TreeNode } from '@/types'
import { findNodeByKey } from '@/utils/findTreeNode'
import './styles.css';

interface TreeViewProps {
  tree: TreeNode;
  currentDir: string | null;
}

const DetailView: React.FC<TreeViewProps> = ({ tree, currentDir }) => {
  const currentNode = findNodeByKey(tree, currentDir);
  const currentDirObjects = Object.values(currentNode?.children || {})

  return (
    <div>
      <div className='card breadcrumps'>
        {`/root/${currentDir ? currentDir : ''}`}
      </div>
      <div className="detail-view card">
        {(!!currentDir && !currentDirObjects.length) && <p>Folder is empty</p>}
        {currentDirObjects.map(childNode => {
          return (
            <li key={childNode.key}>{childNode.name}</li>
          );
        })}
      </div>
    </div>
  );
}

export default DetailView;
