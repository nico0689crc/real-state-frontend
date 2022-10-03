import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MainCard = ({ title, headerSX = {}, content = true, contentSX = {}, className, children, ...props }) => {
  const theme = useTheme();

  return(
    <Card {...props} className={`MuiCardCustomized ${className}`}>
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

MainCard.propTypes = {
  className: PropTypes.string
}

MainCard.defaultProps = {
  className: "",
};

export default MainCard