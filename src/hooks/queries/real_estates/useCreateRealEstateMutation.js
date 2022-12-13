import { useMutation } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const realEstateQueryServices = new QueryService(API_ENDPOINTS.REAL_ESTATES, pathRequireAuthentication);

const useCreateRealEstateMutation = (onSuccessHandler, onErrorHandler) => {
  return useMutation(
    ({ data }) => realEstateQueryServices.create(data), {
      onSuccess: () => onSuccessHandler(),
      onError: (data) => onErrorHandler(data)
    }
  );
};

export default useCreateRealEstateMutation;