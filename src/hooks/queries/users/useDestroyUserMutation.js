import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const usersQueryServices = new QueryService(API_ENDPOINTS.USERS, pathRequireAuthentication);

const useDestroyUserMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation((id) => usersQueryServices.delete(`${API_ENDPOINTS.USERS}/${id}`), {
    onSuccess: () => onSuccessHandler(),
    onError: (data) => onErrorHandler(data)
  });
};

export default useDestroyUserMutation;