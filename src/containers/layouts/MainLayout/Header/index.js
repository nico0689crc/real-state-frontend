import { Box, useMediaQuery } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import { sidebarWidthOpened,containerPaddingX, containerPaddingSmX, headerPaddingY } from 'constants/ui';
import AppIconButton from "components/ui/Buttons/AppIconButton/AppIconButton";
import LogoSection from '../LogoSection';
import ProfileSection from '../Header/ProfileSection';

const Header = ({ handleLeftSidebarToggle }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingY: headerPaddingY }} >
      <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: matchUpMd ? containerPaddingX : containerPaddingSmX, width: matchUpMd ? sidebarWidthOpened : 'auto'}} >
        <LogoSection sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}/>
        <AppIconButton onClick={handleLeftSidebarToggle}><IconMenu2 stroke={1.5} size="1.3rem" /></AppIconButton>
      </Box>
      <Box sx={{ paddingRight: matchUpMd ? containerPaddingX : containerPaddingSmX }}>
        <ProfileSection />
      </Box>
    </Box>
  );
};

export default Header;
