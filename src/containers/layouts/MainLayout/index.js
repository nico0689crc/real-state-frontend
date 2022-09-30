import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AppSuspense from 'components/core/AppSuspense';
import { containerPaddingX, containerPaddingSmX } from 'constants/ui';
import { uisActions } from 'store/uiSlice';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const {sidebarOpened, sidebarWidht} = useSelector((state) => state.uiStore);

  const handleLeftDrawerToggle = () => {
    dispatch(uisActions.toggleSidebar({ sidebarOpened: !sidebarOpened }));
  };

  useEffect(() => {
    dispatch(uisActions.toggleSidebar({ sidebarOpened: matchUpMd }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchUpMd]);

  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr', width: '100%', height: '100vh' }}>
      <AppBar color="inherit" position="static" elevation={0} sx={{ transition: sidebarOpened ? theme.transitions.create('width') : 'none' }}>
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Box sx={{display: 'flex', overflow: 'hidden'}}>
        <Box component="nav" sx={{ 
          flexGrow: 0, 
          flexShrink: 0, 
          height: '100%',
          width: matchUpMd ? sidebarWidht : 'auto', 
          overflow: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shortest
          }), 
        }}>
          <Sidebar drawerOpen={sidebarOpened} drawerToggle={handleLeftDrawerToggle} />
        </Box>
        <Box sx={{flexGrow: 1, padding: matchUpMd ? containerPaddingX : containerPaddingSmX, overflow: 'auto'}}>
          <AppSuspense>
            <Outlet />
          </AppSuspense>
        </Box>
      </Box>
    </Box>
  )
};

export default MainLayout;
