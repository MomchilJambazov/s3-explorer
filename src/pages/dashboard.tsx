import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import arrayToTree from '@/utils/arrayToTree'
import TreeView from '@/components/layout/TreeView';
import DetailView from '@/components/layout/DetailView';
import { TreeContext } from '@/contexts/TreeContext'
import { CredentialsContext } from '@/contexts/CredentialsContext';

const DATA = [
    {
        "Key": "folder1/",
        "LastModified": "2023-05-23T22:51:39.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "folder2/",
        "LastModified": "2023-05-23T22:51:56.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "folder2/folder3/",
        "LastModified": "2023-05-25T06:43:43.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "node1/",
        "LastModified": "2023-05-25T10:14:46.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "node1/subnode1/",
        "LastModified": "2023-05-25T10:15:11.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "node1/subnode2/",
        "LastModified": "2023-05-25T10:15:24.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "node1/subnode2/file.txt",
        "LastModified": "2023-05-25T10:15:39.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "node1/subnode2/subnode/",
        "LastModified": "2023-05-25T10:16:02.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "node2/",
        "LastModified": "2023-05-25T10:16:39.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "node2/subnode1/",
        "LastModified": "2023-05-25T10:16:19.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "node3/",
        "LastModified": "2023-05-25T10:16:52.000Z",
        "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
        "Size": 0,
        "StorageClass": "STANDARD"
    }
]

const Dashboard = () => {
    const mock_tree = arrayToTree(DATA);
    const { treeData, setTreeData } = useContext(TreeContext);
    const { credentials } = useContext(CredentialsContext);
    const navigate = useNavigate();

    useEffect(() => {
        const hasInvalidCredentials = Object.values(credentials).some((e)=>!e)
        if (hasInvalidCredentials) {
            navigate('/credentials');
        }
    }, [credentials])

    if (!treeData) {
        return null;
    }

    return <div>
        <TreeView tree={treeData} />
        <DetailView tree={treeData} />
    </div>
}

export default Dashboard;