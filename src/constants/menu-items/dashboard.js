// assets
import { IconBuildingWarehouse, IconDashboard, IconCirclePlus } from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'MENU',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard Arg',
      type: 'item',
      url: '',
      icon: IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'properties',
      title: 'Properties',
      type: 'collapse',
      icon: IconBuildingWarehouse,
      children: [
        {
          id: 'properties_list',
          title: 'Properties List',
          type: 'item',
          url: 'properties',
          icon: IconBuildingWarehouse,
          breadcrumbs: false
        },
        {
          id: 'properties_new',
          title: 'New Property',
          type: 'item',
          url: 'properties/create',
          icon: IconCirclePlus,
          breadcrumbs: false
        },
      ]
    }
  ]
};

export default dashboard;
