import { useState } from 'react';
import useCreateS3File from '@/hooks/useCreateFile';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from "@/components/ui/Toast";
import { ToastType } from '@/types'

interface CreateFileFormProps {
    dir: string | null;
    refetch: () => void;
}

const UploadFileForm: React.FC<CreateFileFormProps> = ({ dir, refetch }) => {
    const [fileName, setFileName] = useState('');
    const [fileBody, setFileBody] = useState('');
    const [toast, setToast] = useState<ToastType | null>(null);
    const { createS3File, isLoading, error } = useCreateS3File();

    const toastCleanup = () => setToast(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9_-]/g, '');
        setFileName(sanitizedValue)
    }

    const handleFileUpload = async () => {
        const fileKey = `${dir ? dir : ''}${fileName}.txt`;
        try {
            const response = await createS3File(fileKey, fileBody);

            if (response.success) {
                setFileName('');
                setFileBody('');
                setToast({
                    message: 'File upload successful!',
                    type: 'success',
                });
                refetch();
            } else {
                setToast({
                    message: `File upload failed: ${response.error}`,
                    type: 'danger',
                });
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setToast({
                message: 'An error occurred during file upload.',
                type: 'danger',
            });
        }
    };

    return (
        <>
            {toast && <Toast {...toast} callback={toastCleanup} />}
            <div className='create-file-wrapper'>
                <Input
                    type="text"
                    value={fileName}
                    onChange={handleChange}
                    placeholder="Enter file name"
                />
                <textarea
                    className='input'
                    value={fileBody}
                    onChange={(e) => setFileBody(e.target.value)}
                    placeholder="Enter file content"
                />
                <Button className='success' onClick={handleFileUpload} disabled={isLoading || !fileBody || !fileName}>
                    {isLoading ? 'Uploading...' : 'Upload File'}
                </Button>
            </div>
        </>
    );
};

export default UploadFileForm;
