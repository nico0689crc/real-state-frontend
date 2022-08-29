import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import AppSuspense from 'components/core/AppSuspense'
import { uisActions, UI_VARIABLES } from 'store/uiSlice';
import { drawerWidth } from 'constants/ui';
import colors from 'themes/colors'

import Sidebar from './Sidebar';
import Header from './Header';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => {

  return {
    backgroundColor: theme.palette.mode === UI_VARIABLES.UI_MODE_DARK ? colors.grey[800] : colors.grey[100],
    ...theme.typography.mainContent,
    ...(!open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: -drawerWidth,
      },
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0,
    }),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    [theme.breakpoints.down('md')]: {
      marginTop: '60px',
      borderRadius: 0,
      padding: '1rem'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0.75rem',
    }
  }
});

const MainLayout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const leftDrawerOpened = useSelector((state) => state.uiStore.opened);

  const handleLeftDrawerToggle = () => {
    dispatch(uisActions.toggleSidebar({ opened: !leftDrawerOpened }));
  };

  useEffect(() => {
    dispatch(uisActions.toggleSidebar({ opened: matchUpMd }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchUpMd]);

  return (
    <Box sx={{ display: 'flex', width: '100vw' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ transition: leftDrawerOpened ? theme.transitions.create('width') : 'none', }}
      >
        <Toolbar sx={{
          [theme.breakpoints.down('md')]: {
            padding: '1rem'
          },
          [theme.breakpoints.down('sm')]: {
            padding: '0.75rem',
          }
        }}>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
      <Main theme={theme} open={leftDrawerOpened}>
        <AppSuspense>
          <Outlet />
        </AppSuspense>
      </Main>
    </Box>
  )
};

export default MainLayout;
