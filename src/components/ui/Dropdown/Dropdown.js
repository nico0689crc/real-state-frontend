import { useTheme } from '@mui/material/styles';
import {
  Box, ClickAwayListener, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper,
  Popper, Typography
} from '@mui/material';
import Transitions from 'components/ui/extended/Transitions';
import Card from 'components/ui/Card/Card';

const Dropdown = ({ anchorRef, handleClose, open, items = []}) => {
  const theme = useTheme();

  return (
    <Popper
      placement="bottom-end"
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      sx={{zIndex: 1}}
      popperOptions={{
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 15]
          }
        }]
      }}
    >
      {({ TransitionProps }) => (
        <Transitions in={open} {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <Card border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                <Box sx={{ p: 1, textAlign: 'center' }}>
                  <Typography component="span" variant="h6" sx={{ fontWeight: 400 }}>Johne Doe</Typography>
                </Box>
                <Divider />
                <List component="nav" sx={{py: 0}}>
                  {items.map((item, index) => (
                    <ListItemButton key={index} onClick={item.onClick} sx={{mb: 0, pl: 1, pr: 1.5, borderRadius: 0, alignItems: 'center'}}>
                      <ListItemIcon sx={{ minWidth: 1.5 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ lineHeight: 1}}>{item.label}</Typography>} />
                    </ListItemButton>
                  ))}
                </List>
              </Card>
            </ClickAwayListener>
          </Paper>
        </Transitions>
      )}
    </Popper>
  )
}

export default Dropdown;