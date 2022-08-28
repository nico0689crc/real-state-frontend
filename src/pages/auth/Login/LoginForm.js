import { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import {
  FormControl, FormHelperText, Input, Box, InputAdornment, IconButton, FormGroup,
  FormControlLabel, Checkbox, Link, Button
} from '@mui/material';

import { MailOutline, KeyOutlined, VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
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
    <MainCard title={t("login.title")}>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MailOutline sx={{ color: 'action.active', mr: 1 }} />
          <FormControl fullWidth>
            <Input
              placeholder={t("login.fields.email.placeholder")}
              id="email"
              name="email"
              error={!!errors.email}
              {...register('email')}
              required
            />
          </FormControl>
        </Box>
        <FormHelperText sx={{ ml: 4, mt: 0.8 }} error id="email">{errors.email?.message}</FormHelperText>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KeyOutlined sx={{ color: 'action.active', mr: 1 }} />
          <FormControl fullWidth>
            <Input
              placeholder={t("login.fields.password.placeholder")}
              name="password"
              id="password"
              required
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              {...register('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={showPasswordHaldler}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <FormHelperText sx={{ ml: 4, mt: 0.8 }} error id="password">{errors.password?.message}</FormHelperText>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label={t("login.remember_me")} />
        </FormGroup>
        <Link href="recover-password" sx={{
          color: theme.palette.primary.light,
          '&:hover': {
            color: theme.palette.primary.dark
          }
        }} underline="none">{t("login.forgot_password")}</Link>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
        <Button
          sx={{
            borderRadius: 5,
            fontWeight: 600,
            backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 20%, ${theme.palette.primary.light} 100%)`
          }}
          onClick={handleSubmit(onSubmit)}
          variant="contained">{t("login.submit_button")}</Button>
      </Box>
    </MainCard>
  )
}

export default LoginForm;