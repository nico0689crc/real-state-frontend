import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import UserForm from "./UserForm";
import { useEffect } from 'react';

const getFormSchema = (t, item) => {
  
  const formSchema = yup.object().shape({
    "first_name": yup.string().required(t("users.validations.required")),
    "last_name": yup.string().required(t("users.validations.required")),
    "email": yup.string().required(t("users.validations.required")),
    "user_role": yup.string().required(t("users.validations.required"))
  });

  const defaultValues = {
    "first_name": item ? item.first_name : "adsasd",
    "last_name": item ? item.last_name : "adsads",
    "user_role": item ? item.user_role : "",
    "email": item ? item.email : "nico0689crcde@gmail.com",
    "phone_number": item ? item.phone_number : "",
    "address": item ? item.address : "",
    "date_of_birth": item ? item.date_of_birth : "",
    "gender": item ? item.gender : "",
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const Users = ({ isLoading, mutate, error, item = null, openDialog, setOpenDialog, ...props}) => {
  const { t } = useTranslation();
  const form = useForm(getFormSchema(t, item));
  const { setError, formState: { defaultValues }, resetField } = form;

  const resetDefaultValues = () => Object.keys(defaultValues).forEach(key => resetField(key));

  useEffect(() => {
    error && Object.keys(error?.data).forEach(key => setError(key, {message: error.data[key]}));
  },[error, setError]);

  const onSubmit = async (data) => {
    
    const formData = new FormData();
    
    formData.append("user[first_name]", data['first_name']);
    formData.append("user[last_name]", data['last_name']);
    formData.append("user[user_role]", data['user_role']);
    formData.append("user[email]", data['email']);
    formData.append("user[phone_number]", data['phone_number']);
    formData.append("user[address]", data['address']);
    formData.append("user[date_of_birth]", data['date_of_birth']);
    formData.append("user[gender]", data['gender']);
    !item && formData.append("redirect_url", `${process.env.REACT_APP_FRONTEND_URL}auth/password/edit`);

    mutate({id: item?.id, data: formData});
  }

  return <UserForm 
    form={form} 
    onSubmit={onSubmit} 
    isLoading={isLoading} 
    openDialog={openDialog} 
    setOpenDialog={setOpenDialog}
    item={item}
    resetDefaultValues={resetDefaultValues}
    {...props}
  />
}

export default Users;