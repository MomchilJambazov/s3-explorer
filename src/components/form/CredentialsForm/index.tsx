import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '@/contexts/CredentialsContext';
import Button from "@/components/ui/Button"
import './styles.css';


const CredentialsForm: React.FC = () => {
    const { credentials, setCredentials, resetCredentials } = useContext(CredentialsContext);
    const [accessKeyId, setAccessKeyId] = useState(credentials.accessKeyId);
    const [secretAccessKey, setSecretAccessKey] = useState(credentials.secretAccessKey);
    const [bucketName, setBucketName] = useState(credentials.bucketName);
    const [bucketRegion, setBucketRegion] = useState(credentials.bucketRegion);

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCredentials({ accessKeyId, secretAccessKey, bucketName, bucketRegion });
        navigate('/');
    };

    const handleDisconnect = () => {
        resetCredentials();
        setAccessKeyId('');
        setSecretAccessKey('');
        setBucketName('');
        setBucketRegion('');
    }

    const hasValidCredentials = Object.values(credentials).every((e) => !!e);

    return (
        <div className='form-wrapper'>
            <form className='card' onSubmit={handleSubmit}>
                <label>
                    Access Key ID:<br />
                    <input type="text" placeholder="Enter access key" value={accessKeyId} onChange={(e) => setAccessKeyId(e.target.value)} required />
                </label>

                <label>
                    Secret Access Key:<br />
                    <input type="text" placeholder="Enter secret key" value={secretAccessKey} onChange={(e) => setSecretAccessKey(e.target.value)} required />
                </label>

                <label>
                    Bucket Name:<br />
                    <input type="text" placeholder="Enter bucket name" value={bucketName} onChange={(e) => setBucketName(e.target.value)} required />
                </label>

                <label>
                    Bucket Region:<br />
                    <input type="text" placeholder="Enter region" value={bucketRegion} onChange={(e) => setBucketRegion(e.target.value)} required />
                </label>

                <Button className="primary" type="submit">{hasValidCredentials ? "Update" : "Connect"}</Button>
                {hasValidCredentials && <Button type="button" onClick={handleDisconnect}>Disconnect</Button>}
            </form>
        </div>
    );
};

export default CredentialsForm;
