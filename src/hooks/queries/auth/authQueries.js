import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";



export const useLoginMutation = (onSuccessHandler, onErrorHandler) => {
  const loginQueryServices = new QueryService(API_ENDPOINTS.LOGIN);

  return useMutation(input => loginQueryServices.login(input),{
    onSuccess: (data) => onSuccessHandler(data),
    onError: (data) => onErrorHandler(data)
  });
};

export const useResetPasswordMutation = (onSuccessHandler, onErrorHandler) => {
  const resetPasswordQueryServices = new QueryService(API_ENDPOINTS.RESET_PASSWORD);

  return useMutation(input => resetPasswordQueryServices.resetPassword(input),{
    onSuccess: (data) => onSuccessHandler(data),
    onError: (data) => onErrorHandler(data)
  });
};

export const useResetPasswordEditMutation = (onSuccessHandler, onErrorHandler, headers) => {
  const pathRequireAuthentication = false;
  const resetPasswordEditQueryServices = new QueryService(API_ENDPOINTS.RESET_PASSWORD, pathRequireAuthentication, headers);

  return useMutation(input => resetPasswordEditQueryServices.resetPasswordEdit(input),{
    onSuccess: (data) => onSuccessHandler(data),
    onError: (data) => onErrorHandler(data)
  });
};
