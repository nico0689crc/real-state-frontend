import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Box, Pagination, CircularProgress, Grid, useMediaQuery, useTheme, Stack, Button } from '@mui/material';
import { Add } from "@mui/icons-material";
import { propertiesActions } from "store/properties/propertiesSlice";
import { retrievePropertiesActionCreator } from "store/properties/propertiesActionCreators";
import PropertyItem from "./PropertyItem";
import API_ENDPOINTS from "constants/endpoints";

const PropertiesList = () => {
  let content;
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { properties, currentPage, isFetching, totalPages, error } = useSelector(state => state.propertiesStore);
  
  dispatch(retrievePropertiesActionCreator({currentPage}));

  const paginationOnChangeHandler = useCallback((event, page) => {
    dispatch(propertiesActions.setCurrentPage({ currentPage: page }));
  }, [dispatch]);

  const addPropertyHandler = () => {
    navigate(API_ENDPOINTS.CREATE_PROPERTIES);
  }
  
  if (error) {
    content = (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width: '100%' }}>
        <Typography sx={{ margin: 0 }} variant='h4'>Error!</Typography>
      </Box>
    );
  }

  if (isFetching) {
    content = (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}>
        <CircularProgress />
      </Box>
    );
  } else {
    content = properties.length > 0 ? (
      <Stack spacing={2}>
        <Grid container rowSpacing={2} columnSpacing={{xs: 0, md: 2}} sx={{ width: '100%', marginBottom: 3 }}>
          {properties.map((property, index) => (
            <PropertyItem property={property} key={index} />
          ))}
        </Grid>
        <Stack direction="row" justifyContent="center">
          <Pagination
            onChange={paginationOnChangeHandler}
            count={totalPages}
            color="primary"
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
            page={currentPage}
            siblingCount={isDownSm ? 0 : 1} 
          />
        </Stack>
      </Stack>
    ) : <Typography sx={{ margin: 0 }} variant='h4'>No Data</Typography>
  }

  

  return (
    <Stack spacing={5}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{sm: "center"}} spacing={2}>
        <Typography variant='h4'>{t("properties.index.title")}</Typography>
        {!error && (
          <Button variant="contained" size='small' onClick={addPropertyHandler} startIcon={<Add />}>
            {t("properties.create_edit.title_create")}
          </Button>
        )}
      </Stack>
      { content }
    </Stack>
  );
};

export default PropertiesList;