import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { useLoginMutation } from "hooks/queries/auth/authQueries";
import { authActions } from 'store/authSlice';
import AuthWrapper from "pages/auth/AuthWrapper";
import LoginForm from "./LoginForm";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSnackBarAlert } = snackBarAlertActions;
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("validations.email.required"))
      .email(t("validations.email.format")),
    password: Yup.string()
      .required(t("validations.password.required"))
  });

  const form = useForm({resolver: yupResolver(validationSchema)});
  const { setError } = form;

  const onSuccessHandler = (response) => {
    const { data: {data}, headers } = response;
    
    dispatch(authActions.login({
      auth: {
        accessToken: headers['access-token'],
        uid: headers['uid'],
        client: headers['client'],
        tokenExpirationDate: headers['expiry'],
        attributes: data
      }
    }));
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
    } else if(response.status === 401) {
      setError("email", {message: response.data.errors[0]});
      setError("password", {message: response.data.errors[0]});
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

  const {isLoading, mutate} = useLoginMutation(onSuccessHandler, onErrorHandler);

  const onSubmit = data => {
    mutate(data);
  };

  return (
    <AuthWrapper>
      <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading}/>
    </AuthWrapper>
  );
};

export default Login;