import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginForm.css';
import { jwtDecode } from 'jwt-decode';
import earthImage from '/src/drop.png';

interface TokenType {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  userLocation: string;
}
type SetTokenFunction = (token: TokenType | null) => void;

function LoginForm({ handleLogin }: { handleLogin: SetTokenFunction }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const receivedToken = data.token;

      if (response.ok) {
        const decodedToken = jwtDecode(receivedToken) as TokenType;
        console.log(decodedToken);
        handleLogin(decodedToken);
        navigate('/home');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="site-title">Earth Wells</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <button onClick={handleSignupClick} className="signup-button">
          Signup
        </button>
      </div>
      <div className="image-container">
        <img src={earthImage} alt="Earth Image" className="earth-image" />
      </div>
    </div>
  );
}

export default LoginForm;
