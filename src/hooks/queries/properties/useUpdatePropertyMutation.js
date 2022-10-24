import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIES, pathRequireAuthentication);

const useUpdatePropertyMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(
    ({ id, data }) => propertiesQueryServices.update(id, data), {
      onSuccess: () => onSuccessHandler(),
      onError: (data) => onErrorHandler(data)
    }
  );
};

export default useUpdatePropertyMutation;