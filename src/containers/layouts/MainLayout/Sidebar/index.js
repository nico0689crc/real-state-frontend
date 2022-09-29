import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import LogoSection from "../LogoSection";
import MenuList from "./MenuList";

import { drawerWidth } from 'constants/ui';

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const container = window !== undefined ? () => window.document.body : undefined;

  const sidebarMobile = (
    <Drawer
      container={container}
      variant={matchUpMd ? 'persistent' : 'temporary'}
      anchor="left"
      open={drawerOpen}
      onClose={drawerToggle}
      ModalProps={{ keepMounted: true }}
      color="inherit"
      sx={{width: '100%', height: '100%', position: 'relative'}}
    >
      <LogoSection />
      <Box sx={{ px: 2 }}>
        <MenuList />
      </Box>
    </Drawer>
  );


  const sidebarDesktop = (
    <Box sx={{backgroundColor: theme.palette.background.paper, height: '100%'}}>
      <PerfectScrollbar component="div">
        <MenuList />
      </PerfectScrollbar>
    </Box>
  );

  return matchUpMd ? sidebarDesktop : sidebarMobile;
}

export default Sidebar