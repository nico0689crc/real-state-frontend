import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'containers/layouts/MainLayout';
import Loadable from 'components/ui/Loadable/Loadable'
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));
const PropertiesList = Loadable(lazy(() => import('pages/properties/index/PropertyList')));
const PropertiesCreate = Loadable(lazy(() => import('pages/properties/create/PropertiesCreate')));
const PropertiesEdit = Loadable(lazy(() => import('pages/properties/edit/PropertiesEdit')));
const UsersList = Loadable(lazy(() => import('pages/users/index/UsersList')));
const UserProfile = Loadable(lazy(() => import('pages/users/profile/UserProfile')));
const RealEstateList = Loadable(lazy(() => import('pages/real_estates/index/RealEstatesList')));
const RealEstatesShow = Loadable(lazy(() => import('pages/real_estates/show/RealEstatesShow')));
const RealEstateCreate = Loadable(lazy(() => import('pages/real_estates/create/RealEstateCreate')));
const RealEstateEdit = Loadable(lazy(() => import('pages/real_estates/edit/RealEstateEdit')));


// ==============================|| MAIN ROUTING ||============================== //

export const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/', element: <Dashboard /> },
    { path: '/users', element: <UsersList /> },
    { path: '/users/profile', element: <UserProfile /> },
    { path: '/properties', element: <PropertiesList /> },
    { path: '/properties/create', element: <PropertiesCreate /> },
    { path: '/properties/:id', element: <PropertiesEdit /> },
    { path: '/real_estates', element: <RealEstateList /> },
    { path: '/real_estates/create', element: <RealEstateCreate /> },
    { path: '/real_estates/:id', element: <RealEstatesShow /> },
    { path: '/real_estates/:id/edit', element: <RealEstateEdit /> }
  ]
};

export const MainRoutesNavigate = {
  path: '/auth/signin',
  element: <Navigate replace to="/" />,
};
