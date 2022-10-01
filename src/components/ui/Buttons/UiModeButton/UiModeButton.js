import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { uisActions } from 'store/uiSlice';
import { UI_VARIABLES } from "constants/ui";
import { IconSun, IconMoon } from '@tabler/icons';

const UiModeButton = (props) => {
  const { mode } = useSelector(state => state.uiStore);
  const dispatch = useDispatch();
  const handleUiMode = () => {
    dispatch(uisActions.changeModeUi())
  };

  return (
    <IconButton onClick={handleUiMode} {...props}>
      { mode === UI_VARIABLES.UI_MODE_DARK ? <IconSun stroke={1.5} size="1.5rem" /> : <IconMoon stroke={1.5} size="1.5rem" /> }
    </IconButton>
  )
}

export default UiModeButton