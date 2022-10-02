import { Stack } from '@mui/material';
import AppTypography from "components/ui/Typography/AppTypography";

const PropertyItemFeature = ({label, icon, ...props}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      {icon}
      <AppTypography variant="button">{label}</AppTypography>
    </Stack >
  )
}

export default PropertyItemFeature;