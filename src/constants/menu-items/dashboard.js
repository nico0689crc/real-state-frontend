// assets
import { IconBuildingWarehouse, IconDashboard } from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '',
      icon: IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'properties',
      title: 'Properties',
      type: 'item',
      url: 'properties',
      icon: IconBuildingWarehouse,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
