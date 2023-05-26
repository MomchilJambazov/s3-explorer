import { S3Client } from "@aws-sdk/client-s3";
import { useContext } from 'react';
import { CredentialsContext } from '@/contexts/CredentialsContext';

const useS3Client = () => {
  const { credentials } = useContext(CredentialsContext);

  const client = new S3Client({
    region: credentials.bucketRegion,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey
    }
  });

  return client;
};

export default useS3Client;
