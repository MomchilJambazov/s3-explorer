export interface TreeNode {
  key: string;
  name: string;
  type: 'folder' | 'file';
  lastModified?: string;
  size?: number;
  children?: Record<string, TreeNode>;
}

export interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  bucketRegion: string;
}