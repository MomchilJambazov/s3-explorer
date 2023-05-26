import { useContext } from "react";
import { DeleteObjectCommand, DeleteObjectCommandOutput } from "@aws-sdk/client-s3";
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';
import useApiCall from './useApiCall';

const useDeleteS3Object = (objectKey: string) => {
    const client = useS3Client();
    const { credentials } = useContext(CredentialsContext);

    const apiCall = () => client.send(new DeleteObjectCommand({
        Bucket: credentials.bucketName,
        Key: objectKey
    }));

    return useApiCall<DeleteObjectCommandOutput>(apiCall);
};

export default useDeleteS3Object;
