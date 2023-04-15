import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src="logo.png" alt="Logo" />
      </Link>
      <div className="nav-links">
        <Link to="/add">Add</Link>
        <Link to="/view">View</Link>
      </div>
    </div>
  );
}

export default Header;
