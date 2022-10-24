// assets
import { IconBuildingWarehouse, IconHome } from '@tabler/icons';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

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
      roles: ["super_administrator", "administrator"]
    },
    {
      id: 'properties',
      title: 'properties.index.title',
      type: 'item',
      url: 'properties',
      icon: IconBuildingWarehouse,
      breadcrumbs: false,
      roles: ["super_administrator", "administrator"]
    },
    {
      id: 'users',
      title: 'users.index.title',
      type: 'item',
      url: 'users',
      icon: PeopleAltIcon,
      breadcrumbs: false,
      roles: ["super_administrator"]
    }
  ]
};

export default dashboard;
