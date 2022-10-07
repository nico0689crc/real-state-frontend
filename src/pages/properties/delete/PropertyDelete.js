import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { DeleteOutlineOutlined, Close } from '@mui/icons-material';
import useDestroyPropertyMutation from "hooks/queries/properties/useDestroyPropertyMutation"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { propertiesActions } from "store/properties/propertiesSlice";

const PropertiesDelete = ({ property, handleToggleDeleteDialog, openDeleteDialog }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSnackBarAlert } = snackBarAlertActions;
  const { setRefetch } = propertiesActions;

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("properties.delete.success_title"),
        message: t("properties.delete.success_message")
      }
    }));
    handleToggleDeleteDialog();
    dispatch(setRefetch(true));
  }

  const onErrorHandler = (data) => {
    const { status, exception, error } = data.response.data;
    
    dispatch(setSnackBarAlert({
      type: "error",
      content: {
        title: error,
        subTitle: status,
        message: exception
      }
    }));

    handleToggleDeleteDialog();
  }

  const { mutate: detroyProperty, isLoading } = useDestroyPropertyMutation(onSuccessHandler, onErrorHandler);

  const handleDeleteProperty = () => {
    detroyProperty(property.id);
  }

  return (
    <Dialog
      open={openDeleteDialog}
      onClose={handleToggleDeleteDialog}
      maxWidth="xs"
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{t('properties.delete.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Trans i18nKey="properties.delete.content">
            You are about to delete the property <strong>{{name: property.title}}</strong>. Do you want to continue this action?
          </Trans>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton 
          variant="contained" 
          loading={isLoading}
          loadingPosition="start" 
          startIcon={<DeleteOutlineOutlined />}
          onClick={handleDeleteProperty}
        >
          {isLoading ? t("global.deleting") : t("global.delete")}
        </LoadingButton>
        <Button variant="outlined" onClick={handleToggleDeleteDialog} startIcon={<Close />}>{t("global.discard")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PropertiesDelete;