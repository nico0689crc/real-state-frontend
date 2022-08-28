import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useLoginMutation } from "hooks/queries/authQueries";
import { authActions } from 'store/authSlice';
import AuthWrapper from "pages/auth/AuthWrapper";
import LoginForm from "./LoginForm";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const mutation = useLoginMutation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("validations.email.required"))
      .email(t("validations.email.format")),
    password: Yup.string()
      .required(t("validations.password.required"))
  });

  const form = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    mutation.mutate(data, {
      onSuccess: res => {
        const { data, headers } = res;

        dispatch(authActions.login({
          auth: {
            accessToken: headers['access-token'],
            uid: headers['uid'],
            client: headers['client'],
            tokenExpirationDate: headers['expiry'],
            attributes: data.data
          }
        }))
      },
    });
  };

  return (
    <AuthWrapper>
      <LoginForm form={form} onSubmit={onSubmit} />
    </AuthWrapper>
  );
};

export default Login;