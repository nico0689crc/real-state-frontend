import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Stack, Button, useMediaQuery, useTheme } from '@mui/material';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { realEstatesActions } from "store/real_estates/realEstateSlice";
import useCreateRealEstateMutation from "hooks/queries/real_estates/useCreateRealEstateMutation"
import API_ENDPOINTS from "constants/endpoints";
import { ChevronLeft } from "@mui/icons-material";
import RealEstate from "../shared/RealEstate";

const RealEstateCreate = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const onClickBackButtonHandler = () => {
    navigate(API_ENDPOINTS.REAL_ESTATES , { replace: true });
  }

  const { setSnackBarAlert } = snackBarAlertActions;
  const { setCurrentPage } = realEstatesActions;

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("real_estates.create_edit.success_created_title"),
        message: t("real_estates.create_edit.success_created_message")
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
  
  const { mutate, isLoading } = useCreateRealEstateMutation(onSuccessHandler, onErrorHandler);

  return (
    <Stack spacing={5}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{xs: "center"}} spacing={2}>
        <Typography variant='h4'>{t("real_estates.create_edit.title_create")}</Typography>
        <Button fullWidth={isDownSm} variant="contained" size='small' onClick={onClickBackButtonHandler} startIcon={<ChevronLeft />}>
          {t("global.back")}
        </Button>
      </Stack>
      <RealEstate mutate={mutate} isLoading={isLoading} />
    </Stack>
  );
}

export default RealEstateCreate;