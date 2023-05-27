import { useContext, useEffect, useState } from 'react';
import { ListObjectsV2Command, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';

const useS3Objects = () => {
  const client = useS3Client();
  const { credentials } = useContext(CredentialsContext);
  const [data, setData] = useState<ListObjectsV2CommandOutput | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    if (credentials.bucketName) {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await client?.send(
          new ListObjectsV2Command({ Bucket: credentials.bucketName })
        );
        setData(response);
      } catch (error) {
        console.error('Error fetching S3 objects:', error);
        setHasError(true);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [client, credentials.bucketName]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, hasError, refetch };
};

export default useS3Objects;
