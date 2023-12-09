import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './RegistrationForm.css';
import './Signup.css';
import earthImage from '/src/drop.png'; 

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    location:'',
  });
  const [error, setError] = useState<null | string>(null); 
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registration successful. You can now log in.');
        setError(null);
        // Optionally, you can navigate to the login page automatically or let the user click a button
      } else {
        setError(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('An error occurred', error);
      setError('Server error. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleLoginClick = () => {
    // Navigate to the login page
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className ="signupbox">
      <h1 className="site-title">Sign-Up</h1>
    <form onSubmit={handleSubmit} className="SignupForm">
      <input
        type="text"
        id="username"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />

      <input
        type="text"
        id="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />

     <input
        type="text"
        id="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />

     <input
        type="text"
        id="location"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />

      <input
        type="password"
        id="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <input
        type="password"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />

<button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
          <button onClick={handleLoginClick}>Back to Login</button>
        </div>
      )}
      </div>
      <div className="image-container">
        <img src={earthImage} alt="Earth Image" className="earth-image" />
      </div>
</div>

  );
}

export default RegistrationForm;
