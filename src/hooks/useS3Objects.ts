import { useContext } from "react";
import { ListObjectsV2Command, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';
import useApiCall from './useApiCall';

const useS3Objects = () => {
    const client = useS3Client();
    const { credentials } = useContext(CredentialsContext);

    const apiCall = () => client.send(new ListObjectsV2Command({ Bucket: credentials.bucketName }));

    return useApiCall<ListObjectsV2CommandOutput>(apiCall);
};

export default useS3Objects;
