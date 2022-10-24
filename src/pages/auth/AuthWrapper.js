import { Box, Stack } from '@mui/material';
import TranslationButton from 'components/ui/Buttons/TranslationButton/TranslationButton';
import UiModeButton from 'components/ui/Buttons/UiModeButton/UiModeButton';

const AuthWrapper = ({children}) => {
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ position:'absolute', top: '1.5rem', right: '2rem'}}>
        <UiModeButton className='MuiIconButtonCustomized MuiIconButtonRounded'/>
        <TranslationButton />
      </Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', padding: { xs: 0, md: 2 } }}>
        {children}
      </Box>
    </>
  )
}

export default AuthWrapper;