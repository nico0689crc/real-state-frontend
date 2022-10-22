import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery, Stack } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LogoSection from "../LogoSection";
import MenuList from "./MenuList";

const Sidebar = ({ sidebarOpened, onSidebarToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const container = window !== undefined ? () => window.document.body : undefined;

  const sidebarMobile = (
    <Drawer
      container={container}
      variant="temporary"
      anchor="left"
      open={sidebarOpened}
      onClose={onSidebarToggle}
      ModalProps={{ keepMounted: true }}
    >
      <Stack spacing={2} direction="column" alignItems="flex-start" sx={{paddingX: 1, paddingY: 2, minWidth: 280, width: '100%'}}>
        <LogoSection />
        <MenuList/>
      </Stack>
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