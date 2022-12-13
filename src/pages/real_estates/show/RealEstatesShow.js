import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Stack, Button, Box, Paper, CircularProgress, useMediaQuery, useTheme, Grid } from '@mui/material';
import { ChevronLeft, Email, Map, Phone } from "@mui/icons-material";
import API_ENDPOINTS from "constants/endpoints";
import AppTypography from "components/ui/Typography/AppTypography";
import useRealEstateQuery from "hooks/queries/real_estates/useRealEstateQuery";
import { useEffect, useState } from "react";
import { IconBuildingWarehouse } from "@tabler/icons";
import PropertyItem from "pages/properties/index/PropertyItem";

const RealEstatesShow = () => {
  const theme = useTheme();
  const [realEstate, setRealEstate] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const { isFetching, data, error } = useRealEstateQuery(id);

  const onClickBackButtonHandler = () => {
    navigate(API_ENDPOINTS.REAL_ESTATES , { replace: true });
  }

  useEffect(() => {
    data && setRealEstate(data.data);
  },[data]);

  let content;
  
  if (error) {
    content = (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width: '100%' }}>
        <Typography sx={{ margin: 0 }} variant='h4'>Error!</Typography>
      </Box>
    );
  }

  if (isFetching) {
    content = (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}>
        <CircularProgress />
      </Box>
    );
  } else {
    content = realEstate ? (
      <>
        <Paper elevation={1}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="start" spacing={3} sx={{padding: 3}}>
            <Stack width={{xs: "100%", md: "300px"}} alignItems={{ xs: "center", md: "flex-start" }}>
              <img 
                src={realEstate.real_estate_image ? realEstate.real_estate_image : realEstate.fake_real_estate_image} 
                alt={realEstate.name} 
                loading="lazy" 
                style={{width: "300px"}}
              />
            </Stack>
            <Stack spacing={1} flexGrow={1}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{display: "grid", gridTemplateColumns: "1fr"}}>
                <AppTypography variant="h5" fontWeight="600" letterSpacing={1} className="MuiTypographyEllipsis">{realEstate.name}</AppTypography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} sx={{display: "grid", gridTemplateColumns: "30px 1fr"}}>
                <Map />
                <AppTypography variant="overline" letterSpacing={1} className="MuiTypographyEllipsis">{realEstate.address}</AppTypography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} sx={{display: "grid", gridTemplateColumns: "30px 1fr"}}>
                <Email />
                <AppTypography variant="overline" letterSpacing={1} className="MuiTypographyEllipsis">{realEstate.contact_email}</AppTypography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} sx={{display: "grid", gridTemplateColumns: "30px 1fr"}}>
                <Phone />
                <AppTypography variant="overline" letterSpacing={1} className="MuiTypographyEllipsis">{realEstate.contact_phone}</AppTypography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconBuildingWarehouse />
                  <AppTypography variant="overline" letterSpacing={1}>{t("properties.index.title")}:</AppTypography>
                </Stack>
                <AppTypography variant="overline" letterSpacing={1} className="MuiTypographyEllipsis">{realEstate.properties.length}</AppTypography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <AppTypography fontWeight="600" variant="button" letterSpacing={1}>{t("real_estates.show.description")}</AppTypography>
                <AppTypography variant="body2" letterSpacing={1}>{realEstate.description}</AppTypography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Stack spacing={2}>
          <Grid container rowSpacing={2} columnSpacing={{xs: 0, md: 2}} sx={{ width: '100%', marginBottom: 3 }}>
            {realEstate.properties.map((property, index) => (
              <PropertyItem property={property} key={index} />
            ))}
          </Grid>
        </Stack>

      </>
    ) : <Typography sx={{ margin: 0 }} variant='h4'>Real Estate not found.</Typography>
  }

  return (
    <Stack spacing={5}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{xs: "center"}} spacing={2}>
        <Typography variant='h4'>{t("real_estates.show.title")}</Typography>
        <Button fullWidth={isDownSm} variant="contained" size='small' onClick={onClickBackButtonHandler} startIcon={<ChevronLeft />}>
          {t("global.back")}
        </Button>
      </Stack>
      {content}
    </Stack>
  );
}

export default RealEstatesShow;