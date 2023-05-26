import React, { useState } from 'react';
import { TreeNode } from '@/types'

interface TreeContextType {
  treeData: TreeNode | null;
  setTreeData: (data: TreeNode | null) => void;
}

export const TreeContext = React.createContext<TreeContextType>({
  treeData: null,
  setTreeData: () => {},
});

type Props = {
    children?: React.ReactNode
};

export const TreeProvider: React.FC<Props> = ({ children }) => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);

  const value: TreeContextType = {
    treeData,
    setTreeData,
  };

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};
