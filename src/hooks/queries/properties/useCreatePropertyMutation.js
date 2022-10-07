import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIESasd, pathRequireAuthentication);

const useCreatePropertyMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(
    (data) => propertiesQueryServices.create(API_ENDPOINTS.PROPERTIES, data), {
      onSuccess: () => onSuccessHandler(),
      onError: (data) => onErrorHandler(data)
    }
  );
};

export default useCreatePropertyMutation;