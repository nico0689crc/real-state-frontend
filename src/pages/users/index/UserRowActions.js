import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton } from '@mui/material';
import { DeleteTwoTone, VisibilityTwoTone, CreateTwoTone } from '@mui/icons-material';
import { usersActions, FORM_TYPES } from "store/users/usersSlice";
import UserDelete from 'pages/users/delete/UserDelete';
import UserShow from 'pages/users/show/UserShow';
import UserEdit from 'pages/users/edit/UserEdit';

const UserRowActions = ({ user }) => {
  const dispatch = useDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openShowDialog, setOpenShowDialog] = useState(false);

  const onDeleteHandler = () => {
    setOpenDeleteDialog(prevState => !prevState);
  }

  const onEditHandler = () => {
    setOpenEditDialog(prevState => !prevState);
    dispatch(usersActions.setUserEditFormType({userEditFormType: FORM_TYPES.DIALOG}));
  }

  const onShowHandler = () => {
    setOpenShowDialog(prevState => !prevState);
  }

  return (
    <>
      <IconButton color="success" aria-label="show" onClick={() => onShowHandler()}>
        <VisibilityTwoTone />
      </IconButton>
      <IconButton color="warning" aria-label="edit" onClick={() => onEditHandler()}>
        <CreateTwoTone />
      </IconButton>
      <IconButton color="error" aria-label="delete" onClick={() => onDeleteHandler()}>
        <DeleteTwoTone />
      </IconButton>
      <UserDelete 
        user={user} 
        handleToggleDeleteDialog={onDeleteHandler}
        openDeleteDialog={openDeleteDialog}
      />
      <UserShow 
        user={user} 
        handleToggleShowDialog={onShowHandler}
        openShowDialog={openShowDialog}
      />
      <UserEdit 
        user={user} 
        setOpenDialog={setOpenEditDialog} 
        openDialog={openEditDialog}
      />
    </>
  );
}

export default UserRowActions;