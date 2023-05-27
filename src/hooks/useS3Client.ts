import { S3Client } from '@aws-sdk/client-s3';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useMemo } from 'react';
import { CredentialsContext } from '@/contexts/CredentialsContext';

const useS3Client = () => {
  const { credentials } = useContext(CredentialsContext);
  const navigate = useNavigate();
  const hasInValidCredentials = Object.values(credentials).some((e) => !e);

  useEffect(() => {
    if(hasInValidCredentials) {
      navigate('/credentials');
    } 
  })

  try {
    const s3Client = useMemo(() => {
      if(hasInValidCredentials) {
        return null;
      }
      return new S3Client({
        region: credentials.bucketRegion,
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
        },
      });
    }, [credentials.bucketRegion, credentials.accessKeyId, credentials.secretAccessKey]);

    return s3Client;
  } catch (error) {
    console.error('Error creating S3 client:', error);
    navigate('/credentials');
    return null;
  }
};

export default useS3Client;
