import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { useResetPasswordEditMutation } from "hooks/queries/auth/authQueries";
import AuthWrapper from "pages/auth/AuthWrapper";
import ResetPasswordEditForm from "./ResetPasswordEditForm";
import { useSearchParams } from "react-router-dom";

const ResetPasswordEdit = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [successMessage, setSucessMessage] = useState(null);
  const { setSnackBarAlert } = snackBarAlertActions;

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t("validations.password.required")),
    password_confirmation: Yup.string()
      .required(t("validations.password.required"))
  });

  const form = useForm({resolver: yupResolver(validationSchema)});
  const { setError } = form;

  const onSuccessHandler = (response) => {
    response.message && setSucessMessage(response.message);
  }

  const onErrorHandler = ({response}) => {
    if(response.status === 500) {
      const { statusText, status } = response;
      dispatch(setSnackBarAlert({
        type: "error",
        content: {
          title: `${statusText} [Code: ${status}]`
        }
      }));
    } else if(response.status === 422) {
      response?.data?.errors?.password && setError("password", {message: response.data.errors.password[0]});
      response?.data?.errors?.password_confirmation && setError("password_confirmation", {message: response.data.errors.password_confirmation[0]});
    } else {
      dispatch(setSnackBarAlert({
        type: "error",
        content: {
          title: "Unexpected Error.",
          message: "Unexpected Error."
        }
      }));
    }
  } 

  const {isLoading, mutate } = useResetPasswordEditMutation(
    onSuccessHandler, 
    onErrorHandler, {
      uid: searchParams.get('uid'),
      "access-token": searchParams.get('access-token'),
      client: searchParams.get('client'),
  });

  const onSubmit = data => {
    mutate(data);
  };

  return (
    <AuthWrapper>
      <ResetPasswordEditForm form={form} onSubmit={onSubmit} isLoading={isLoading} successMessage={successMessage}/>
    </AuthWrapper>
  );
};

export default ResetPasswordEdit;