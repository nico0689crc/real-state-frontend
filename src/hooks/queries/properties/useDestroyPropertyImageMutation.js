import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const propertiesQueryServices = new QueryService(null, pathRequireAuthentication);

const useDestroyPropertyImageMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(({ property_id, media_id }) => {
    return propertiesQueryServices.deleteCustom(`${API_ENDPOINTS.PROPERTIES}/${property_id}/medias/${media_id}`);
  }, {
    onSuccess: () => onSuccessHandler(),
    onError: (data) => onErrorHandler(data)
  });
};

export default useDestroyPropertyImageMutation;