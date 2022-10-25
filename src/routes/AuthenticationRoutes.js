import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MinimalLayout from 'containers/layouts/MinimalLayout';
import Loadable from 'components/ui/Loadable/Loadable';
const Login = Loadable(lazy(() => import('pages/auth/Login/Login')));
const ResetPassword = Loadable(lazy(() => import('pages/auth/ResetPassword/ResetPassword')));
const ResetPasswordEdit = Loadable(lazy(() => import('pages/auth/ResetPasswordEdit/ResetPasswordEdit')));

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
      path: 'password',
      element: <ResetPassword />
    },
    {
      path: 'password/edit',
      element: <ResetPasswordEdit />
    },
  ]
};

export const AuthenticationRoutesNavigate = {
  path: '/',
  element: <Navigate replace to="/auth/signin" />,
};