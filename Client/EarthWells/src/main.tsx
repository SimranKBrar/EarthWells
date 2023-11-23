import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginForm from './Login.tsx';
import PostDetails from './PostDetails.tsx';
import RegistrationForm from './SignUp.tsx';
import Materials from './materialList.tsx';
import MaterialDetail from './materialDetail.tsx';
import Header from './Header.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/app",
    element: <App/>,
  },
  {
    path: "/posts/:postId",
    element: <PostDetails/>,
  },
  {
    path: "/signup",
    element: <RegistrationForm/>,
  },
  {
  path: "/mat",
  element: <Materials/>,
},
{
  path: "/materials/:materialId",
  element: <MaterialDetail/>,
},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>,
)