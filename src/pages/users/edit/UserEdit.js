import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useUpdateUserMutation from "hooks/queries/users/useUpdatePasswordMutation";
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { usersActions } from "store/users/usersSlice";
import { authActions } from "store/authSlice";
import Users from "pages/users/shared/Users";

const UserEdit = ({user, openDialog, setOpenDialog, isDialog = true, isProfileUpdate = false }) => {

  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSnackBarAlert } = snackBarAlertActions;
  const { setRefetch } = usersActions;

  const onSuccessHandler = ({data}) => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("users.create_edit.success_updated_title"),
        message: t("users.create_edit.success_updated_message")
      }
    }));

    if(isDialog){
      setOpenDialog();
      dispatch(setRefetch(true));
    } else {
      dispatch(authActions.setAttributes({attributes: data}));
    }
  }

  const onErrorHandler = ({response}) => {
    if(response.status === 500) {
      const { status, exception, error } = response.data;
    
      dispatch(setSnackBarAlert({
        type: "error",
        content: {
          title: error,
          subTitle: status,
          message: exception
        }
      }));
      isDialog && setOpenDialog();
    } else {
      setError(response.data);
    }
  } 

  const { mutate, isLoading } = useUpdateUserMutation(onSuccessHandler, onErrorHandler);
  
  return (
    <Users 
      error={error} 
      mutate={mutate} 
      isLoading={isLoading} 
      item={user} 
      openDialog={openDialog} 
      setOpenDialog={setOpenDialog}
      isDialog={isDialog}
      isProfileUpdate={isProfileUpdate}
    />
  );
}

export default UserEdit;