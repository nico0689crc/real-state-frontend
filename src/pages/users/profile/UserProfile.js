import { useMediaQuery, useTheme, Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import MainCard from "components/ui/Card/MainCard";
import AccordionAccordion from "pages/users/profile/UserProfilAccordion";
import UserProfileTabs from "pages/users/profile/UserProfileTabs";

const UserProfile = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDownMd = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: "grid", gridTemplateRows: 'auto 1fr', rowGap: "1.5rem", height: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant='h4'>{t("users.profile.title")}</Typography>
      </Stack>
      <MainCard contentSX={{ height: "100%"}} sx={{ padding: 2}}>
        <Stack spacing={2}>
          {isDownMd ? <AccordionAccordion /> : <UserProfileTabs />}
        </Stack>
      </MainCard>
    </Box>
  );
}

export default UserProfile;