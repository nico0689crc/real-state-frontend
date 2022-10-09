import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Paper, Button, Stack } from '@mui/material';
import {DeleteOutlineOutlined, ModeEditOutlineOutlined, LocalSee, Bed, Bathroom, SquareFoot} from '@mui/icons-material';
import SlickSlider from 'components/ui/SlickSlider';
import AppTypography from "components/ui/Typography/AppTypography";
import PropertiesDelete from '../delete/PropertyDelete';
import PropertyItemFeature from './PropertyItemFeature';
import PropertyItemStatus from './PropertyItemStatus';
import PropertyItemActionButton from './PropertyItemActionButton';
import AppChip from 'components/ui/Chip/AppChip';
import { FONT_COLORS_VARIANTS, FONT_FAMILY_VARIANTS } from "constants/ui";
import API_ENDPOINTS from "constants/endpoints";

const PropertyItem = ({ property }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleToggleDeleteDialog = () => {
    setOpenDeleteDialog(prevState => !prevState)
  }

  const onEditHanldler = () => {
    navigate(`${API_ENDPOINTS.PROPERTIES}/${property.id}` , { replace: true });
  }

  return (
    <>
      <Grid item xs={12} md={6} xl={4} zeroMinWidth>
        <Paper elevation={1}>
          <Box sx={{ position: 'relative', height: '300px' }}>
            <SlickSlider medias={property.media} />
            <PropertyItemActionButton 
              aria-label={t("global.delete")}
              tooltipText={t("global.delete")}
              tooltipPlacement="left"
              bottom="60px" 
              icon={<DeleteOutlineOutlined />} onClick={handleToggleDeleteDialog} 
            />
            <PropertyItemActionButton
              onClick={onEditHanldler} 
              aria-label={t("global.edit")}
              tooltipText={t("global.edit")} 
              tooltipPlacement="left"
              bottom="20px" 
              icon={<ModeEditOutlineOutlined />} 
            />
            <PropertyItemStatus property={property} />
            <AppChip icon={<LocalSee />} label={property.media.length} size="small" color="primary" position='absolute' top='20px' right='20px' />
          </Box>
          <Stack sx={{ padding: '20px' }} spacing={2} >
            <AppTypography variant="button" letterSpacing={1} fontColor={FONT_COLORS_VARIANTS.FOURTH} noWrap={true}>{property.address}</AppTypography>
            <Typography fontWeight="700"  fontFamily={FONT_FAMILY_VARIANTS.MONSERRAT} variant="h6" noWrap={true}>{property.title}</Typography>
            <Typography fontWeight="600" fontSize="1.063rem" sx={{color: theme.palette.primary.main}}>{`$${property.price}`}</Typography>
            <AppTypography variant="body1" fontColor={FONT_COLORS_VARIANTS.THIRD} className="MuiTypographyEllipsisThirdLine">{property.description}</AppTypography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <PropertyItemFeature label={`${t("properties.global.bedrooms")}: ${property.beedroom_amount}`} icon={<Bed />}/>
              <PropertyItemFeature label={`${t("properties.global.bathrooms")}: ${property.bathroom_amount}`} icon={<Bathroom />}/>
              <PropertyItemFeature label={`${t("properties.global.property_size")}: ${property.sq_mts}`} icon={<SquareFoot />}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <AppTypography variant="button" fontColor={FONT_COLORS_VARIANTS.THIRD}>{property.created_at}</AppTypography>
              <Button variant="contained">{t("properties.index.property_item.details_button_label")}</Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <PropertiesDelete 
        property={property} 
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        openDeleteDialog={openDeleteDialog}
      />
    </>
  )
}

export default PropertyItem;