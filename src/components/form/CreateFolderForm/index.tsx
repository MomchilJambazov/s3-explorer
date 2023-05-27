import React, { useState } from 'react';
import useCreateFolder from '@/hooks/useCreateFolder';

interface CreateFolderFormProps {
    dir: string | null;
    refetch: () => void;
}

const CreateFolderForm: React.FC<CreateFolderFormProps> = ({ dir, refetch }) => {
    const [folderName, setFolderName] = useState('');
    const [objectPath, setPath] = useState('');

    useCreateFolder(objectPath, () => {setPath(''); refetch();});

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (folderName.trim() !== '') {
            setPath(`${dir || ''}${folderName.trim()}/`);
            setFolderName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter folder name"
                value={folderName}
                onChange={(event) => setFolderName(event.target.value)}
            />
            <button type="submit">Create</button>
            {/* <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Folder'}
      </button>
      {error && <p className="error-message">Error: {error.message}</p>} */}
        </form>
    );
};

export default CreateFolderForm;