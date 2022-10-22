import PropTypes from 'prop-types';
import {useSelector, useDispatch} from "react-redux";
import { Stack, Snackbar, Alert, useTheme, useMediaQuery } from "@mui/material";
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import AppTypography from '../Typography/AppTypography';

const AppSnackBar = ({className, children, ...props}) => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { 
    isSnackBarOpen, 
    snackBarAlert: {
      type: severitySnackbar,
      content: { title, subTitle, message } 
    }
  } = useSelector(state => state.snackBarAlertStore);

  const toggleSnackBarAlertHandler = () => {
    dispatch(snackBarAlertActions.closeSnackBarAlert());
  }

  return (
    <Snackbar
      {...props} 
      className={`MuiAppSnackBarCustomized ${className}`} 
      open={isSnackBarOpen} 
      autoHideDuration={6000} 
      onClose={toggleSnackBarAlertHandler}
      anchorOrigin={{ vertical: "top", horizontal: isDownSm ? "center" : "right" }}
      sx={{ width: {xs: '100%', lg: "25%"} }}
    >
      <Alert onClose={toggleSnackBarAlertHandler} severity={severitySnackbar}>
        <Stack spacing={1}>
          <AppTypography variant="subtitle1">{title}</AppTypography>
          <AppTypography variant="body2">{subTitle}</AppTypography>
          <AppTypography variant="body2">{message}</AppTypography>
        </Stack>
      </Alert>
    </Snackbar>
  ); 
}

AppSnackBar.propTypes = {
  className: PropTypes.string
}

AppSnackBar.defaultProps = {
  className: "",
};

export default AppSnackBar;