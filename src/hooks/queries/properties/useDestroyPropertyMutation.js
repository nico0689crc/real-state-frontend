import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIES, pathRequireAuthentication);

const useDestroyPropertyMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation((id) => propertiesQueryServices.delete(`${API_ENDPOINTS.PROPERTIES}/${id}`), {
    onSuccess: () => onSuccessHandler(),
    onError: (data) => onErrorHandler(data)
  });
};

export default useDestroyPropertyMutation;