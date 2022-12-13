import { useEffect } from "react";
import { useSelector } from "react-redux";
import { realEstatesActions } from "store/real_estates/realEstateSlice";
import useRealEstatesQuery from "hooks/queries/real_estates/useRealEstatesQuery";

export const retrieveRealEstatesActionCreator = ({ pageSize = "9"}) => {
  return async dispatch => {
    const { refetch, realEstates, currentPage } = useSelector(state => state.realEstatesStore);
    const { isFetching, data, error, refetch: refetchRealEstates } = useRealEstatesQuery({ page: { size: pageSize, number: currentPage } });

    useEffect(() => {
      dispatch(realEstatesActions.setIsFetching({ isFetching }));
    },[isFetching, dispatch]);

    useEffect(() => {
      if(data) {
        dispatch(realEstatesActions.setRealEstate({realEstates: data.data}));
        dispatch(realEstatesActions.setRealEstateTotalPage({totalPages: data.meta.pages}));
      }

    },[data, dispatch]);

    useEffect(() => {
      error && dispatch(realEstatesActions.setError({ error }));
    },[error, dispatch]);

    useEffect(() => {
      if(refetch) {
        if(realEstates.length === 1 && currentPage > 1){
          dispatch(realEstatesActions.setCurrentPage({currentPage: (currentPage - 1)}))
        } else {
          refetchRealEstates();
        }
        dispatch(realEstatesActions.setRefetch(false));
      }
    },[refetch, dispatch, refetchRealEstates, currentPage, realEstates]);
  };
};