import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'containers/layouts/MainLayout';
import Loadable from 'components/ui/Loadable/Loadable';
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));
const PropertiesList = Loadable(lazy(() => import('pages/properties/index/PropertiesList')));
const PropertiesCreate = Loadable(lazy(() => import('pages/properties/create/PropertiesCreate')));

// ==============================|| MAIN ROUTING ||============================== //

export const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/', element: <Dashboard /> },
    { path: '/properties', element: <PropertiesList /> },
    { path: '/properties/create', element: <PropertiesCreate /> }
  ]
};

export const MainRoutesNavigate = {
  path: '/auth/signin',
  element: <Navigate replace to="/" />,
};
