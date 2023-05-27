import { useContext, useState } from 'react';
import { PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import useS3Client from '@/hooks/useS3Client';
import { CredentialsContext } from '@/contexts/CredentialsContext';

type CreateS3FileResponse = {
    success: boolean;
    error: string | null;
};

const useCreateS3File = () => {
    const client = useS3Client();
    const { credentials } = useContext(CredentialsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createS3File = async (fileKey: string, fileBody: string): Promise<CreateS3FileResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const params: PutObjectCommandInput = {
                Bucket: credentials.bucketName,
                ContentEncoding: 'UTF-8',
                Body: fileBody,
                Key: fileKey,
            };

            await client.send(new PutObjectCommand(params));

            return { success: true, error: null };
        } catch (error) {
            console.error('Error creating S3 file:', error);
            setError('An error occurred while creating the S3 file.');
            return { success: false, error: 'An error occurred while creating the S3 file.' };
        } finally {
            setIsLoading(false);
        }
    };

    const errorCleanup = () => setError(null)

    return { createS3File, isLoading, error, errorCleanup };
};

export default useCreateS3File;
