import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home.tsx';
import LoginForm from './Login.tsx';
import PostDetails from './PostDetails.tsx';
import RegistrationForm from './SignUp.tsx';
import Materials from './materialList.tsx';
import MaterialDetail from './materialDetail.tsx';
import Header from './Header.tsx';
import PostsByDropdowns from './PostsByDropdowns.tsx';
import PostFilterPage from './PostsByDropdowns.tsx';
import AddMaterialForm from './materialform.tsx';
import TagForm from './tagform.tsx';
import MaterialsList from './materialsPage.tsx';

interface TokenType {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  userLocation: string;
  // Add other properties if needed
}

const App = () => {
  const [token, setToken] = useState<TokenType | null>(null);

  useEffect(() => {
    // Check if a token is stored in localStorage on mount
    const storedToken = localStorage.getItem('token');
    console.log('Stored Token:', storedToken);
    
    try {
      if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        console.log('Parsed Token:', parsedToken);
        setToken(parsedToken);
      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }
  }, []);

  const handleLogin = (newToken: TokenType | null) => {
    console.log(newToken);
    // Save the new token to state and localStorage
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', JSON.stringify(newToken));
    } else {
      localStorage.removeItem('token');
    }
  };

  const handleLogout = () => {
    // Remove the token from state and localStorage
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginForm handleLogin={handleLogin} />}
          
        />
        <Route
          path="/home"
          element={<Home token={token} handleLogout={handleLogout} />}
        />
                <Route
          path="/posts/:postId"
          element={<PostDetails token={token} />}
        />
                        <Route
          path="/signup"
          element={<RegistrationForm  />}
        />
                        <Route
          path="/mat"
          element={<Materials  token={token} />}
        />
                              <Route
          path="/materialsList"
          element={<MaterialsList  token={token} />}
        />
        PostsByDropdowns
         <Route
          path="/materials/:materialId"
          element={<MaterialDetail  token={token}/>}
        />
        <Route
          path="/PostsByDropdowns"
          element={<PostFilterPage />}
        />
        
        <Route
          path="/Addmateril"
          element={<AddMaterialForm />}
        />
                <Route
          path="/AddTag"
          element={<TagForm/>}
        />
                    <Route
          path="/Sort"
          element={<PostFilterPage token = {token}/>}
        />
    </Routes>
    </Router>
  );
};

export default App;

