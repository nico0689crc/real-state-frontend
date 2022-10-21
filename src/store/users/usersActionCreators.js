import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usersActions } from "store/users/usersSlice";
import useUsersQuery from "hooks/queries/users/useUsersQuery";

export const retrieveUsersActionCreator = ({currentPage, pageSize = "9"}) => {
  return async dispatch => {
    const { refetch, users, currentPage } = useSelector(state => state.usersStore);
    const { isFetching, data, error, refetch: refetchUsers } = useUsersQuery({ page: { size: pageSize, number: currentPage } });
    
    useEffect(() => {
      dispatch(usersActions.setIsFetching({ isFetching }));
    },[isFetching, dispatch]);

    useEffect(() => {
      data && dispatch(usersActions.setTotalUsers({totalUsers: data.meta.total}));
      data && dispatch(usersActions.setUsers({users: data.data}));
      data && dispatch(usersActions.setUsersTotalPage({totalPages: data.meta.pages}));
    },[data, dispatch]);

    useEffect(() => {
      error && dispatch(usersActions.setError({ error }));
    },[error, dispatch]);

    useEffect(() => {
      if(refetch) {
        if(users.length === 1 && currentPage > 1){
          dispatch(usersActions.setCurrentPage({currentPage: (currentPage - 1)}))
        } else {
          refetchUsers();
        }
        dispatch(usersActions.setRefetch(false));
      }
    },[refetch, dispatch, refetchUsers, currentPage, users]);
  };
};