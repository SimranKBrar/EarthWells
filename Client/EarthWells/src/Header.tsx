import React from "react";
import { Link, To } from "react-router-dom";
import './header.css';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear authentication tokens, reset user state, etc.
    console.log("Logout clicked");
  };
  const navigate = useNavigate();

  const handleButtonClick = (path: To) => {
    navigate(path);
  };
  return (
    <header>
    <nav className="nav">
      <div className="Logo">
        <h1 className="site-logo">Earth Wells</h1>
      </div>
      <div className="topBar">
        <button onClick={() => handleButtonClick('/app')}>Home</button>
        <button onClick={() => handleButtonClick('/posts')}>Posts</button>
        <button onClick={() => handleButtonClick('/mat')}>Materials</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  </header>
  );
};

export default Header;