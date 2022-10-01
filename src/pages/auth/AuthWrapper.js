import { Box } from '@mui/material';
import UiModeButton from 'components/ui/Buttons/UiModeButton/UiModeButton';

const AuthWrapper = ({children}) => {
  return (
    <>
      <Box sx={{ position:'absolute', top: '1.5rem', right: '2rem'}}>
        <UiModeButton className='MuiIconButtonCustomized MuiIconButtonRounded'/>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', padding: 2 }}>
        {children}
      </Box>
    </>
  )
}

export default AuthWrapper;