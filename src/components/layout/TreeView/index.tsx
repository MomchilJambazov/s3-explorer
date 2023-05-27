import React from 'react';
import { TreeNode } from '@/types'
import TreeNodeComponent from './TreeNode';
import './styles.css';

interface TreeViewProps {
  tree: TreeNode;
}

const TreeView: React.FC<TreeViewProps> = ({ tree }) => (
    <div className="tree-view card">
        <ul>
            {Object.values(tree.children || {}).map(childNode => (
            <TreeNodeComponent key={childNode.name} node={childNode} />
            ))}
        </ul>
    </div>
);

export default TreeView;
