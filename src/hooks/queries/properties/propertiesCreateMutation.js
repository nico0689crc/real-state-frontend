import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIES, pathRequireAuthentication);

const useCreatePropertyMutation = () => {
  const navigate = useNavigate();
  return useMutation(
    (data) => propertiesQueryServices.create(API_ENDPOINTS.PROPERTIES, data),
    {
      onSuccess: () => {
        navigate(API_ENDPOINTS.PROPERTIES, { replace: true });
      },
    }
  );
};

export default useCreatePropertyMutation;