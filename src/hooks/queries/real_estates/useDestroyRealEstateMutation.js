import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const realEstateQueryServices = new QueryService(API_ENDPOINTS.REAL_ESTATES, pathRequireAuthentication);

const useDestroyRealEstateMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation((id) => realEstateQueryServices.delete(id), {
    onSuccess: () => onSuccessHandler(),
    onError: (data) => onErrorHandler(data)
  });
};

export default useDestroyRealEstateMutation;