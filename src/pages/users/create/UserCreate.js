import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useCreateUserMutation from "hooks/queries/users/useCreateUserMutation";
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import { usersActions } from "store/users/usersSlice";
import Users from "pages/users/shared/Users";

const UserCreate = ({ setOpenDialog, openDialog }) => {
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSnackBarAlert } = snackBarAlertActions;
  const { setRefetch } = usersActions;

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("users.create_edit.success_created_title"),
        message: t("users.create_edit.success_created_message")
      }
    }));
    setOpenDialog();
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
  
      setOpenDialog();
    } else {
      setError(response.data);
    }
  } 

  const { mutate, isLoading } = useCreateUserMutation(onSuccessHandler, onErrorHandler);
  
  return (
    <Users
      error={error} 
      mutate={mutate} 
      isLoading={isLoading}
      setOpenDialog={setOpenDialog}
      openDialog={openDialog}
    />
  );
}

export default UserCreate;