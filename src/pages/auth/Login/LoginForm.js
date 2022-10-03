import { useState } from 'react';
import { MailOutline, KeyOutlined, VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { InputAdornment, IconButton, FormControlLabel, Checkbox, Link, Button, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import classNames from 'classnames';
import MainCard from "components/ui/Card/MainCard";
import Input from "components/ui/Inputs/Input";

const LoginForm = ({ form, onSubmit }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = form;
  const isDownMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const showPasswordHaldler = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <MainCard title={t("login.title")} className={classNames({ "MuiCardFullScreen": isDownMdScreen })} contentSX={{p: '1rem 0 !important'}} sx={{ padding: 6}}>
      <Stack spacing={3}>
        <Input 
          placeholder={t("login.fields.email.placeholder")} id="email" name="email"
          error={!!errors.email} 
          {...register('email')} 
          required
          label={t("login.fields.email.label")} 
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
        <Input 
          placeholder={t("login.fields.password.placeholder")} 
          id="password" 
          name="password"
          error={!!errors.password} 
          {...register('password')} 
          required
          label={t("login.fields.password.label")}
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
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <FormControlLabel control={<Checkbox sx={{py: 0}} defaultChecked />} label={t("login.remember_me")} />
          <Link sx={{fontWeight: '600'}} href="recover-password">{t("login.forgot_password")}</Link>
        </Stack>
        <Button fullWidth onClick={handleSubmit(onSubmit)} variant="contained">{t("login.submit_button")}</Button>
      </Stack>
    </MainCard>
  )
}

export default LoginForm;