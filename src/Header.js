import React from 'react';
import logoImage from './bankse_in_logo.jpeg';
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
      <div className="header-right">
        <button className="login-button">Login</button>
      </div>
    </header>
  );
};

export default Header;
