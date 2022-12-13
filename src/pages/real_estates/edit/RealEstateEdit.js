import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Stack, Button, useMediaQuery, useTheme, Box, CircularProgress } from '@mui/material';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { realEstatesActions } from "store/real_estates/realEstateSlice";
import useUpdateRealEstateMutation from "hooks/queries/real_estates/useUpdateRealEstateMutation";
import useRealEstateQuery from "hooks/queries/real_estates/useRealEstateQuery";
import API_ENDPOINTS from "constants/endpoints";
import { ChevronLeft } from "@mui/icons-material";
import RealEstate from "../shared/RealEstate";

const RealEstateEdit = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  
  const onClickBackButtonHandler = () => {
    navigate(API_ENDPOINTS.REAL_ESTATES , { replace: true });
  }

  const { setSnackBarAlert } = snackBarAlertActions;
  const { setCurrentPage } = realEstatesActions;

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("real_estates.create_edit.success_updated_title"),
        message: t("real_estates.create_edit.success_updated_message")
      }
    }));
    dispatch(setCurrentPage({currentPage: 1}));
    navigate(API_ENDPOINTS.REAL_ESTATES, { replace: true });
  }

  const onErrorHandler = (data) => {
    const { status, exception, statusText } = data.response;
    
    dispatch(setSnackBarAlert({
      type: "error",
      content: {
        title: statusText,
        subTitle: status,
        message: exception ? exception : "URL not found."
      }
    }));
  }
  
  const { isFetching, data } = useRealEstateQuery(id);
  const { mutate, isLoading } = useUpdateRealEstateMutation(onSuccessHandler, onErrorHandler);

  const content = isFetching ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width: '100%' }}>
      <CircularProgress />
    </Box>
  ) : (
    <RealEstate mutate={mutate} item={data?.data} isLoading={isLoading} />
  );

  return (
    <Stack spacing={5}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{xs: "center"}} spacing={2}>
        <Typography variant='h4'>{t("real_estates.create_edit.title_edit")}</Typography>
        <Button fullWidth={isDownSm} variant="contained" size='small' onClick={onClickBackButtonHandler} startIcon={<ChevronLeft />}>
          {t("global.back")}
        </Button>
      </Stack>
      {content}
    </Stack>
  );
}

export default RealEstateEdit;