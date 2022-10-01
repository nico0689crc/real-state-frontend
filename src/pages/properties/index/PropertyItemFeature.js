import { Typography, Stack } from '@mui/material';

const PropertyItemFeature = ({label, icon, ...props}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      {icon}
      <Typography sx={{ fontWeight: '600', fontFamily: 'Roboto, sans-serif', fontSize: '14px'}} >{label}</Typography>
    </Stack >
  )
}

export default PropertyItemFeature;