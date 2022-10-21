import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';

const UserFormDialog = ({headerContent, bodyContent, footerContent, openDialog=false, setOpenDialog}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggleDialog = (reason) => {
    if(reason !== "escapeKeyDown" && reason !== "backdropClick") {
      setOpenDialog();
    }
  }

  return (
    <Dialog
      open={openDialog}
      onClose={(event, reason) => handleToggleDialog(reason)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth="md"
      fullScreen={fullScreen}
    >
      <DialogTitle>{headerContent}</DialogTitle>
      <DialogContent>{bodyContent}</DialogContent>
      <DialogActions>{footerContent}</DialogActions>
    </Dialog>
  )
}

export default UserFormDialog;