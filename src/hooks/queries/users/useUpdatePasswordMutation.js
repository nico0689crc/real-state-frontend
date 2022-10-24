import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const usersQueryServices = new QueryService(null, pathRequireAuthentication);

const useUpdatePasswordMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(
    ({id, data}) => usersQueryServices.updateCustom(`${API_ENDPOINTS.USERS}/${id}/update_password`, data), {
      onSuccess: (data) => onSuccessHandler(data),
      onError: (data) => onErrorHandler(data)
    }
  );
};

export default useUpdatePasswordMutation;