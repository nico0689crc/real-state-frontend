import { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Box, Pagination, CircularProgress, Grid } from '@mui/material';
import { propertiesActions } from "store/properties/propertiesSlice";
import { retrievePropertiesActionCreator } from "store/properties/propertiesActionCreators";
import PropertyItem from "./PropertyItem";

const PropertiesList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { properties, currentPage, isFetching, totalPages, error } = useSelector(state => state.propertiesStore);

  dispatch(retrievePropertiesActionCreator({currentPage}));

  const paginationOnChangeHandler = useCallback((event, page) => {
    dispatch(propertiesActions.setCurrentPage({ currentPage: page }));
  }, [dispatch]);

  if (error) {
    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width: '100%' }}>
      <Typography sx={{ margin: 0 }} variant='h4'>Error!</Typography>
    </Box>;
  }

  if (isFetching) {
    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width: '100%' }}>
      <CircularProgress />
    </Box>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'start' }}>
        <Typography sx={{ marginBottom: 3 }} variant='h4'>{t("properties.index.title")}</Typography>
      </Box>
      {properties.length > 0 ? (
        <>
          <Grid container spacing={2} sx={{ width: '100%', marginBottom: 3 }}>
            {properties.map((property, index) => (
              <PropertyItem property={property} key={index} />
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              onChange={paginationOnChangeHandler}
              count={totalPages}
              color="primary"
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
              page={currentPage}
              boundaryCount={2} />
          </Box>
        </>
      ) : <Typography sx={{ margin: 0 }} variant='h4'>No Data</Typography>}
    </Box>
  );
};

export default PropertiesList;