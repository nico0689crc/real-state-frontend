// assets
import { IconBuildingWarehouse, IconHome } from '@tabler/icons';
import { PeopleAlt, Store } from '@mui/icons-material';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'MENU',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'home.index.title',
      type: 'item',
      url: '',
      icon: IconHome,
      breadcrumbs: false,
      roles: ["super_administrator", "administrator", "real_estate_administrator", "agent"]
    },
    {
      id: 'properties',
      title: 'properties.index.title',
      type: 'item',
      url: 'properties',
      icon: IconBuildingWarehouse,
      breadcrumbs: false,
      roles: ["super_administrator", "administrator", "real_estate_administrator", "agent"]
    },
    {
      id: 'real_estates',
      title: 'real_estates.index.title',
      type: 'item',
      url: 'real_estates',
      icon: Store,
      breadcrumbs: false,
      roles: ["super_administrator", "administrator"]
    },
    {
      id: 'users',
      title: 'users.index.title',
      type: 'item',
      url: 'users',
      icon: PeopleAlt,
      breadcrumbs: false,
      roles: ["super_administrator", "real_estate_administrator"]
    }
  ]
};

export default dashboard;
