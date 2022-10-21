import { useQuery } from "react-query";
import { QueryService } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const usersQueryServices = new QueryService(API_ENDPOINTS.USERS, true);

export const fetchUsers = async ({ queryKey, pageParam }) => {
  const { data, meta } = pageParam ? await usersQueryServices.get(pageParam) : await usersQueryServices.find(queryKey[1]);
  return { data, meta };
};

const useUsersQuery = params => {
  return useQuery([API_ENDPOINTS.USERS, params], fetchUsers, {
    refetchOnWindowFocus: false,
  });
};

export default useUsersQuery;
