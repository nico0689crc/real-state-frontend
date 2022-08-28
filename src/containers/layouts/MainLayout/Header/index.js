import { Box } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';
import LogoSection from '../LogoSection';
import ProfileSection from '../Header/ProfileSection';
import { drawerWidth } from 'constants/ui'
import CallToActionButton from 'components/custom/Button/CallToAction/CallToActionButton';

const Header = ({ handleLeftDrawerToggle }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }} >
        <Box sx={{ display: 'flex', alignItems: 'center', width: `${(drawerWidth - 25)}px` }} >
          <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
            <LogoSection />
          </Box>
          <CallToActionButton
            onClickHandler={handleLeftDrawerToggle}
            icon={<IconMenu2 stroke={1.5} size="1.3rem" />}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <ProfileSection />
      </Box>
    </>
  );
};

export default Header;
