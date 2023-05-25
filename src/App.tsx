import React from 'react';
import logo from './s3-logo.png';
import TreeView from '@/components/layout/TreeView';
import DetailView from '@/components/layout/DetailView';
import './App.css';

function App() {
  return (
    <>
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p className="app-name">
          S3 File Explorer
        </p>
      </header>
      <div>
        <TreeView />
        <DetailView />
      </div>
    </>
  );
}

export default App;
