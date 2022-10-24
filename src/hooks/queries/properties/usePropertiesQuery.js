import { useQuery } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIES, true);

export const fetchProperties = async ({ queryKey }) => {
  const { data, meta } =  await propertiesQueryServices.find(queryKey[1]);
  return { data, meta };
};

const usePropertiesQuery = params => {
  return useQuery([API_ENDPOINTS.PROPERTIES, params], fetchProperties, {
    refetchOnWindowFocus: false,
  });
};

export default usePropertiesQuery;
