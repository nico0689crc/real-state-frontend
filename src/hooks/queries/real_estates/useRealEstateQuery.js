import { useQuery } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const realEstateQueryServices = new QueryService(API_ENDPOINTS.REAL_ESTATES, true);

export const fetchRealEstate = async ({ queryKey }) => {
  const { data } = await realEstateQueryServices.findOne(queryKey[1]);
  return { data };
};

const useRealEstateQuery = id => {
  return useQuery([API_ENDPOINTS.REAL_ESTATES, id], fetchRealEstate, {
    refetchOnWindowFocus: false,
  });
};

export default useRealEstateQuery;
