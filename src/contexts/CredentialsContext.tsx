import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { AwsCredentials } from '@/types';

const initialCredentials: AwsCredentials = {
  accessKeyId: '',
  secretAccessKey: '',
  bucketName: '',
  bucketRegion: ''
};

interface CredentialsContextType {
  credentials: AwsCredentials;
  setCredentials: (data: AwsCredentials) => void;
  resetCredentials: () => void;
}

export const CredentialsContext = React.createContext<CredentialsContextType>({
  credentials: initialCredentials,
  setCredentials: () => {},
  resetCredentials: () => {},
});

type Props = {
    children?: React.ReactNode
};


export const CredentialsProvider: React.FC<Props> = ({ children }) => {
  const [storedCredentials, setStoredCredentials] = useLocalStorage<AwsCredentials>('aws-credentials', initialCredentials);
  const [credentials, setCredentials] = useState<AwsCredentials>(storedCredentials);

  const resetCredentials = () => {
    setCredentials(initialCredentials);
  }

  useEffect(() => {
    setStoredCredentials(credentials)
  }, [credentials]);

  const value: CredentialsContextType = {
    credentials,
    setCredentials,
    resetCredentials,
  };

  return <CredentialsContext.Provider value={value}>{children}</CredentialsContext.Provider>;
};
