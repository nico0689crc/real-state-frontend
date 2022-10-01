import { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { MailOutline, KeyOutlined, VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { TextField, Box, InputAdornment, IconButton, FormGroup, FormControlLabel, 
         Checkbox, Link, Button } from '@mui/material';
import MainCard from "components/ui/Card/MainCard";

const LoginForm = ({ form, onSubmit }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = form;

  const showPasswordHaldler = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <MainCard title={t("login.title")} contentSX={{p: 0}}>
      <TextField 
        placeholder={t("login.fields.email.placeholder")} id="email" name="email"
        error={!!errors.email} {...register('email')} required
        label={t("login.fields.email.label")}
        helperText={!!errors.email?.message ? errors.email?.message : " "}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutline />
            </InputAdornment>
          ),
        }}
      />
      <TextField 
        placeholder={t("login.fields.password.placeholder")} id="password" name="password"
        error={!!errors.password} {...register('password')} required
        label={t("login.fields.password.label")}
        helperText={!!errors.password?.message ? errors.password?.message : " "}
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
      <Button
          sx={{
            borderRadius: 5,
            fontWeight: 600,
            backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 20%, ${theme.palette.primary.light} 100%)`
          }}
          onClick={handleSubmit(onSubmit)}
          variant="contained">{t("login.submit_button")}</Button>
      <Box>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label={t("login.remember_me")} />
        </FormGroup>
        <Link href="recover-password">{t("login.forgot_password")}</Link>
      </Box>
      <Box>
        <Button onClick={handleSubmit(onSubmit)}>{t("login.submit_button")}</Button>
      </Box>
    </MainCard>
  )
}

export default LoginForm;