import { useContext, useEffect } from 'react';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';

const useCreateS3Folder = (folderKey: string, callback: () => void) => {
  const client = useS3Client();
  const { credentials } = useContext(CredentialsContext);


  useEffect(() => {
    const createFolder = async () => {
      if (folderKey && credentials.bucketName) {
        try {
          await client.send(
            new PutObjectCommand({
              Bucket: credentials.bucketName,
              Key: folderKey
            })
          );
          console.log('Folder created successfully!');
        } catch (error) {
          console.error('Error creating folder:', error);
        } finally {
            callback();
        }
      }
    };

    createFolder();
  }, [client, folderKey, credentials.bucketName]);
};

export default useCreateS3Folder;
