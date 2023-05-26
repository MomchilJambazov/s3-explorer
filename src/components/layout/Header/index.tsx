import React from 'react';
import { Outlet, Link } from "react-router-dom";
import logo from './s3-logo.png';

import './styles.css';

const Header: React.FC = () => (
    <header className="app-header">
      <Link to="/" className="app-logo">
        <img src={logo} alt="logo" />
        <span className="app-name">
          S3 File Explorer
        </span>
      </Link>
      <Link to="/credentials">AWS Credentials</Link>
    </header>
);

export default Header;
