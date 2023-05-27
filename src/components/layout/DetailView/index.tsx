import { useContext, useState } from "react";
import { TreeNode } from "@/types";
import { TreeContext } from "@/contexts/TreeContext";
import { findNodeByKey } from "@/utils/findTreeNode";
import useReadS3File from "@/hooks/useReadFile";
import useDeleteObject from "@/hooks/useDeleteObject";
import Breadcrumbs from "./Breadcrumbs";
import Button from "@/components/ui/Button";
import Popover from "@/components/ui/Popover";
import Toast from "@/components/ui/Toast";
import "./styles.css";

interface TreeViewProps {
  tree: TreeNode;
  currentPath: string | null;
  keyCount: number;
  maxKeys: number;
  refetch: () => void;
}

const DetailView: React.FC<TreeViewProps> = ({ tree, currentPath, refetch, keyCount, maxKeys }) => {
  const currentNode = findNodeByKey(tree, currentPath);
  const isFolder = currentNode?.type === "folder";
  const isKeyLimitReached = keyCount >= maxKeys;
  const currentDirObjects = Object.values(currentNode?.children || {});
  const { setCurrentPath } = useContext(TreeContext);
  const { readFile } = useReadS3File();
  const { deleteObject, error, errorCleanup } = useDeleteObject();

  const handleDelete = (key: string, event?: React.MouseEvent) => {
    event?.stopPropagation();
    deleteObject(key);
  };

  const [fileData, setData] = useState<string | undefined>();

  if (!fileData && !isFolder && currentNode) {
    readFile(currentNode?.key).then(r => r?.Body?.transformToString()).then(d => setData(d))
  }
  if (fileData && isFolder) {
    setData(undefined);
  }

  return (
    <div className="detail-view">
      {error && <Toast message={`Error deleting S3 object: ${error?.message}`} type="danger" callback={errorCleanup} />}
      <Breadcrumbs
        currentPath={currentPath}
        refetch={refetch}
        showCreateOptions={isFolder && !isKeyLimitReached}
      />
      {!isFolder ?
        <div className="card">
          {fileData}
        </div> :
        !!currentPath && !currentDirObjects.length && isFolder ? (
          <div className="card">
            <p style={{ textAlign: "center", width: "100%" }}>Folder is empty</p>
          </div>
        ) : (
          <div className="grid card">
            {currentDirObjects.map((childNode) => {
              const icon = childNode?.type === "folder" ? "📁" : "📄";
              return (
                <div key={childNode.key} className="position-relative grid-item">
                  <div
                    className="thumbnail"
                    onClick={() => setCurrentPath(childNode.key)}
                  >
                    <span className="icon">{icon}</span>
                    {childNode.name}
                  </div>
                  <Popover
                    className="delete-popover"
                    content={
                      <div>
                        You are about to delete this {childNode.type}, are you sure?
                        <Button
                          className="danger mx"
                          onClick={(e) => handleDelete(childNode.key, e)}
                        >
                          Yes
                        </Button>
                      </div>
                    }
                    trigger={<Button className="delete-button">X</Button>}
                  />
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
};

export default DetailView;
