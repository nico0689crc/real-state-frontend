import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Paper, IconButton, Chip, Button } from '@mui/material';
import {DeleteOutlineOutlined, Share, LocalSee, Bed, Bathroom, SquareFoot} from '@mui/icons-material';
import SlickSlider from 'components/ui/SlickSlider';
import PropertiesDelete from '../delete/PropertieDelete';

const PropertyItem = ({ property }) => {
  const theme = useTheme();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleToggleDeleteDialog = () => {
    setOpenDeleteDialog(prevState => !prevState)
  }

  return (
    <>
      <Grid item xs={12} sm={6} lg={4} zeroMinWidth>
        <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', height: '100%' }}>
          <Box sx={{ position: 'relative', height: '300px' }}>
            <SlickSlider medias={property.media} />
            <IconButton 
              onClick={handleToggleDeleteDialog}
              aria-label="Delete" 
              size='small' 
              sx={{
                position: 'absolute',
                bottom: '60px',
                right: '20px',
                color: theme.palette.error.main,
                borderRadius: '5px',
                transition: 'ease-in .2s all',
                '&:hover': {
                  color: 'red'
                }
              }}
            >
              <DeleteOutlineOutlined />
            </IconButton>
            <IconButton aria-label="favorite" size='small' sx={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              color: 'black',
              borderRadius: '5px',
              transition: 'ease-in .2s all',
              '&:hover': {
                color: 'red'
              }
            }}>
              <Share />
            </IconButton>
            {property.p_status === 'rent' && <Chip color="success" label={property.p_status.toUpperCase()} size="small" sx={{ position: 'absolute', top: '20px', left: '20px' }} />}
            {property.p_status === 'sale' && <Chip color="info" label={property.p_status.toUpperCase()} size="small" sx={{ position: 'absolute', top: '20px', left: '20px' }} />}
            {property.p_status === 'inactive' && <Chip color="error" label={property.p_status.toUpperCase()} size="small" sx={{ position: 'absolute', top: '20px', left: '20px' }} />}
            <Chip
              icon={<LocalSee />}
              label={property.media.length}
              size="small"
              sx={{
                position: 'absolute',
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
          <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, auto) 80px auto 1fr', padding: '20px', flexGrow: '1' }}>
            <Typography sx={{ fontWeight: '500', fontFamily: 'Roboto, sans-serif', fontSize: '14px' }} variant="caption" display="block" gutterBottom noWrap={true}>{property.address}</Typography>
            <Typography sx={{ fontWeight: '700', fontFamily: 'Montserrat, sans-serif' }} variant="h6" gutterBottom noWrap={true}>{property.title.toUpperCase()}</Typography>
            <Typography sx={{ color: '#ff5c41', fontWeight: '600', fontSize: '17px', marginBottom: '5px' }}>{`$${property.price}`}</Typography>
            <Typography sx={{
                color: theme.palette.mode === 'light' ? '#586167b3' : '#ffffff99',
                lineHeight: '1.6',
                fontFamily: '"Roboto", sans-serif',
                fontSize: '15px',
                fontWeight: '500',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box !important',
                '-webkit-line-clamp': '3',
                '-webkit-box-orient': 'vertical',
                whiteSpace: 'normal'
              }} 
              variant="body1"
              gutterBottom>{property.description}
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item sx={{ display: 'flex', flexGrow: '1', flexShrink: '0', justifyContent: 'start', alignItems: 'center' }}>
                <Bed />
                <Typography sx={{ fontWeight: '600', fontFamily: 'Roboto, sans-serif', fontSize: '14px'}} >{`Bedrooms: ${property.beedroom_amount}`}</Typography>
              </Grid>
              <Grid item sx={{ display: 'flex', flexGrow: '1', flexShrink: '0', justifyContent: 'start', alignItems: 'center'}}>
                <Bathroom />
                <Typography sx={{ fontWeight: '600', fontFamily: 'Roboto, sans-serif', fontSize: '14px'}} >{`Bathrooms: ${property.bathroom_amount}`}</Typography>
              </Grid>
              <Grid item sx={{ display: 'flex', flexGrow: '1', flexShrink: '0', justifyContent: 'start', alignItems: 'center'}}>
                <SquareFoot />
                <Typography sx={{ fontWeight: '600', fontFamily: 'Roboto, sans-serif', fontSize: '14px'}} >{`Sq Ft: ${property.sq_mts}`}</Typography>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', width: '100%', paddingY: '1rem', marginTop: '1rem' }}>
              <Typography sx={{
                fontWeight: '600',
                color: theme.palette.mode === 'light' ? '#586167b3' : '#ffffff99',
                fontSize: '14px'
              }} >
                {property.created_at}
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
      <PropertiesDelete property={property} handleToggleDeleteDialog={handleToggleDeleteDialog} openDeleteDialog={openDeleteDialog}/>
    </>
  )
}

export default PropertyItem;