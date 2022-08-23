import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { MainRoutes, MainRoutesNavigate} from './MainRoutes';
import { AuthenticationRoutes, AuthenticationRoutesNavigate } from './AuthenticationRoutes';

const ThemeRoutes = () => {
  const { accessToken, tokenExpirationDate} = useSelector(state => state.authStore);
  const validAccessToken = new Date(+tokenExpirationDate * 1000) > new Date();
  const routes = accessToken && validAccessToken ? [MainRoutes, MainRoutesNavigate] : [AuthenticationRoutes, AuthenticationRoutesNavigate];

  return useRoutes(routes);
}

export default ThemeRoutes;