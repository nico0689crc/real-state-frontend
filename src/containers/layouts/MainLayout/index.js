import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AppSuspense from 'components/core/AppSuspense';
import { containerPaddingX, containerPaddingSmX, sidebarWidthClosed, sidebarWidthOpened } from 'constants/ui';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(null);
  
  const handleLeftSidebarToggle = () => {
    setSidebarOpened(prevState => !prevState);
  };

  useEffect(() => {
    setSidebarOpened(matchUpMd);
  }, [matchUpMd]);

  useEffect(() => {
    setSidebarWidth(sidebarOpened ? sidebarWidthOpened : sidebarWidthClosed);
  }, [sidebarOpened]);

  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr', width: '100%', height: '100vh' }}>
      <AppBar color="inherit" position="static" elevation={0} sx={{ transition: sidebarOpened ? theme.transitions.create('width') : 'none' }}>
        <Toolbar>
          <Header handleLeftSidebarToggle={handleLeftSidebarToggle} />
        </Toolbar>
      </AppBar>
      <Box sx={{display: 'flex', overflow: 'hidden'}}>
        <Box component="nav" sx={{ 
          flexGrow: 0, 
          flexShrink: 0, 
          height: '100%',
          width: matchUpMd ? sidebarWidth : 'auto', 
          overflow: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shortest
          }), 
        }}>
          <Sidebar sidebarOpened={sidebarOpened} onSidebarToggle={handleLeftSidebarToggle} />
        </Box>
        <Box sx={{
          flexGrow: 1, 
          padding: matchUpMd ? containerPaddingX : containerPaddingSmX, 
          overflow: 'auto'
        }}>
          <AppSuspense>
            <Outlet />
          </AppSuspense>
        </Box>
      </Box>
    </Box>
  )
};

export default MainLayout;
