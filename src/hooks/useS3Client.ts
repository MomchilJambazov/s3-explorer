import { S3Client } from '@aws-sdk/client-s3';
import { useContext, useMemo } from 'react';
import { CredentialsContext } from '@/contexts/CredentialsContext';

const useS3Client = () => {
  const { credentials } = useContext(CredentialsContext);

  const s3Client = useMemo(() => {
    return new S3Client({
      region: credentials.bucketRegion,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
    });
  }, [credentials.bucketRegion, credentials.accessKeyId, credentials.secretAccessKey]);

  return s3Client;
};

export default useS3Client;
