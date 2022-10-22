import { useMediaQuery, useTheme, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import AccordionAccordion from "pages/users/profile/UserProfilAccordion";
import UserProfileTabs from "pages/users/profile/UserProfileTabs";
import AppTypography from "components/ui/Typography/AppTypography";

const UserProfile = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack spacing={2}>
      <AppTypography variant='h4'>{t("users.profile.title")}</AppTypography>
      <Stack spacing={1}>
        {isDownSm ? <AccordionAccordion /> : <UserProfileTabs />}
      </Stack>
    </Stack>
  );
}

export default UserProfile;