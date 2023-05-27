import { useContext, useEffect } from 'react';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';

const useCreateS3Folder = () => {
  const client = useS3Client();
  const { credentials } = useContext(CredentialsContext);

  const createFolder = async (folderKey: string) => {
    if (folderKey) {
        await client?.send(
          new PutObjectCommand({
            Bucket: credentials.bucketName,
            Key: folderKey
          })
        );
    }
  };

  return { createFolder }
};

export default useCreateS3Folder;
