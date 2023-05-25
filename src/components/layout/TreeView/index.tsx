import './styles.css';

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

function TreeView() {
  return (
    <div className="tree-view">
    </div>
  );
}

export default TreeView;
