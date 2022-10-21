import { Stack } from '@mui/material';
import AppTypography from "components/ui/Typography/AppTypography";
import { FONT_COLORS_VARIANTS } from "constants/ui";

const { SECONDARY } = FONT_COLORS_VARIANTS;

const UserAttribute = ({ label, icon }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      {icon}
      <AppTypography variant="body1" fontColor={SECONDARY}>{label}</AppTypography>
    </Stack >
  )
}

export default UserAttribute;