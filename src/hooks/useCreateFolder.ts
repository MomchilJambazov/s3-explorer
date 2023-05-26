import { useContext } from "react";
import { PutObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3";
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';
import useApiCall from './useApiCall';

const useCreateS3Folder = (folderKey: string) => {
    const client = useS3Client();
    const { credentials } = useContext(CredentialsContext);

    const apiCall = () => client.send(new PutObjectCommand({
        Bucket: credentials.bucketName,
        Key: folderKey
    }));

    return useApiCall<PutObjectCommandOutput>(apiCall);
};

export default useCreateS3Folder;
