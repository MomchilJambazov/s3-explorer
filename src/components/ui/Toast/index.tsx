import React, { useEffect, useState } from 'react';
import './styles.css';

interface ToastProps {
  type: 'success' | 'warning' | 'danger';
  message: string;
  callback: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, callback }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      callback();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return visible ? (
    <div className={`toast ${type}`}>
      <span>{message}</span>
    </div>
  ) : null;
};

export default Toast;
