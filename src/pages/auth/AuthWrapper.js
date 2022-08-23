import { Box, Stack } from '@mui/material';

const AuthWrapper = ({children}) => {
  return (
    <Box sx={{ height: '100vh', width: '100vw', padding: 2 }}>
      <Stack 
        justifyContent='center' 
        alignItems='center' 
        sx={{width: '100%', height: '100%'}}>
          {children}
      </Stack>
    </Box>
  )
}

export default AuthWrapper;