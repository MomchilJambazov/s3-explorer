import { useContext, useEffect } from 'react';
import arrayToTree from '@/utils/arrayToTree'
import TreeView from '@/components/layout/TreeView';
import DetailView from '@/components/layout/DetailView';
import { TreeContext } from '@/contexts/TreeContext'
import useS3Objects from '@/hooks/useS3Objects';

const Dashboard = () => {
    const { currentDir, treeData, setTreeData } = useContext(TreeContext);
    const { data, isLoading, hasError, refetch } = useS3Objects();

    useEffect(() => {
        if (data?.Contents) {
            const tree = arrayToTree(data?.Contents);
            setTreeData(tree)
        }
    }, [data]);

    if (!treeData && isLoading) {
        //TODO: Add skeleton
        return <>Loading...</>;
    }

    if (!treeData || hasError) {
        return null;
    }

    return (
        <div className='dashboard'>
            <TreeView tree={treeData} />
            <DetailView tree={treeData} refetch={refetch} currentDir={currentDir} />
        </div>
    )
}

export default Dashboard;
