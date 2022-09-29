import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import { Avatar, Stack, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authActions } from 'store/authSlice';
import { uisActions, UI_VARIABLES } from 'store/uiSlice';
import API_ENDPOINTS from "constants/endpoints";
import User1 from 'assets/images/users/user-round.svg';
import { IconLogout, IconSettings, IconSun, IconMoon } from '@tabler/icons';
import Dropdown from 'components/custom/Dropdown/Dropdown';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { mode } = useSelector(state => state.uiStore)

  const handleLogout = async () => {
    dispatch(authActions.logout());
    navigate(API_ENDPOINTS.ROOT);
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

  const handleUiMode = () => {
    dispatch(uisActions.changeModeUi())
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Avatar
          src={User1}
          sx={{ ...theme.typography.mediumAvatar, cursor: 'pointer' }}
        />
        <IconButton onClick={handleUiMode} ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true">
          { mode === UI_VARIABLES.UI_MODE_DARK ?  <IconSun stroke={1.5} size="1.5rem" /> : <IconMoon stroke={1.5} size="1.5rem" /> }
        </IconButton>
        <IconButton onClick={handleToggle} ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true"><IconSettings stroke={1.5} size="1.5rem" /></IconButton>
        <Dropdown
          open={open}
          anchorRef={anchorRef}
          handleClose={handleClose}
          items={[{
            label: t("header.profile_section.account_setting"),
            onClick: () => { },
            icon: <IconSettings stroke={1.5} size="1.3rem" />
          }, {
            label: t("header.profile_section.logout"),
            onClick: handleLogout,
            icon: <IconLogout stroke={1.5} size="1.3rem" />
          }]}
        />
      </Stack>
    </>
  );
};

export default ProfileSection;
