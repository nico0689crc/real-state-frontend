import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Paper, Button, Stack } from '@mui/material';
import {DeleteOutlineOutlined, FavoriteBorderOutlined, LocalSee, Bed, Bathroom, SquareFoot} from '@mui/icons-material';
import SlickSlider from 'components/ui/SlickSlider';
import AppTypography from "components/ui/Typography/AppTypography";
import PropertiesDelete from '../delete/PropertieDelete';
import PropertyItemFeature from './PropertyItemFeature';
import PropertyItemStatus from './PropertyItemStatus';
import PropertyItemItemButton from './PropertyItemItemButton';
import AppChip from 'components/ui/Chip/AppChip';
import { FONT_COLORS_VARIANTS, FONT_FAMILY_VARIANTS } from "constants/ui";

const PropertyItem = ({ property }) => {
  const { t } = useTranslation();
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
            <PropertyItemItemButton aria-label="Delete" bottom="60px" icon={<DeleteOutlineOutlined />} onClick={handleToggleDeleteDialog} />
            <PropertyItemItemButton aria-label="Favorite" bottom="20px" icon={<FavoriteBorderOutlined />} />
            <PropertyItemStatus property={property} />
            <AppChip icon={<LocalSee />} label={property.media.length} size="small" color="primary" position='absolute' top='20px' right='20px' />
          </Box>
          <Stack sx={{ padding: '20px' }} spacing={2} >
            <AppTypography variant="button" letterSpacing={1} fontColor={FONT_COLORS_VARIANTS.FOURTH} noWrap={true}>{property.address}</AppTypography>
            <Typography fontWeight="700"  fontFamily={FONT_FAMILY_VARIANTS.MONSERRAT} variant="h6" noWrap={true}>{property.title}</Typography>
            <Typography fontWeight="600" fontSize="1.063rem" sx={{color: theme.palette.primary.main}}>{`$${property.price}`}</Typography>
            <AppTypography variant="body1" fontColor={FONT_COLORS_VARIANTS.THIRD} className="MuiTypographyEllipsisThirdLine">{property.description}</AppTypography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <PropertyItemFeature label={`Bedrooms: ${property.beedroom_amount}`} icon={<Bed />}/>
              <PropertyItemFeature label={`Bathrooms: ${property.bathroom_amount}`} icon={<Bathroom />}/>
              <PropertyItemFeature label={`Sq Ft: ${property.sq_mts}`} icon={<SquareFoot />}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <AppTypography variant="button" fontColor={FONT_COLORS_VARIANTS.THIRD}>{property.created_at}</AppTypography>
              <Button variant="contained">{t("properties.index.property_item.details_button_label")}</Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <PropertiesDelete property={property} handleToggleDeleteDialog={handleToggleDeleteDialog} openDeleteDialog={openDeleteDialog}/>
    </>
  )
}

export default PropertyItem;