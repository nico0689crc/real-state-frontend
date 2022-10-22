import { useTranslation } from "react-i18next";
import { AssignmentInd, Business, Cake, Close, Email, PhoneAndroid, Transgender } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, Stack, Avatar, useTheme, useMediaQuery } from '@mui/material';
import DefaultAvatar from 'assets/images/users/default-avatar.png';
import AppTypography from "components/ui/Typography/AppTypography";
import UserAttribute from "./UserAttribute";

const users_roles = {
  user_regular: "Regular",
  super_administrator: "Super Administrator",
  administrator: "Administrator"
}

const UserShow = ({ user, handleToggleShowDialog, openShowDialog }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={openShowDialog}
      onClose={handleToggleShowDialog}
      maxWidth="xs"
      fullScreen={isDownSm}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogContent>
        <Stack spacing={2} alignItems="start">
          <Stack spacing={2} justifyContent="center" alignItems="center" width="100%" mb="1rem">
            <Avatar 
              alt={`${user.last_name}, ${user.first_name}`} 
              src={ user.avatar ?? DefaultAvatar } 
              sx={{ width: 90, height: 90,  backgroundColor: theme.palette.grey[300]}}
            />
            <AppTypography  variant="h6">{`${user.last_name}, ${user.first_name}`}</AppTypography>
          </Stack>
          { user.email && <UserAttribute icon={<Email />} label={user.email} /> }
          { user.phone_number && <UserAttribute icon={<PhoneAndroid />} label={user.phone_number} /> }
          { user.address && <UserAttribute icon={<Business />} label={user.address} /> }
          { user.date_of_birth && <UserAttribute icon={<Cake />} label={user.date_of_birth} /> }
          { user.gender && <UserAttribute icon={<Transgender />} label={user.gender} /> }
          { user.user_role && <UserAttribute icon={<AssignmentInd />} label={users_roles[user.user_role]} /> }
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleToggleShowDialog} startIcon={<Close />}>{t("global.close")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserShow;