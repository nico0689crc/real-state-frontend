import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import ErrorBoundary from 'components/core/ErrorBoundary/ErrorBoundary'
import { theme } from 'themes'
import { QueryClientProvider } from "contexts/QueryClient";
import Routes from 'routes';
import { retrievUserDataActionCreator } from 'store/userActionCreator'
import { authActions } from 'store/authSlice'

const App = () => {
  const dispatch = useDispatch();
  const customTheme = useSelector((state) => state.uiStore);
  const tokenExpirationDate = useSelector((state) => state.authStore.tokenExpirationDate);

  useEffect(() => {
    dispatch(retrievUserDataActionCreator());
  }, [dispatch]);

  useEffect(() => {
    if (tokenExpirationDate) {
      const remainingTime = new Date(+tokenExpirationDate * 1000).getTime() - new Date().getTime();

      setTimeout(() => {
        dispatch(authActions.logout());
      }, remainingTime);
    }
  }, [dispatch, tokenExpirationDate]);

  return (
    <QueryClientProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme(customTheme)}>
          <CssBaseline />
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default App;
