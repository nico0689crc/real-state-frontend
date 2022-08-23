import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MinimalLayout from '../containers/layouts/MinimalLayout';
import Loadable from '../components/ui/Loadable/Loadable';
const Login = Loadable(lazy(() => import('../pages/auth/Login/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

export const AuthenticationRoutes = {
  path: '/auth',
  element: <MinimalLayout />,
  children: [
    {
      path: '',
      element: <Login />
    },
    {
      path: 'signin',
      element: <Login />
    },
    {
      path: 'signup',
      element: <Register />
    },
  ]
};

export const AuthenticationRoutesNavigate = {
  path: '/',
  element: <Navigate replace to="/auth/signin" />,
};