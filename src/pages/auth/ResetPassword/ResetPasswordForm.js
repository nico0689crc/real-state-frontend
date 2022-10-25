import { MailOutline, Restore, CheckCircleOutline } from '@mui/icons-material';
import { InputAdornment, Link, Stack, useMediaQuery, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import classNames from 'classnames';
import MainCard from "components/ui/Card/MainCard";
import Input from "components/ui/Inputs/Input";

const ResetPasswordForm = ({ form, onSubmit, isLoading, successMessage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors } } = form;
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const onClickNavigationHandler = (event) => {
    event.preventDefault();
    navigate("/auth/signin");
  }

  return (
    <MainCard 
      title={t("reset_password.title")} 
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
          placeholder={t("reset_password.fields.email.placeholder")} id="email" name="email"
          error={!!errors.email} 
          {...register('email')} 
          required
          label={t("reset_password.fields.email.label")} 
          helperText={!!errors.email?.message && errors.email?.message }
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <Link onClick={onClickNavigationHandler} href="#">{t("reset_password.log_in")}</Link>
        </Stack>
        <LoadingButton
          variant="contained" 
          loading={isLoading}
          loadingPosition="start" 
          startIcon={<Restore />}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? t("reset_password.submiting_button") : t("reset_password.submit_button")}
        </LoadingButton>
      </Stack>
    </MainCard>
  )
}

export default ResetPasswordForm;