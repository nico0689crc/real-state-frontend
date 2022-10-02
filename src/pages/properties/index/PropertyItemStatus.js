import AppChip from 'components/ui/Chip/AppChip';

const PropertyItemStatus = ({ property }) => {
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
    <AppChip color={color} label={property.p_status.toUpperCase()} size="small" position='absolute' top='20px' left='20px' />
  )
}

export default PropertyItemStatus;