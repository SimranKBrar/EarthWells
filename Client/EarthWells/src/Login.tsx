import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

type SetTokenFunction = (token: string | null) => void;

function LoginForm({ setToken }: { setToken: SetTokenFunction }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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

      // Store the token in localStorage
      localStorage.setItem('token', receivedToken);
  
      // Set the token in the state (or a global state management solution)
      setToken(receivedToken);
      
      if (response.ok) {
        navigate('/app');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  const handleSignupClick = () => {
    // Navigate to the signup page
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
    </div>
  );
}

export default LoginForm;
