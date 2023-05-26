import { TreeNode } from '@/types'
import TreeView from '@/components/layout/TreeView';
import DetailView from '@/components/layout/DetailView';

type Props = {
    tree: TreeNode
}

const Dashboard = ({tree}: Props) => <div>
    <TreeView tree={tree} />
    <DetailView />
</div>

export default Dashboard;