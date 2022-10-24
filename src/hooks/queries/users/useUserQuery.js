import { useQuery } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const userQueryServices = new QueryService(API_ENDPOINTS.USERS, true);

export const fetchUser = async ({ queryKey }) => {
  const { data } = await userQueryServices.findOne(queryKey[1]);
  return { data };
};

const useUserQuery = id => {
  return useQuery([API_ENDPOINTS.USERS, id], fetchUser, {
    refetchOnWindowFocus: false,
  });
};

export default useUserQuery;
