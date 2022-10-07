import { useQuery } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIES, true);

export const fetchProperties = async ({ queryKey, pageParam }) => {
  const params = queryKey[1];
  let fetchedData;
  if (pageParam) {
    fetchedData = await propertiesQueryServices.get(pageParam);
  } else {
    fetchedData = await propertiesQueryServices.find(params);
  }
  const { data, meta } = fetchedData;

  return { data, meta };
};
const usePropertiesQuery = params => {
  return useQuery([API_ENDPOINTS.PROPERTIES, params], fetchProperties, {
    refetchOnWindowFocus: false,
  });
};

export default usePropertiesQuery;
