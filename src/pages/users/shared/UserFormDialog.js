import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';

const UserFormDialog = ({headerContent, bodyContent, footerContent, openDialog, setOpenDialog, resetDefaultValues}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={openDialog}
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