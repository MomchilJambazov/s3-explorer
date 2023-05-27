import React, { useState, useContext, useEffect } from 'react';
import { TreeContext } from '@/contexts/TreeContext';
import { TreeNode } from '@/types'

interface TreeNodeProps {
  node: TreeNode;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChild = node.children && Object.keys(node.children).length > 0;
  const { selectedItem, setSelectedItem, currentDir, setCurrentDir } = useContext(TreeContext);
  const isSelected = selectedItem === node.key;
  const isCurrentDir = currentDir === node.key;

  const handleExpand = () => setIsOpen(!isOpen);

  const handleClick = (e: React.MouseEvent) => {
    if (e.detail === 1) {
      setSelectedItem(node.key)
      if (isSelected) {
        handleExpand();
      }
    }
    if (e.detail === 2) { //handle double click
      setCurrentDir(node.key);
    }
  };

  useEffect(() => {
    setSelectedItem(null)
  }, [currentDir]);

  //We need to render only folders
  if (node.type === 'file') {
    return null;
  }

  const folderIcon = (isOpen || isCurrentDir) ? '📂 ' : '📁 ';
  const activeClass = isCurrentDir ? 'current' : isSelected ? 'selected' : '';

  return (
    <li className={activeClass}>
      <div onClick={handleClick}>
        {folderIcon}
        {node.name}
        {hasChild && <span onClick={handleExpand} className='indicator'>{isOpen ? '▼' : '▶'}</span>}
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