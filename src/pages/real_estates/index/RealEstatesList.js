import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMediaQuery, useTheme } from '@mui/material';
import { Typography, Box, Pagination, CircularProgress, Grid, Stack, Button } from '@mui/material';
import { Add } from "@mui/icons-material";
import { realEstatesActions } from "store/real_estates/realEstateSlice";
import { retrieveRealEstatesActionCreator } from "store/real_estates/realEstateActionCreators";
import RealEstateItem from './RealEstatesItem';
import API_ENDPOINTS from "constants/endpoints";

const RealEstateList = () => {
  let content;
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { realEstates, currentPage, isFetching, totalPages, error } = useSelector(state => state.realEstatesStore);
  
  dispatch(retrieveRealEstatesActionCreator({currentPage}));

  const paginationOnChangeHandler = useCallback((event, page) => {
    dispatch(realEstatesActions.setCurrentPage({ currentPage: page }));
  }, [dispatch]);

  const createRealEstateHandler = () => {
    navigate(API_ENDPOINTS.CREATE_REAL_ESTATES);
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
    content = realEstates.length > 0 ? (
      <Stack spacing={2}>
        <Grid container rowSpacing={2} columnSpacing={{xs: 0, md: 2}} sx={{ width: '100%' }}>
          {realEstates.map((real_estate, index) => (
            <RealEstateItem real_estate={real_estate} key={index} />
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
        <Typography variant='h4'>{t("real_estates.index.title")}</Typography>
        {!error && (
          <Button variant="contained" size='small' onClick={createRealEstateHandler} startIcon={<Add />}>
            {t("real_estates.create_edit.title_create")}
          </Button>
        )}
      </Stack>
      { content }
    </Stack>
  );
}

export default RealEstateList;