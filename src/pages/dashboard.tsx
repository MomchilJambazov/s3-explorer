import { useContext } from 'react';
import { TreeNode } from '@/types';
import TreeView from '@/components/layout/TreeView';
import DetailView from '@/components/layout/DetailView';
import { TreeContext } from '@/contexts/TreeContext'

type Props = {
    tree: TreeNode
}

const Dashboard = ({tree}: Props) => {
    const { treeData, setTreeData } = useContext(TreeContext);

return <div>
    <TreeView tree={tree} />
    <DetailView tree={tree} />
</div>
}

export default Dashboard;