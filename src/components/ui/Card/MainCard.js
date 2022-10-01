import { Card, CardHeader, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MainCard = ({ title, headerSX = {}, content = true, contentSX = {}, children }) => {
  const theme = useTheme();

  return(
    <Card sx={{ borderRadius: 2, padding: 3, boxShadow: '3.3px 3.7px 22.5px rgb(0 0 0 / 7%)'}}>
      {title && (
        <CardHeader sx={{ padding: '0', ...headerSX }} title={
          <Typography variant='h4' sx={{
            position: "relative",
            fontWeight: 600, 
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            '&::after': {
              position: 'absolute',
              content: '""',
              width: '30px',
              height: '2px',
              backgroundColor : theme.palette.primary.main,
              left: '0',
              bottom: '-8px'
            } 
          }}>{title}</Typography>
        }/>
      )}
      {content && (
        <CardContent sx={{ ...contentSX}}>
          {children}
        </CardContent>
      )}

      {!content && children}
    </Card>
  )
}

export default MainCard