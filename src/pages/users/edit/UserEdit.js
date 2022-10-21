import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useUpdateUserMutation from "hooks/queries/users/useUpdateUserMutation";
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { usersActions } from "store/users/usersSlice";
import Users from "pages/users/shared/Users";

const UserEdit = ({user, openDialog = false, setOpenDialog = () => {}}) => {
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSnackBarAlert } = snackBarAlertActions;
  const { setRefetch } = usersActions;

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("users.create_edit.success_updated_title"),
        message: t("users.create_edit.success_updated_message")
      }
    }));
    dispatch(setRefetch(true));
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
    } else {
      setError(response.data);
    }
  } 

  const { mutate, isLoading } = useUpdateUserMutation(onSuccessHandler, onErrorHandler);
  
  return <Users error={error} mutate={mutate} isLoading={isLoading} item={user} openDialog={openDialog} setOpenDialog={setOpenDialog}/>;
}

export default UserEdit;