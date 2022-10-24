import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useTheme } from '@mui/material/styles';
import { Avatar, Stack, IconButton } from '@mui/material';
import { authActions } from 'store/authSlice';
import API_ENDPOINTS from "constants/endpoints";
import Dropdown from 'components/ui/Dropdown/Dropdown';
import UiModeButton from 'components/ui/Buttons/UiModeButton/UiModeButton';
import TranslationButton from 'components/ui/Buttons/TranslationButton/TranslationButton';
import { Logout, Settings, ManageAccounts } from '@mui/icons-material';

const ProfileSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const { t,  } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {attributes: { first_name, last_name, image }} = useSelector(state => state.authStore); 

  const handleLogout = async () => {
    dispatch(authActions.logout());
    navigate(API_ENDPOINTS.ROOT);
  };

  const handleMyProfile = async () => {
    navigate(API_ENDPOINTS.USERS_PROFILE);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Avatar src={image} sx={{ ...theme.typography.mediumAvatar, cursor: 'pointer' }} />
        <TranslationButton />
        <UiModeButton className='MuiIconButtonCustomized'/>
        <IconButton className='MuiIconButtonCustomized' onClick={handleToggle} ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true"><Settings /></IconButton>
      </Stack>
      <Dropdown
        open={open}
        anchorRef={anchorRef}
        handleClose={handleClose}
        headerTitle={`${last_name}, ${first_name}`}
        items={[{
          label: t("header.profile_section.my_profile"),
          onClick: handleMyProfile,
          icon: <ManageAccounts />
        }, {
          label: t("header.profile_section.logout"),
          onClick: handleLogout,
          icon: <Logout />
        }]}
      />
    </>
  );
};

export default ProfileSection;
