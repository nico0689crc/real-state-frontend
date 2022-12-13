import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Map, Email, DeleteOutlineOutlined, ModeEditOutlineOutlined, Visibility } from '@mui/icons-material';
import { Box, Grid, Paper, Stack } from '@mui/material';
import AppTypography from 'components/ui/Typography/AppTypography';
import RealEstateItemActionButton from "./RealEstatesItemActionButton";
import RealEstatesDelete from "../delete/RealEstatesDelete";
import API_ENDPOINTS from "constants/endpoints";

const RealEstateItem = ({real_estate}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { real_estate_image, fake_real_estate_image} = real_estate;
  const image = real_estate_image ? real_estate_image : fake_real_estate_image;

  const onEditHanldler = () => {
    navigate(`${API_ENDPOINTS.REAL_ESTATES}/${real_estate.id}/edit` , { replace: true });
  }
  
  const onDeleteHanldler = () => {
    setOpenDeleteDialog(prevState => !prevState)
  }

  const onShowHanldler = () => {
    navigate(`${API_ENDPOINTS.REAL_ESTATES}/${real_estate.id}` , { replace: true });
  }

  return(
    <>
      <Grid item xs={12} lg={6} zeroMinWidth>
        <Paper elevation={1}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{padding: 3}}>
            <Box sx={{width: "100px"}}>
              <img src={image} alt={real_estate.name} loading="lazy" style={{width: "100px"}}/>
            </Box>
            <Stack spacing={1} flexGrow={1}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{display: "grid", gridTemplateColumns: "1fr"}}>
                <AppTypography variant="h6" letterSpacing={1} className="MuiTypographyEllipsis">{real_estate.name}</AppTypography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} sx={{display: "grid", gridTemplateColumns: "30px 1fr"}}>
                <Map />
                <AppTypography variant="overline" letterSpacing={1} className="MuiTypographyEllipsis">{real_estate.address}</AppTypography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} sx={{display: "grid", gridTemplateColumns: "30px 1fr"}}>
                <Email />
                <AppTypography variant="overline" letterSpacing={1} className="MuiTypographyEllipsis">{real_estate.contact_email}</AppTypography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} sx={{display: "grid", gridTemplateColumns: "30px 1fr"}}>
                <Phone />
                <AppTypography variant="overline" letterSpacing={1} className="MuiTypographyEllipsis">{real_estate.contact_phone}</AppTypography>
              </Stack>
              <Stack direction="row" justifyContent="end" spacing={1}>
                <RealEstateItemActionButton 
                  aria-label={t("global.show")}
                  tooltipText={t("global.show")}
                  tooltipPlacement="top"
                  icon={<Visibility />} 
                  onClick={onShowHanldler} 
                />
                <RealEstateItemActionButton 
                  aria-label={t("global.edit")}
                  tooltipText={t("global.edit")}
                  tooltipPlacement="top"
                  icon={<ModeEditOutlineOutlined />} 
                  onClick={onEditHanldler} 
                />
                <RealEstateItemActionButton 
                  aria-label={t("global.delete")}
                  tooltipText={t("global.delete")}
                  tooltipPlacement="top"
                  icon={<DeleteOutlineOutlined />} 
                  onClick={onDeleteHanldler} 
                />
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <RealEstatesDelete 
        real_estate={real_estate} 
        handleToggleDeleteDialog={onDeleteHanldler}
        openDeleteDialog={openDeleteDialog}
      />
    </>
  )
}

export default RealEstateItem;