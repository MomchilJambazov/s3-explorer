import React, { useState } from 'react';
import { TreeNode } from '@/types'

interface TreeNodeProps {
  node: TreeNode;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChild = node.children && Object.keys(node.children).length > 0;
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  //We need to render only folders
  if (node.type === 'file') {
    return null;
  }

  return (
    <li>
      <div onClick={handleToggle}>
        {node.name}
        {hasChild && (isOpen ? ' -' : ' +')}
      </div>
      {isOpen && hasChild && node.children && (
        <ul>
          {Object.values(node.children).map(childNode => (
            <TreeNodeComponent key={childNode.name} node={childNode} />
          ))}
        </ul>
      )}
    </li>
  );
};


export default TreeNodeComponent;