import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useCreateFolder from '@/hooks/useCreateFolder';

interface CreateFolderFormProps {
    dir: string | null;
    refetch: () => void;
}

const CreateFolderForm: React.FC<CreateFolderFormProps> = ({ dir, refetch }) => {
    const [folderName, setFolderName] = useState('');
    const [objectPath, setPath] = useState('');

    const handleUpdate = () => {
        setPath('');
        refetch();
    }

    useCreateFolder(objectPath, handleUpdate);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (folderName.trim() !== '') {
            setPath(`${dir || ''}${folderName.trim()}/`);
            setFolderName('');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/[^a-zA-Z_-]/g, '');
        setFolderName(sanitizedValue)
    }

    return (
        <form onSubmit={handleSubmit} style={{display:'flex', gap: '6px'}}>
            <Input
                type="text"
                placeholder="Enter folder name"
                value={folderName}
                onChange={handleChange}
            />
            <Button className='success' type="submit" disabled={!folderName}>Create</Button>
        </form>
    );
};

export default CreateFolderForm;