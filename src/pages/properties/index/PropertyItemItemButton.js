import { useTheme } from '@mui/material/styles';
import AppIconButton from "components/ui/Buttons/AppIconButton/AppIconButton";

const PropertyItemItemButton = ({children, bottom, icon, ...props}) => {
  const theme = useTheme();

  return (
    <AppIconButton 
      {...props}
      size='small' 
      sx={{
        position: 'absolute',
        bottom: bottom,
        right: '20px',
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

export default PropertyItemItemButton;