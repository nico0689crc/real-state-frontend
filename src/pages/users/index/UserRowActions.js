import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { DeleteTwoTone, VisibilityTwoTone, CreateTwoTone, MoreVert } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { usersActions, FORM_TYPES } from "store/users/usersSlice";
import UserDelete from 'pages/users/delete/UserDelete';
import UserShow from 'pages/users/show/UserShow';
import UserEdit from 'pages/users/edit/UserEdit';
import Dropdown from "components/ui/Dropdown/Dropdown";

const DesktopRowActions = ({
  user,
  openDeleteDialog, 
  openEditDialog,
  openShowDialog,
  onDeleteHandler,
  onEditHandler,
  onShowHandler
}) => {
  return (
    <>
      <IconButton color="success" aria-label="show" onClick={onShowHandler}>
        <VisibilityTwoTone />
      </IconButton>
      <IconButton color="warning" aria-label="edit" onClick={onEditHandler}>
        <CreateTwoTone />
      </IconButton>
      <IconButton color="error" aria-label="delete" onClick={onDeleteHandler}>
        <DeleteTwoTone />
      </IconButton>
      <UserDelete user={user} handleToggleDeleteDialog={onDeleteHandler} openDeleteDialog={openDeleteDialog} />
      <UserShow user={user} handleToggleShowDialog={onShowHandler} openShowDialog={openShowDialog} />
      <UserEdit user={user} setOpenDialog={onEditHandler} openDialog={openEditDialog} />
    </>
  );
}

const MobileRowActions = ({
  user,
  openDeleteDialog, 
  openEditDialog,
  openShowDialog,
  onDeleteHandler,
  onEditHandler,
  onShowHandler
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton 
        onClick={handleToggle} 
        ref={anchorRef} 
        aria-controls={open ? 'menu-list-grow' : undefined} 
        aria-haspopup="true"
      >
        <MoreVert stroke={1.5} size="1.5rem" />
      </IconButton>
      <Dropdown
        open={open}
        anchorRef={anchorRef}
        handleClose={handleClose}
        placement="left"
        items={[{
          label: t("global.show"),
          onClick: onShowHandler,
          icon: <VisibilityTwoTone stroke={1.5} size="1.3rem" />,
          additionalElement: (
            <UserShow user={user} handleToggleShowDialog={onShowHandler} openShowDialog={openShowDialog} />
          )
        }, {
          label: t("global.edit"),
          onClick: onEditHandler,
          icon: <CreateTwoTone stroke={1.5} size="1.3rem" />,
          additionalElement: (
            <UserEdit user={user} setOpenDialog={onEditHandler} openDialog={openEditDialog} />
          )
        }, {
          label: t("global.delete"),
          onClick: onDeleteHandler,
          icon: <DeleteTwoTone stroke={1.5} size="1.3rem" />,
          additionalElement: (
            <UserDelete user={user} handleToggleDeleteDialog={onDeleteHandler} openDeleteDialog={openDeleteDialog} />
          )
        }]}
      />
    </>
  )
};

const UserRowActions = ({ user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
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

  const properties = {
    user,
    ...{ openDeleteDialog, openEditDialog, openShowDialog, onDeleteHandler, onEditHandler, onShowHandler }
  };

  return isDownSm ? <MobileRowActions {...properties} /> : <DesktopRowActions {...properties} />;
}

export default UserRowActions;