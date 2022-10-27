import { useState } from 'react';
import { KeyOutlined, VisibilityOutlined, VisibilityOffOutlined, CheckCircleOutline, Restore } from '@mui/icons-material';
import { InputAdornment, Stack, useMediaQuery, Alert, IconButton, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingButton from '@mui/lab/LoadingButton';
import classNames from 'classnames';
import MainCard from "components/ui/Card/MainCard";
import Input from "components/ui/Inputs/Input";

const ResetPasswordForm = ({ form, onSubmit, isLoading, successMessage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors } } = form;
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const showPasswordHaldler = () => {
    setShowPassword((prevState) => !prevState)
  }

  const showPasswordConfirmationHaldler = () => {
    setShowPasswordConfirmation((prevState) => !prevState)
  }

  const onClickNavigationHandler = (event) => {
    event.preventDefault();
    navigate("/auth/signin");
  }

  return (
    <MainCard 
      title={t("reset_password_edit.title")} 
      className={classNames({ "MuiCardFullScreen": isDownMd })} 
      contentSX={{
        p: '1rem 0 !important',
        width: '100%', 
        [theme.breakpoints.up('sm')]: {
          minWidth: '300px'
        }, 
        [theme.breakpoints.up('md')]: {
          minWidth: '400px'
        }
      }} 
      sx={{ padding: 6}}
    >
      
      <Stack spacing={3}>
        {successMessage && <Alert sx={{maxWidth: "400px"}} iconMapping={{ success: <CheckCircleOutline fontSize="inherit" />}}>{successMessage}</Alert>}
        <Input 
          placeholder={t("reset_password_edit.fields.password.placeholder")} 
          id="password" 
          name="password"
          error={!!errors.password} 
          {...register('password')} 
          required
          label={t("reset_password_edit.fields.password.label")}
          helperText={!!errors.password?.message && errors.password?.message}
          type={showPassword ? "text" : "password"}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton className='MuiIconButtonNoHoverEffect' aria-label="Toggle Password Visibility" onClick={showPasswordHaldler} edge="end">
                  {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Input 
          placeholder={t("reset_password_edit.fields.password_confirmation.placeholder")} 
          id="password_confirmation" 
          name="password_confirmation"
          error={!!errors.password_confirmation} 
          {...register('password_confirmation')} 
          required
          label={t("reset_password_edit.fields.password_confirmation.label")}
          helperText={!!errors.password_confirmation?.message && errors.password_confirmation?.message}
          type={showPasswordConfirmation ? "text" : "password"}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton className='MuiIconButtonNoHoverEffect' aria-label="Toggle Password Visibility" onClick={showPasswordConfirmationHaldler} edge="end">
                  {showPasswordConfirmation ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {successMessage && (
          <Stack direction='row' justifyContent='center' alignItems='center'>
            <Link onClick={onClickNavigationHandler} href="#">{t("reset_password.log_in")}</Link>
          </Stack>
        )}
        <LoadingButton
          variant="contained" 
          loading={isLoading}
          loadingPosition="start" 
          startIcon={<Restore />}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? t("reset_password_edit.submiting_button") : t("reset_password_edit.submit_button")}
        </LoadingButton>
      </Stack>
    </MainCard>
  )
}

export default ResetPasswordForm;