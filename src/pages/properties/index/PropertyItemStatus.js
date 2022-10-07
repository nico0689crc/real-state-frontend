import { useTranslation } from "react-i18next";
import AppChip from 'components/ui/Chip/AppChip';

const PropertyItemStatus = ({ property }) => {
  const { t } = useTranslation();
  const label = t(`properties.create_edit.labels.status_${property.p_status}`).toUpperCase();
  let color;
  
  switch (property.p_status) {
    case 'rent':
      color = "success";
      break;
    case 'sale':
      color = "info";
      break;
    default:
      color = "error";
      break;
  }

  return (
    <AppChip color={color} label={label} size="small" position='absolute' top='20px' left='20px' />
  )
}

export default PropertyItemStatus;