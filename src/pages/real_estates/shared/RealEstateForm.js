import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TextFormatOutlined, Close, Title, Map, Email, Phone, KeyOutlined, VisibilityOffOutlined, VisibilityOutlined, Badge } from '@mui/icons-material';
import { Stack, InputAdornment, Button, CircularProgress, IconButton } from '@mui/material';
import API_ENDPOINTS from "constants/endpoints";
import MainCard from "components/ui/Card/MainCard";
import Input from "components/ui/Inputs/Input";
import AppTypography from "components/ui/Typography/AppTypography";

const RealEstateForm = ({ form, onSubmit, isLoading, item }) => {
  let submit_label;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = form;

  const showPasswordHaldler = () => {
    setShowPassword((prevState) => !prevState)
  }

  const showPasswordConfirmationHaldler = () => {
    setShowPasswordConfirmation((prevState) => !prevState)
  }
  
  const onDiscardHandler = () => {
    navigate(API_ENDPOINTS.REAL_ESTATES, { replace: true });
  }

  if(item){
    submit_label = isLoading ? t("global.updating_button") : t("global.update_button");
  } else {
    submit_label = isLoading ? t("global.saving_button") : t("global.save_button");
  }

  return (
    <Stack direction="row" justifyContent="center" width="100%">
      <MainCard contentSX={{p: '0 !important'}} sx={{paddingX: {xs: 2, md: 4}, paddingY: {xs: 2, md: 2}, maxWidth: "50rem"}}>
        <Stack spacing={2}>
          <Input
            id="name"
            name="name"
            error={!!errors.name} 
            {...register('name')}
            required
            label={t("real_estates.create_edit.labels.name")}
            helperText={!!errors.name?.message && errors.name.message }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title />
                </InputAdornment>
              ),
            }}
          />
          <Input
            id="address"
            name="address"
            error={!!errors.address} 
            {...register('address')}
            required
            label={t("real_estates.create_edit.labels.address")}
            helperText={!!errors.address?.message && errors.address.message }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Map />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
            <Input
              id="contact_phone"
              name="contact_phone"
              error={!!errors.contact_phone} 
              {...register('contact_phone')}
              required
              label={t("real_estates.create_edit.labels.contact_phone")}
              helperText={!!errors.contact_phone?.message && errors.contact_phone.message }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            <Input
              id="contact_email"
              name="contact_email"
              error={!!errors.contact_email} 
              {...register('contact_email')}
              required
              label={t("real_estates.create_edit.labels.contact_email")}
              helperText={!!errors.contact_email?.message && errors.contact_email.message }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Input
            id="description"
            label={t("real_estates.create_edit.labels.description")}
            size="small"
            multiline={true}
            fullWidth
            rows={6}
            {...register('description')}
            error={errors?.description}
            helperText={errors?.description?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TextFormatOutlined />
                </InputAdornment>
              ),
            }} 
          />
          
          {!item && (
            <>
              <AppTypography variant="h6" letterSpacing={1} className="MuiTypographyEllipsis">{t("real_estates.create_edit.labels.user_responsible")}</AppTypography>
              <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                <Input
                  id="first_name"
                  name="first_name"
                  error={!!errors.first_name} 
                  {...register('first_name')}
                  required
                  label={t("users.create_edit.labels.first_name")}
                  helperText={!!errors.first_name?.message && errors.first_name.message }
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Badge />
                      </InputAdornment>
                    ),
                  }}
                />
                <Input
                  id="last_name"
                  name="last_name"
                  error={!!errors.last_name} 
                  {...register('last_name')}
                  required
                  label={t("users.create_edit.labels.last_name")}
                  helperText={!!errors.last_name?.message && errors.last_name.message }
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Badge />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                <Input
                  id="email"
                  name="email"
                  error={!!errors.email} 
                  {...register('email')}
                  required
                  label={t("users.create_edit.labels.email")}
                  helperText={!!errors.email?.message && errors.email.message }
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                <Input 
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
              </Stack>
            </>
          )}

          <Stack direction={{xs: 'column-reverse', sm: 'row'}} justifyContent="center" width="100%" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress sx={{ width: '15px !important', height: '15px !important' }} color="inherit" /> : null}
            >
              {submit_label}
            </Button>
            <Button onClick={onDiscardHandler} variant="outlined" startIcon={<Close />}>
              {t("global.cancel_button")}
            </Button>
          </Stack>
        </Stack>
      </MainCard>
    </Stack>
  )
}

export default RealEstateForm;