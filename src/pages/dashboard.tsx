import { useContext, useEffect } from 'react';
import arrayToTree from '@/utils/arrayToTree'
import TreeView from '@/components/layout/TreeView';
import DetailView from '@/components/layout/DetailView';
import { TreeContext } from '@/contexts/TreeContext'
import useS3Objects from '@/hooks/useS3Objects';

const Dashboard = () => {
    const { currentDir, treeData, setTreeData } = useContext(TreeContext);
    const { data, isLoading } = useS3Objects();

    useEffect(() => {
        if (data?.Contents) {
            const tree = arrayToTree(data?.Contents);
            setTreeData(tree)
        }
    }, [data]);

    if (!treeData) {
        return null;
    }

    if (!treeData && isLoading) {
        return <>Loading...</>;
    }

    return <div>
        {`/root/${currentDir}`}
        <TreeView tree={treeData} />
        <DetailView tree={treeData} />
    </div>
}

export default Dashboard;
