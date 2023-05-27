import { useContext, useEffect } from 'react';
import arrayToTree from '@/utils/arrayToTree'
import TreeView from '@/components/layout/TreeView';
import DetailView from '@/components/layout/DetailView';
import { TreeContext } from '@/contexts/TreeContext'
import useS3Objects from '@/hooks/useS3Objects';

const POLLING_INTERVAL_MS = 15000;

const Dashboard = () => {
    const { currentPath, treeData, setTreeData } = useContext(TreeContext);
    const { data, isLoading, hasError, refetch } = useS3Objects();

    useEffect(() => {
        const fetchTimer = setInterval(() => {
            refetch();
        }, POLLING_INTERVAL_MS); // Refetch every 15 seconds

        return () => {
            clearInterval(fetchTimer);
        };
    }, []);

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
      <div className="dashboard">
        <TreeView tree={treeData} />
        <DetailView
          tree={treeData}
          refetch={refetch}
          currentPath={currentPath}
          keyCount={data?.KeyCount || 0}
          maxKeys={data?.MaxKeys || 0}
        />
      </div>
    );
}

export default Dashboard;
