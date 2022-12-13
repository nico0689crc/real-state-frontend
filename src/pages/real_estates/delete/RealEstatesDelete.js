import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { DeleteOutlineOutlined, Close } from '@mui/icons-material';
import useDestroyRealEstateMutation from "hooks/queries/real_estates/useDestroyRealEstateMutation";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { realEstatesActions } from "store/real_estates/realEstateSlice";

const RealEstatesDelete = ({ real_estate, handleToggleDeleteDialog, openDeleteDialog }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSnackBarAlert } = snackBarAlertActions;
  const { setRefetch } = realEstatesActions;

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("real_estates.delete.success_title"),
        message: t("real_estates.delete.success_message")
      }
    }));
    handleToggleDeleteDialog();
    dispatch(setRefetch(true));
  }

  const onErrorHandler = (received_data) => {
    const { exception, error, data, message } = received_data.response.data;
    console.log(received_data);
    let title = error;
    let subTitle = received_data.response.status;
    let messages = exception;

    if(message && data?.base.length > 0) {
      title = message;
      messages = data.base[0];
    }
    
    dispatch(setSnackBarAlert({
      type: "error",
      content: {
        title: title,
        subTitle: subTitle,
        message: messages
      }
    }));

    handleToggleDeleteDialog();
  }

  const { mutate: detroyRealEstate, isLoading } = useDestroyRealEstateMutation(onSuccessHandler, onErrorHandler);

  const handleDeleteRealEstate = () => {
    detroyRealEstate(real_estate.id);
  }

  return (
    <Dialog
      open={openDeleteDialog}
      onClose={handleToggleDeleteDialog}
      maxWidth="xs"
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{t('real_estates.delete.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Trans i18nKey="real_estates.delete.content">
            You are about to delete the Real Estate <strong>{{name: real_estate.name}}</strong>. Do you want to continue this action?
          </Trans>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton 
          variant="contained" 
          loading={isLoading}
          loadingPosition="start" 
          startIcon={<DeleteOutlineOutlined />}
          onClick={handleDeleteRealEstate}
        >
          {isLoading ? t("global.deleting") : t("global.delete")}
        </LoadingButton>
        <Button variant="outlined" onClick={handleToggleDeleteDialog} startIcon={<Close />}>{t("global.discard")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RealEstatesDelete;