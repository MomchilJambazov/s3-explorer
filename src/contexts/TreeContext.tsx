import React, { useState } from 'react';
import { TreeNode } from '@/types'

interface TreeContextType {
  treeData: TreeNode | null;
  setTreeData: (data: TreeNode | null) => void;
  selectedItem: string | null;
  setSelectedItem: (item: string | null) => void;
  currentDir: string | null;
  setCurrentDir: (item: string | null) => void;
}

export const TreeContext = React.createContext<TreeContextType>({
  treeData: null,
  setTreeData: () => {},
  selectedItem: null,
  setSelectedItem: () => {},
  currentDir: null,
  setCurrentDir: () => {},
});

type Props = {
    children?: React.ReactNode
};

export const TreeProvider: React.FC<Props> = ({ children }) => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentDir, setCurrentDir] = useState<string | null>(null);

  const value: TreeContextType = {
    treeData,
    setTreeData,
    selectedItem,
    setSelectedItem,
    currentDir,
    setCurrentDir,
  };

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};
