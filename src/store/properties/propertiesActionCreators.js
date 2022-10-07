import { useEffect } from "react";
import { useSelector } from "react-redux";
import { propertiesActions } from "store/properties/propertiesSlice";
import usePropertiesQuery from "hooks/queries/properties/usePropertiesQuery";

export const retrievePropertiesActionCreator = ({currentPage, pageSize = "2"}) => {
  return async dispatch => {
    const { refetch, properties, currentPage } = useSelector(state => state.propertiesStore);
    const { isFetching, data, error, refetch: refetchProperties } = usePropertiesQuery({ page: { size: pageSize, number: currentPage } });

    useEffect(() => {
      dispatch(propertiesActions.setIsFetching({ isFetching }));
    },[isFetching, dispatch]);

    useEffect(() => {
      data && dispatch(propertiesActions.setProperties({properties: data.data}));
      data && dispatch(propertiesActions.setPropertiesTotalPage({totalPages: data.meta.pages}));
    },[data, dispatch]);

    useEffect(() => {
      error && dispatch(propertiesActions.setError({ error }));
    },[error, dispatch]);

    useEffect(() => {
      if(refetch) {
        if(properties.length === 1 && currentPage > 1){
          dispatch(propertiesActions.setCurrentPage({currentPage: (currentPage - 1)}))
        } else {
          refetchProperties();
        }
        dispatch(propertiesActions.setRefetch(false));
      }
    },[refetch, dispatch, refetchProperties, currentPage, properties]);
  };
};