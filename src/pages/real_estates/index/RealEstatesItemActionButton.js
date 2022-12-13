import { useTheme } from '@mui/material/styles';
import AppIconButton from "components/ui/Buttons/AppIconButton/AppIconButton";

const RealEstateItemActionButton = ({children, icon, ...props}) => {
  const theme = useTheme();

  return (
    <AppIconButton 
      {...props}
      size='small' 
      sx={{
        backgroundColor: "#ffebee !important",
        color: `${theme.palette.primary.main} !important`,
        '&:hover': {
          color: `${theme.palette.primary.main} !important`,
          backgroundColor: "#ffcdd2 !important",
        }
      }}
    >
      {icon}
    </AppIconButton>
  )
}

export default RealEstateItemActionButton;