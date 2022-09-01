import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Paper, IconButton, Chip, Button } from '@mui/material';
import SlickSlider from 'components/ui/SlickSlider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import BedIcon from '@mui/icons-material/Bed';
import BathroomIcon from '@mui/icons-material/Bathroom';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

const PropertyItem = ({ property, ...restProps }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} lg={4} zeroMinWidth>
      <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '10px' }}>
        <Box sx={{ position: 'relative', height: '300px' }}>
          <SlickSlider medias={property.media} />
          <IconButton aria-label="favorite" size='small' sx={{
            position: 'absolute',
            bottom: '60px',
            right: '20px',
            backgroundColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.grey[300],
            color: 'black',
            borderRadius: '5px',
            transition: 'ease-in .2s all',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.grey[300],
              color: 'red'
            }
          }}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton aria-label="favorite" size='small' sx={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.grey[300],
            color: 'black',
            borderRadius: '5px',
            transition: 'ease-in .2s all',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.grey[300],
              color: 'red'
            }
          }}>
            <ShareIcon />
          </IconButton>
          {property.p_status === 'rent' && <Chip color="success" label={property.p_status.toUpperCase()} size="small" sx={{ position: 'absolute', top: '20px', left: '20px' }} />}
          {property.p_status === 'sale' && <Chip color="info" label={property.p_status.toUpperCase()} size="small" sx={{ position: 'absolute', top: '20px', left: '20px' }} />}
          {property.p_status === 'inactive' && <Chip color="error" label={property.p_status.toUpperCase()} size="small" sx={{ position: 'absolute', top: '20px', left: '20px' }} />}
          <Chip
            icon={<LocalSeeIcon />}
            label={property.media.length}
            size="small"
            sx={{
              position: 'absolute',
              backgroundColor: '#1c2d3a',
              color: '#e0e0e0',
              top: '20px',
              right: '20px',
              borderRadius: '5px',
              padding: '5px',
              "& > .MuiChip-icon": {
                color: '#e0e0e0'
              },
              "& > span": {
                marginLeft: '5px'
              }
            }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <Typography sx={{ fontWeight: '500', fontFamily: 'Roboto, sans-serif', fontSize: '14px' }} variant="caption" display="block" gutterBottom noWrap={true}>{property.address}</Typography>
          <Typography sx={{ fontWeight: '700', fontFamily: 'Montserrat, sans-serif' }} variant="h6" gutterBottom noWrap={true}>{property.title.toUpperCase()}</Typography>
          <Typography sx={{ color: '#ff5c41', fontWeight: '600', fontSize: '17px', marginBottom: '5px' }}>{`$${property.price}`}</Typography>
          <Typography sx={{
            minHeight: '50px',
            maxHeight: '60px',
            overflow: 'hidden',
            color: theme.palette.mode === 'light' ? '#586167b3' : '#ffffff99',
            lineHeight: '1.6',
            fontFamily: '"Roboto", sans-serif',
            fontSize: '15px',
            fontWeight: '500'
          }} variant="body1"
            gutterBottom>{property.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', flexGrow: '1', justifyContent: 'start', alignItems: 'center' }}>
              <BedIcon />
              <Typography sx={{ fontWeight: '600', fontFamily: 'Roboto, sans-serif', fontSize: '14px', marginLeft: '5px' }} >{`Bedrooms: ${property.beedroom_amount}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: '1', justifyContent: 'start', alignItems: 'center', marginLeft: '5px' }}>
              <BathroomIcon />
              <Typography sx={{ fontWeight: '600', fontFamily: 'Roboto, sans-serif', fontSize: '14px', marginLeft: '5px' }} >{`Bathrooms: ${property.bathroom_amount}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: '1', justifyContent: 'start', alignItems: 'center', marginLeft: '5px' }}>
              <SquareFootIcon />
              <Typography sx={{ fontWeight: '600', fontFamily: 'Roboto, sans-serif', fontSize: '14px', marginLeft: '5px' }} >{`Sq Ft: ${property.sq_mts}`}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingY: '1rem', marginTop: '1rem' }}>
            <Typography sx={{
              fontWeight: '600',
              color: theme.palette.mode === 'light' ? '#586167b3' : '#ffffff99',
              fontSize: '14px'
            }} >
              {`Posted: ${property.created_at}`}
            </Typography>
            <Button
              sx={{
                borderRadius: '3rem',
              }}
              variant="contained"
            >Details</Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  )
}

export default PropertyItem;