import { useContext } from "react";
import { TreeNode } from "@/types";
import { TreeContext } from "@/contexts/TreeContext";
import { findNodeByKey } from "@/utils/findTreeNode";
import useDeleteObject from "@/hooks/useDeleteObject";
import Breadcrumbs from "./Breadcrumbs";
import Button from "@/components/ui/Button";
import Popover from "@/components/ui/Popover";
import Toast from "@/components/ui/Toast";
import "./styles.css";

interface TreeViewProps {
  tree: TreeNode;
  currentDir: string | null;
  keyCount: number;
  maxKeys: number;
  refetch: () => void;
}

const DetailView: React.FC<TreeViewProps> = ({ tree, currentDir, refetch, keyCount, maxKeys }) => {
  const currentNode = findNodeByKey(tree, currentDir);
  const isFolder = currentNode?.type === "folder";
  const isKeyLimitReached = keyCount >= maxKeys;
  const currentDirObjects = Object.values(currentNode?.children || {});
  const { setCurrentDir } = useContext(TreeContext);
  const { deleteObject, error, errorCleanup } = useDeleteObject();

  const handleDelete = (key: string, event?: React.MouseEvent) => {
    event?.stopPropagation();
    deleteObject(key);
  };

  return (
    <div>
      {error && <Toast message={`Error deleting S3 object: ${error?.message}`} type="danger" callback={errorCleanup} />}
      <Breadcrumbs
        currentDir={currentDir}
        refetch={refetch}
        showCreateOptions={isFolder && !isKeyLimitReached}
      />
      {!!currentDir && !currentDirObjects.length && isFolder ? (
        <div className="card">
          <p style={{ textAlign: "center", width: "100%" }}>Folder is empty</p>
        </div>
      ) : (
        <div className="detail-view card">
          {currentDirObjects.map((childNode) => {
            const icon = childNode?.type === "folder" ? "📁" : "📄";
            return (
              <div className="position-relative grid-item">
                <div
                  className="thumbnail"
                  onClick={() => setCurrentDir(childNode.key)}
                  key={childNode.key}
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
