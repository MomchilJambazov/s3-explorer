import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useCreateFolder from '@/hooks/useCreateFolder';
import Toast from "@/components/ui/Toast";
import { ToastType } from '@/types'

interface CreateFolderFormProps {
    dir: string | null;
    refetch: () => void;
}

const CreateFolderForm: React.FC<CreateFolderFormProps> = ({ dir, refetch }) => {
    const [folderName, setFolderName] = useState('');
    const { createFolder } = useCreateFolder();
    const [toast, setToast] = useState<ToastType | null>(null);
    const toastCleanup = () => setToast(null)

    const handleSubmit = async () => {
        try {
            await createFolder(`${dir || ''}${folderName.trim()}/`)
            setToast({
                message: 'Folder created successfully!',
                type: 'success',
            });
            refetch();
        } catch (error) {
            setToast({
                message: `Error creating folder: ${error}`,
                type: 'danger',
            });
        } finally {
            setFolderName('');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9_-]/g, '');
        setFolderName(sanitizedValue)
    }

    return (
        <>
            {toast && <Toast {...toast} callback={toastCleanup} />}
            <div style={{ display: 'flex', gap: '6px' }}>
                <Input
                    type="text"
                    placeholder="Enter folder name"
                    value={folderName}
                    onChange={handleChange}
                />
                <Button className='success' onClick={handleSubmit} disabled={!folderName}>Create</Button>
            </div>
        </>
    );
};

export default CreateFolderForm;