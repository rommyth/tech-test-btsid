import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';
import TestTwo from './Detail/Detail';
import MoreDetail from './MoreDetail/MoreDetail';

function App() {
  const token = localStorage.getItem('access_token');

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: (
        <ProtectedUser>
          <Outlet />
        </ProtectedUser>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/detail/:id',
          element: <TestTwo />,
        },
        {
          path: '/detail/:id/item/:itemId',
          element: <MoreDetail />,
        },
      ],
    },
  ]);

  function ProtectedUser({ children }) {
    if (!token) {
      return <Navigate to={'/login'} />;
    }
    return children;
  }

  return <RouterProvider router={router} />;
}

export default App;
