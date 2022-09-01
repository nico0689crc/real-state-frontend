import { useMutation, queryClient } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const pathRequireAuthentication = true;
const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIES, pathRequireAuthentication);

const useCreatePropertyMutation = () => {
  return useMutation(
    (data) => propertiesQueryServices.create(API_ENDPOINTS.PROPERTIES, data),
    {
      onSuccess: () => {
        console.log("Creado!");
        // router.push(`/${router?.query?.shop}${ROUTES.PRODUCTS}`);
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PROPERTIES);
      },
    }
  );
};

export default useCreatePropertyMutation;