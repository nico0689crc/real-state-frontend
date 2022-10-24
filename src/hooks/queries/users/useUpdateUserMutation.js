import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const usersQueryServices = new QueryService(API_ENDPOINTS.USERS, pathRequireAuthentication);

const useUpdateUserMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(
    ({id, data}) => usersQueryServices.update(id, data), {
      onSuccess: (data) => onSuccessHandler(data),
      onError: (data) => onErrorHandler(data)
    }
  );
};

export default useUpdateUserMutation;