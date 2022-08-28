import { forwardRef } from 'react';
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles';
import { UI_VARIABLES } from 'store/uiSlice'
import { Avatar, ButtonBase } from '@mui/material';

const CallToActionButton = forwardRef(({ icon, onClickHandler, sx = {}, ...props }, ref) => {
  const theme = useTheme();
  const borderRadius = useSelector(state => state.uiStore.borderRadius);
  return (
    <ButtonBase
      sx={{
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden'
      }}
      ref={ref}
      onClick={onClickHandler}
      {...props}
    >
      <Avatar
        variant="rounded"
        sx={{
          ...theme.typography.commonAvatar,
          ...theme.typography.mediumAvatar,
          transition: 'all .2s ease-in-out',
          backgroundColor: theme.palette.mode === UI_VARIABLES.UI_MODE_DARK ? theme.palette.background.paper : theme.palette.primary[100],
          color: theme.palette.mode === UI_VARIABLES.UI_MODE_DARK ? theme.palette.grey[100] : theme.palette.primary.main,
          '&:hover': {
            background: theme.palette.mode === UI_VARIABLES.UI_MODE_DARK ? theme.palette.primary[50] : theme.palette.primary[300],
            color: UI_VARIABLES.UI_MODE_DARK ? theme.palette.primary[400] : theme.palette.primary[900],
          },
          ...sx
        }}
      >
        {icon}
      </Avatar>
    </ButtonBase>
  );
});

export default CallToActionButton;