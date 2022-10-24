import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIES, pathRequireAuthentication);

const useCreatePropertyMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(
    ({ data }) => propertiesQueryServices.create(data), {
      onSuccess: () => onSuccessHandler(),
      onError: (data) => onErrorHandler(data)
    }
  );
};

export default useCreatePropertyMutation;