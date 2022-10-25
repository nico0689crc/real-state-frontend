import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { useResetPasswordMutation } from "hooks/queries/auth/authQueries";
import AuthWrapper from "pages/auth/AuthWrapper";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [successMessage, setSucessMessage] = useState(null);
  const { setSnackBarAlert } = snackBarAlertActions;
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("validations.email.required"))
      .email(t("validations.email.format"))
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
    } else if(response.status === 404) {
       if(response?.data?.errors) {
        setError("email", {message: response.data.errors[0]});
       } else {
        const { statusText, status } = response;
        dispatch(setSnackBarAlert({
          type: "error",
          content: {
            title: `${statusText} [Code: ${status}]`
          }
        }));
       }
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

  const {isLoading, mutate } = useResetPasswordMutation(onSuccessHandler, onErrorHandler);

  const onSubmit = data => {
    mutate({
      ...data,
      redirect_url: `${process.env.REACT_APP_FRONTEND_URL}auth/password/edit`
    });
  };

  return (
    <AuthWrapper>
      <ResetPasswordForm form={form} onSubmit={onSubmit} isLoading={isLoading} successMessage={successMessage}/>
    </AuthWrapper>
  );
};

export default ResetPassword;