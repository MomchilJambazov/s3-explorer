import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import './styles.css';

interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  bucketRegion: string;
}

const initialCredentials: AwsCredentials = {
  accessKeyId: '',
  secretAccessKey: '',
  bucketName: '',
  bucketRegion: ''
};

const CredentialsForm: React.FC = () => {
  const [storedCredentials, setStoredCredentials] = useLocalStorage<AwsCredentials>('aws-credentials', initialCredentials);
  const [accessKeyId, setAccessKeyId] = useState(storedCredentials.accessKeyId);
  const [secretAccessKey, setSecretAccessKey] = useState(storedCredentials.secretAccessKey);
  const [bucketName, setBucketName] = useState(storedCredentials.bucketName);
  const [bucketRegion, setBucketRegion] = useState(storedCredentials.bucketRegion);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredCredentials({ accessKeyId, secretAccessKey, bucketName, bucketRegion });

    //TODO: test the credentials before redirecting 
    navigate('/');
  };

  const handleDisconnect = () => {
    setStoredCredentials(initialCredentials);
    setAccessKeyId('');
    setSecretAccessKey('');
    setBucketName('');
    setBucketRegion('');
  }

  const hasValue = !!(storedCredentials.accessKeyId || storedCredentials.secretAccessKey || storedCredentials.bucketName || storedCredentials.bucketRegion);

  return (
    <div className='form-wrapper'>
        <form onSubmit={handleSubmit}>
        <label>
            Access Key ID:<br />
            <input type="text" value={accessKeyId} onChange={(e) => setAccessKeyId(e.target.value)} required />
        </label>

        <label>
            Secret Access Key:<br />
            <input type="text" value={secretAccessKey} onChange={(e) => setSecretAccessKey(e.target.value)} required />
        </label>

        <label>
            Bucket Name:<br />
            <input type="text" value={bucketName} onChange={(e) => setBucketName(e.target.value)} required />
        </label>

        <label>
            Bucket Region:<br />
            <input type="text" value={bucketRegion} onChange={(e) => setBucketRegion(e.target.value)} required />
        </label>

        <button type="submit">{hasValue ? "Update" : "Connect"}</button>
        {hasValue && <button type="button" onClick={handleDisconnect}>Disconnect</button>}
        </form>
    </div>
  );
};

export default CredentialsForm;
