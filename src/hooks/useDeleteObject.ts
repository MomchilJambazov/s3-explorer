import { useContext } from 'react';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';

const useDeleteS3Object = () => {
  const client = useS3Client();
  const { credentials } = useContext(CredentialsContext);

  const deleteObject = async (objectKey: string) => {
    try {
      await client.send(
        new DeleteObjectCommand({
          Bucket: credentials.bucketName,
          Key: objectKey
        })
      );
    } catch (error) {
      console.error('Error deleting S3 object:', error);
      // Handle error if needed
    }
  };

  return deleteObject;
};

export default useDeleteS3Object;
