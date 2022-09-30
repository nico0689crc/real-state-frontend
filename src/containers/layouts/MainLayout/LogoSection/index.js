import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import Logo from 'components/ui/Logo/Logo';
import API_ENDPOINTS from 'constants/endpoints';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = (props) => {
  return (
    <ButtonBase sx={{marginLeft: 1}} disableRipple component={Link} to={API_ENDPOINTS.DASHBOARD} {...props}>
      <Logo />
    </ButtonBase>
  )
};

export default LogoSection;
