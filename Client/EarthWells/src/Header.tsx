import React from "react";
import { Link, To } from "react-router-dom";
import './css/Header.css';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

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
          <button onClick={() => handleButtonClick('/home')}>Home</button>
          <button onClick={() => handleButtonClick('/materialsList')}>Materials</button>
          <button onClick={() => handleButtonClick('/AddTag')}>Add a Tag</button>
          <button onClick={() => handleButtonClick('/Addmateril')}>Add a Material</button>
          <button onClick={() => handleButtonClick('/sort')}>Sort</button>
          <button onClick={() => handleButtonClick('/profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;