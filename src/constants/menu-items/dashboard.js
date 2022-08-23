// assets
import { IconHome } from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '',
      icon: IconHome,
      breadcrumbs: false
    },
    {
      id: 'properties',
      title: 'Properties',
      type: 'item',
      url: 'properties',
      icon: IconHome,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
