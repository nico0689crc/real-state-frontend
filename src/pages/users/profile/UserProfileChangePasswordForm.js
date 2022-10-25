import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Grid, InputAdornment, IconButton, Button } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { KeyOutlined, VisibilityOutlined, VisibilityOffOutlined, Save } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUpdatePasswordMutation from "hooks/queries/users/useUpdatePasswordMutation";
import Input from "components/ui/Inputs/Input";
import { snackBarAlertActions } from "store/snackBarAlertSlice";

const getFormSchema = (t) => {
  const formSchema = yup.object().shape({
    "current_password": yup.string().required(t("users.validations.required")),
    "password": yup.string().required(t("users.validations.required")),
    "password_confirmation": yup.string().required(t("users.validations.required")),
  });

  const defaultValues = {
    "current_password": "",
    "password": "",
    "password_confirmation": ""
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const UserProfileChangePasswordForm = () => {
  const {attributes: {id}} = useSelector(state => state.authStore);
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSnackBarAlert } = snackBarAlertActions;
  const { register, formState: { errors }, setError, handleSubmit } = useForm(getFormSchema(t));

  useEffect(() => {
    responseError && Object.keys(responseError.data).forEach(key => setError(key, {message: responseError.data[key]}));
  },[responseError, setError]);

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("users.create_edit.success_updated_title"),
        message: t("users.create_edit.success_updated_message")
      }
    }));
  }

  const onErrorHandler = ({response}) => {
    if(response.status === 500) {
      const { status, exception, error } = response.data;
      dispatch(setSnackBarAlert({
        type: "error",
        content: {
          title: error,
          subTitle: status,
          message: exception
        }
      }));
    } else {
      setResponseError(response.data);
    }
  } 

  const showPasswordHaldler = () => {
    setShowPassword((prevState) => !prevState)
  }

  const showPasswordConfirmationHaldler = () => {
    setShowPasswordConfirmation((prevState) => !prevState)
  }

  const showCurrentPasswordHaldler = () => {
    setShowCurrentPassword((prevState) => !prevState)
  }

  const onDiscardHandler = () => {
    navigate("/");
  }

  const { mutate, isLoading } = useUpdatePasswordMutation(onSuccessHandler, onErrorHandler);
 
  const onSubmit = async (data) => id && mutate({id, data: {user: {...data}}});
  
  const submit_label = isLoading ? t("global.updating_button") : t("global.update_button");

  return (
    <Stack maxWidth="400px" width="100%" spacing={4}>
      <Grid container justifyContent="center" gap={2}>
        <Grid item xs={12}>
          <Input 
            placeholder={t("users.change_password.current_password.placeholder")} 
            id="current_password" 
            name="current_password"
            error={!!errors.current_password} 
            {...register('current_password')} 
            required
            label={t("users.change_password.current_password.label")}
            helperText={!!errors.current_password?.message && errors.current_password?.message}
            type={showCurrentPassword ? "text" : "password"}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton className='MuiIconButtonNoHoverEffect' aria-label="Toggle Password Visibility" onClick={showCurrentPasswordHaldler} edge="end">
                    {showCurrentPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Input 
            placeholder={t("users.change_password.password.placeholder")} 
            id="password" 
            name="password"
            error={!!errors.password} 
            {...register('password')} 
            required
            label={t("users.change_password.password.label")}
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
        </Grid>
        <Grid item xs={12}>
          <Input 
            placeholder={t("users.change_password.password_confirmation.placeholder")} 
            id="password_confirmation" 
            name="password_confirmation"
            error={!!errors.password_confirmation} 
            {...register('password_confirmation')} 
            required
            label={t("users.change_password.password_confirmation.label")}
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
        </Grid>
      </Grid> 
      <Stack direction="row" justifyContent="center" spacing={2}>
        <LoadingButton 
          variant="contained" 
          loading={isLoading}
          loadingPosition="start"
          startIcon={<Save />} 
          onClick={handleSubmit(onSubmit)}
        >
          {submit_label}
        </LoadingButton>
        <Button variant="outlined" onClick={onDiscardHandler}>{t("global.discard")}</Button>
      </Stack>
    </Stack>
  );
}

export default UserProfileChangePasswordForm;