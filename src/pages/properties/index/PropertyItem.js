import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Paper, Chip, Button, Stack } from '@mui/material';
import {DeleteOutlineOutlined, FavoriteBorderOutlined, LocalSee, Bed, Bathroom, SquareFoot} from '@mui/icons-material';
import SlickSlider from 'components/ui/SlickSlider';
import AppIconButton from "components/ui/Buttons/AppIconButton/AppIconButton";
import PropertiesDelete from '../delete/PropertieDelete';
import PropertyItemFeature from './PropertyItemFeature';

const PropertyItem = ({ property }) => {
  const theme = useTheme();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleToggleDeleteDialog = () => {
    setOpenDeleteDialog(prevState => !prevState)
  }

  return (
    <>
      <Grid item xs={12} sm={6} lg={4} zeroMinWidth>
        <Paper elevation={1}>
          <Box sx={{ position: 'relative', height: '300px' }}>
            <SlickSlider medias={property.media} />
            <AppIconButton 
              onClick={handleToggleDeleteDialog}
              aria-label="Delete" 
              size='small' 
              sx={{
                position: 'absolute',
                bottom: '60px',
                right: '20px',
                color: `${theme.palette.error.main} !important`,
                '&:hover': {
                  color: `${theme.palette.error.main} !important`
                }
              }}
            >
              <DeleteOutlineOutlined />
            </AppIconButton>
            <AppIconButton aria-label="favorite" size='small' sx={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              color: `${theme.palette.error.main} !important`,
              '&:hover': {
                color: `${theme.palette.error.main} !important`
              }
            }}>
              <FavoriteBorderOutlined />
            </AppIconButton>
            {property.p_status === 'rent' && <Chip color="success" label={property.p_status.toUpperCase()} size="small" sx={{ position: 'absolute', top: '20px', left: '20px' }} />}
            {property.p_status === 'sale' && <Chip color="info" label={property.p_status.toUpperCase()} size="small" sx={{ position: 'absolute', top: '20px', left: '20px' }} />}
            {property.p_status === 'inactive' && <Chip color="error" label={property.p_status.toUpperCase()} size="small" sx={{ position: 'absolute', top: '20px', left: '20px' }} />}
            <Chip 
              icon={<LocalSee />}
              label={property.media.length} 
              size="small"
              color="primary"
              sx={{ position: 'absolute', top: '20px', right: '20px', borderRadius: '5px', padding: '5px' }} 
            />
          </Box>
          <Stack sx={{ padding: '20px' }} spacing={1} >
            <Typography sx={{ fontWeight: '500', fontFamily: 'Roboto, sans-serif', fontSize: '14px' }} variant="caption" display="block" gutterBottom noWrap={true}>{property.address}</Typography>
            <Typography sx={{ fontWeight: '700', fontFamily: 'Montserrat, sans-serif' }} variant="h6" gutterBottom noWrap={true}>{property.title.toUpperCase()}</Typography>
            <Typography sx={{ fontWeight: '600', fontSize: '17px' }}>{`$${property.price}`}</Typography>
            <Typography sx={{
                lineHeight: '1.6',
                fontFamily: '"Roboto", sans-serif',
                fontSize: '15px',
                fontWeight: '500',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box !important',
                height: '70px',
                '-webkit-line-clamp': '3',
                '-webkit-box-orient': 'vertical',
                whiteSpace: 'normal'
              }} 
              variant="body1"
              gutterBottom>{property.description}
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <PropertyItemFeature label={`Bedrooms: ${property.beedroom_amount}`} icon={<Bed />}/>
              <PropertyItemFeature label={`Bathrooms: ${property.bathroom_amount}`} icon={<Bathroom />}/>
              <PropertyItemFeature label={`Sq Ft: ${property.sq_mts}`} icon={<SquareFoot />}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography sx={{fontWeight: '600', fontSize: '14px'}} >{property.created_at}</Typography>
              <Button variant="contained">Details</Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <PropertiesDelete property={property} handleToggleDeleteDialog={handleToggleDeleteDialog} openDeleteDialog={openDeleteDialog}/>
    </>
  )
}

export default PropertyItem;