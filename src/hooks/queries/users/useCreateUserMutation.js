import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const usersQueryServices = new QueryService(API_ENDPOINTS.USERS, pathRequireAuthentication);

const useCreateUserMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(
    ({ data }) => usersQueryServices.create(API_ENDPOINTS.USERS, data), {
      onSuccess: () => onSuccessHandler(),
      onError: (data) => onErrorHandler(data)
    }
  );
};

export default useCreateUserMutation;