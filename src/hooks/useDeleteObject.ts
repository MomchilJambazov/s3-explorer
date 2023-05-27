import { useContext, useState } from 'react';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';

const useDeleteS3Object = () => {
  const client = useS3Client();
  const { credentials } = useContext(CredentialsContext);
  const [error, setError] = useState<null | Error>(null);

  const deleteObject = async (objectKey: string) => {
    try {
      await client.send(
        new DeleteObjectCommand({
          Bucket: credentials.bucketName,
          Key: objectKey
        })
      );
    } catch (e) {
      console.error('Error deleting S3 object:', error);
      setError(e as Error);
    }
  };

  const errorCleanup = () => setError(null);

  return { deleteObject, error, errorCleanup };
};

export default useDeleteS3Object;
