import { TreeNode } from '@/types'
import './styles.css';

interface TreeViewProps {
  tree: TreeNode;
}

const DetailView: React.FC<TreeViewProps> = ({ tree }) => {
  return (
    <div className="detail-view">
    </div>
  );
}

export default DetailView;
