import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const realEstateQueryServices = new QueryService(API_ENDPOINTS.REAL_ESTATES, pathRequireAuthentication);

const useUpdateRealEstateMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(
    ({ id, data }) => realEstateQueryServices.update(id, data), {
      onSuccess: () => onSuccessHandler(),
      onError: (data) => onErrorHandler(data)
    }
  );
};

export default useUpdateRealEstateMutation;