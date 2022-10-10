import { useQuery } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIES, true);

export const fetchProperty = async ({ queryKey }) => {
  const { data } = await propertiesQueryServices.findOne(queryKey[1]);
  return { data };
};

const usePropertyQuery = propertyId => {
  return useQuery([API_ENDPOINTS.PROPERTIES, propertyId], fetchProperty, {
    refetchOnWindowFocus: false,
  });
};

export default usePropertyQuery;
