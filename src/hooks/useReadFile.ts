import { useContext } from 'react';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';

const useReadS3File = () => {
  const client = useS3Client();
  const { credentials } = useContext(CredentialsContext);

  const readFile = async (fileKey: string) => {
    try {
      const response = await client?.send(new GetObjectCommand({
        Bucket: credentials.bucketName,
        Key: fileKey,
      }));
      return response
    } catch (error) {
      console.error('Error reading S3 file:', error);
    }
  };

  return { readFile };
};

export default useReadS3File;
