import { useQuery } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const realEstatesQueryServices = new QueryService(API_ENDPOINTS.REAL_ESTATES, true);

export const fetchRealEstates = async ({ queryKey }) => {
  const { data, meta } = await realEstatesQueryServices.find(queryKey[1]);
  return { data, meta };
};

const useRealEstatesQuery = params => {
  return useQuery([API_ENDPOINTS.REAL_ESTATES, params], fetchRealEstates, {
    refetchOnWindowFocus: false,
  });
};

export default useRealEstatesQuery;
