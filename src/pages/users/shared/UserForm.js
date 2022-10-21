import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Close, PersonAdd, Badge, Email, PhoneAndroid, Business, Cake } from '@mui/icons-material';
import { Button, InputAdornment, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Input from "components/ui/Inputs/Input";
import InputSelect from "components/ui/Inputs/InputSelect";
import AppTypography from "components/ui/Typography/AppTypography";
import { FORM_TYPES } from "store/users/usersSlice";
import UserFormDialog from "./UserFormDialog";
import UserFormNormal from "./UserFormNormal";

const UserFormHeader = ({item}) => {
  const { t } = useTranslation();
  const title = item ? t("users.create_edit.title_edit") : t("users.create_edit.title_create");

  return <AppTypography>{title}</AppTypography>
}

const UserFormBody = ({ form }) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = form;

  return (
    <Grid container justifyContent="space-between" gap={2}>
      <Grid item xs={12} sm={5}>
        <Input
          id="first_name" 
          label={t("users.create_edit.labels.first_name")} 
          {...register('first_name')}
          required
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Badge />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>  
        <Input
          id="last_name" 
          label={t("users.create_edit.labels.last_name")} 
          {...register('last_name')}
          required
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Badge />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}> 
        <Input
          id="email" 
          label={t("users.create_edit.labels.email")} 
          {...register('email')}
          required
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <InputSelect
          name="user_role"
          id="user_role"
          label={t("users.create_edit.labels.user_role")}
          error={!!errors.user_role}
          helperText={errors.user_role?.message}
          control={form.control}
          options={[
            { value: "administrator", text: t("users.create_edit.labels.user_role_administrator") },
            { value: "super_administrator", text: t("users.create_edit.labels.user_role_super_administrator") }
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Input
          id="phone_number" 
          label={t("users.create_edit.labels.phone_number")} 
          {...register('phone_number')}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneAndroid />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Input
          id="address" 
          label={t("users.create_edit.labels.address")} 
          {...register('address')}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Business />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Input
          id="date_of_birth" 
          label={t("users.create_edit.labels.date_of_birth")} 
          {...register('date_of_birth')}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Cake />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <InputSelect
          name="gender"
          id="gender"
          label={t("users.create_edit.labels.gender")}
          error={!!errors.gender}
          helperText={errors.gender?.message}
          control={form.control}
          options={[
            { value: "male", text: t("users.create_edit.labels.gender_male") },
            { value: "female", text: t("users.create_edit.labels.gender_female") }        
          ]}
        />
      </Grid>
    </Grid>
  )
}

const UserFormFooter = ({isLoading, form, onSubmit, setOpenDialog, item}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userEditFormType } = useSelector(state => state.usersStore);
  const { handleSubmit } = form;
  
  const submit_label =  item ? (
    isLoading ? t("global.updating_button") : t("global.update_button")
  ) : (
    isLoading ? t("global.saving_button") : t("global.save_button")
  );

  const onDiscardHandler = () => {
    userEditFormType === FORM_TYPES.DIALOG ? setOpenDialog() : navigate('/');
  }

  return (
    <>
      <LoadingButton 
        variant="contained" 
        loading={isLoading}
        loadingPosition="start" 
        startIcon={<PersonAdd />}
        onClick={handleSubmit(onSubmit)}
      >
        {submit_label}
      </LoadingButton>
      <Button variant="outlined" onClick={onDiscardHandler} startIcon={<Close />}>{t("global.discard")}</Button>
    </>
  )
}

const UserForm = ({ item, form, onSubmit, isLoading, openDialog, setOpenDialog }) => {
  const { userEditFormType } = useSelector(state => state.usersStore);
  const header = <UserFormHeader item={item}/>
  const body = <UserFormBody form={form}/>
  const footer = <UserFormFooter item={item} form={form} onSubmit={onSubmit} isLoading={isLoading} setOpenDialog={setOpenDialog}/>

  return (userEditFormType === FORM_TYPES.DIALOG) ? (
    <UserFormDialog headerContent={header} bodyContent={body} footerContent={footer} openDialog={openDialog} setOpenDialog={setOpenDialog}/>
  ) : (
    <UserFormNormal headerContent={header} bodyContent={body} footerContent={footer}/>
  );
}

export default UserForm;