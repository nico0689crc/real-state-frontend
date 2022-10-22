import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Box, Toolbar, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AppSuspense from 'components/core/AppSuspense';
import { containerPaddingX, containerPaddingSmX, sidebarWidthClosed, sidebarWidthOpened } from 'constants/ui';
import Sidebar from './Sidebar';
import Header from './Header';

const MobileWrapper = ({ sidebarOpened, handleLeftSidebarToggle }) => {
  const appBarRef = useRef(null);
  const [appBarHeight, setAppBarHeight] = useState(0);

  useLayoutEffect(() => {
    setAppBarHeight(appBarRef.current.clientHeight);
  }, []);

  return (
    <>
      <AppBar color="inherit" position="fixed" elevation={0} ref={appBarRef}>
        <Toolbar>
           <Header handleLeftSidebarToggle={handleLeftSidebarToggle} />
         </Toolbar>
      </AppBar>
      <Stack sx={{marginTop: `${appBarHeight}px`, padding: containerPaddingSmX}}>
        <Box component="nav">
          <Sidebar sidebarOpened={sidebarOpened} onSidebarToggle={handleLeftSidebarToggle} />
        </Box>
        <AppSuspense>
          <Outlet />
        </AppSuspense>
      </Stack>
    </>
  )
}

const DesktopWrapper = ({ theme, sidebarOpened, sidebarWidth, handleLeftSidebarToggle, matchUpMd }) => {

  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <AppBar color="inherit" position="static" elevation={0} sx={{ transition: sidebarOpened ? theme.transitions.create('width') : 'none' }}>
        <Toolbar>
          <Header handleLeftSidebarToggle={handleLeftSidebarToggle} />
        </Toolbar>
      </AppBar>
      <Stack direction="row" sx={{ overflow: 'hidden'}}>
        <Box component="nav" sx={{ flexGrow: 0, flexShrink: 0, 
          width: matchUpMd ? sidebarWidth : 'auto',
          overflow: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shortest
          }), 
        }}>
          <Sidebar sidebarOpened={sidebarOpened} onSidebarToggle={handleLeftSidebarToggle} />
        </Box>
        <Box sx={{flexGrow: 1, padding: containerPaddingX, overflowY: 'auto'}}>
          <AppSuspense>
            <Outlet />
          </AppSuspense>
        </Box>
      </Stack>
    </Box>
  );
}

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

  return ( matchUpMd ? (
    <DesktopWrapper {...{theme, sidebarOpened, sidebarWidth, handleLeftSidebarToggle, matchUpMd}} />
  ) : (
    <MobileWrapper {...{sidebarOpened, handleLeftSidebarToggle}} />
  ));
}

export default MainLayout;
