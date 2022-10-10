import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography } from '@mui/material';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { propertiesActions } from "store/properties/propertiesSlice";
import Properties from "pages/properties/shared/Properties";
import useCreatePropertyMutation from "hooks/queries/properties/useCreatePropertyMutation";
import API_ENDPOINTS from "constants/endpoints";

const PropertiesCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  
  const { mutate, isLoading } = useCreatePropertyMutation(onSuccessHandler, onErrorHandler);

  return (
    <>
      <Typography sx={{ mb: 3 }} variant='h4'>{t("properties.create_edit.title_create")}</Typography>
      <Properties mutate={mutate} isLoading={isLoading} />
    </>
  ); 
};

export default PropertiesCreate;