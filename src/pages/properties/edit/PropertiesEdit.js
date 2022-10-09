import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress, Typography } from '@mui/material';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { propertiesActions } from "store/properties/propertiesSlice";
import Properties from "pages/properties/shared/Properties";
import useUpdatePropertyMutation from "hooks/queries/properties/useUpdatePropertyMutation";
import usePropertyQuery from "hooks/queries/properties/usePropertyQuery";
import API_ENDPOINTS from "constants/endpoints";

const PropertiesEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: propertyId } = useParams();
  const { t } = useTranslation();

  const { setSnackBarAlert } = snackBarAlertActions;
  const { setCurrentPage } = propertiesActions;

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("properties.create_edit.success_created_title"),
        message: t("properties.create_edit.success_created_message")
      }
    }));
    dispatch(setCurrentPage({currentPage: 1}));
    navigate(API_ENDPOINTS.PROPERTIES, { replace: true });
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

  const { data, isFetching: isFetchingQuery } = usePropertyQuery(propertyId);
  const { mutate, isFetching: isFetchingMutate } = useUpdatePropertyMutation(onSuccessHandler, onErrorHandler);

  const content = isFetchingQuery ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width: '100%' }}>
      <CircularProgress />
    </Box>
  ) : (
    <Properties mutate={mutate} item={data?.data} isLoading={isFetchingMutate} />
  );

  return (
    <>
      <Typography sx={{ mb: 3 }} variant='h4'>{t("properties.create_edit.title_edit")}</Typography>
      {content}
    </>
  ); 
};

export default PropertiesEdit;