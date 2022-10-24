import { useMutation } from "react-query";
import { AuthService } from "lib/AuthService";

export const useLoginMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(input => AuthService.login(input),{
    onSuccess: (data) => onSuccessHandler(data),
    onError: (data) => onErrorHandler(data)
  });
};

export const useRegisterMutation = () => {
  return useMutation(input => AuthService.register(input));
};

export const useForgotPasswordMutation = () => {
  return useMutation(input => AuthService.forgotPassword(input));
};

export const useResetPasswordMutation = () => {
  return useMutation(input => AuthService.resetPassword(input));
};

export const useActivateAccountMutation = () => {
  return useMutation(input => AuthService.activateAccount(input));
};
