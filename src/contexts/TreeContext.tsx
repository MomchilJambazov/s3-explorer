import React, { useState } from 'react';
import { TreeNode } from '@/types'

interface TreeContextType {
  treeData: TreeNode | null;
  setTreeData: (data: TreeNode | null) => void;
  selectedItem: string | null;
  setSelectedItem: (item: string | null) => void;
  currentPath: string | null;
  setCurrentPath: (item: string | null) => void;
}

export const TreeContext = React.createContext<TreeContextType>({
  treeData: null,
  setTreeData: () => {},
  selectedItem: null,
  setSelectedItem: () => {},
  currentPath: null,
  setCurrentPath: () => {},
});

type Props = {
    children?: React.ReactNode
};

export const TreeProvider: React.FC<Props> = ({ children }) => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  const value: TreeContextType = {
    treeData,
    setTreeData,
    selectedItem,
    setSelectedItem,
    currentPath,
    setCurrentPath,
  };

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};
