import React, { useState } from 'react';
import { TreeNode } from '@/types'

interface TreeNodeProps {
  node: TreeNode;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChild = node.children && Object.keys(node.children).length > 0;
  
  const navigateToFolder = () => {
    alert(node.key)
  }

  const handleClick = (e:any) => {
    if (e.detail === 1) {
      if(!hasChild) {
        navigateToFolder();
      } else {
        setIsOpen(!isOpen);
      }
    }
    if (e.detail === 2) { //handle double click
      navigateToFolder();
    }
  };

  //We need to render only folders
  if (node.type === 'file') {
    return null;
  }

  return (
    <li>
      <div onClick={handleClick}>
        {isOpen ? '📂 ' : '📁 '}
        {node.name}
        {hasChild && <span className='indicator'>{isOpen ? '▼' : '▶'}</span>}
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