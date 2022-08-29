import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import Logo from 'components/ui/Logo/Logo';
import API_ENDPOINTS from 'constants/endpoints';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  return (
    <ButtonBase disableRipple component={Link} to={API_ENDPOINTS.DASHBOARD}>
      <Logo />
    </ButtonBase>
  )
};

export default LogoSection;
