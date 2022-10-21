import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { DeleteOutlineOutlined, Close } from '@mui/icons-material';
import useDestroyUserMutation from "hooks/queries/users/useDestroyUserMutation";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { usersActions } from "store/users/usersSlice";

const UserDelete = ({ user, handleToggleDeleteDialog, openDeleteDialog }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSnackBarAlert } = snackBarAlertActions;
  const { setRefetch } = usersActions;

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("users.delete.success_title"),
        message: t("users.delete.success_message")
      }
    }));
    handleToggleDeleteDialog();
    dispatch(setRefetch(true));
  }

  const onErrorHandler = ({ response }) => {
    let p_title = null;
    let p_message = null;
    const { status } = response;

    if(status === 422) {
      let { data: { message, data } } = response;
      p_title = message;
      p_message = data['message'][0];
    }

    dispatch(setSnackBarAlert({
      type: "error",
      content: {
        title: p_title,
        message: p_message
      }
    }));

    handleToggleDeleteDialog();
  }

  const { mutate: detroyUser, isLoading } = useDestroyUserMutation(onSuccessHandler, onErrorHandler);

  const handleDeleteUser = () => {
    detroyUser(user.id);
  }

  return (
    <Dialog
      open={openDeleteDialog}
      onClose={handleToggleDeleteDialog}
      maxWidth="xs"
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{t('users.delete.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Trans i18nKey="users.delete.content">
            You are about to delete the user <strong>{{name: `${user.last_name}, ${user.first_name}` }}</strong>. Do you want to continue this action?
          </Trans>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton 
          variant="contained" 
          loading={isLoading}
          loadingPosition="start" 
          startIcon={<DeleteOutlineOutlined />}
          onClick={handleDeleteUser}
        >
          {isLoading ? t("global.deleting") : t("global.delete")}
        </LoadingButton>
        <Button variant="outlined" onClick={handleToggleDeleteDialog} startIcon={<Close />}>{t("global.discard")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDelete;