// assets
import { IconBuildingWarehouse, IconDashboard } from '@tabler/icons';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'MENU',
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
      title: 'My Properties',
      type: 'collapse',
      icon: IconBuildingWarehouse,
      children: [
        {
          id: 'properties_list',
          title: 'Property List',
          type: 'item',
          url: 'properties',
          icon: KeyboardDoubleArrowRightIcon,
          breadcrumbs: false
        },
        {
          id: 'properties_new',
          title: 'Add Property',
          type: 'item',
          url: 'properties/create',
          icon: KeyboardDoubleArrowRightIcon,
          breadcrumbs: false
        },
      ]
    }
  ]
};

export default dashboard;
