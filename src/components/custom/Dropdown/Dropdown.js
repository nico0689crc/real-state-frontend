import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Box, ClickAwayListener, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper,
         Popper, Typography
} from '@mui/material';
import { UI_VARIABLES } from '../../../store/uiSlice';
import Transitions from '../../ui/extended/Transitions';
import Card from '../../ui/Card/Card';

const Dropdown = ({
  anchorRef,
  handleClose,
  open,
  items = []
}) => {
  const theme = useTheme();

  const { borderRadius } = useSelector((state) => state.uiStore);

  return (
    <Popper
      placement="bottom-end"
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
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
                <Box sx={{ p: 1 }}>
                  <List
                    component="nav"
                    sx={{
                      width: '100%',
                      maxWidth: 350,
                      borderRadius: `${borderRadius}px`,
                      [theme.breakpoints.down('md')]: {
                        minWidth: '100%'
                      }
                    }}
                  >
                    {items.map((item, index) => (
                      <ListItemButton 
                        key={index} 
                        onClick={item.onClick}
                        sx={{ 
                          minWidth: '2rem',
                          '&:hover': {
                            color: UI_VARIABLES.UI_MODE_DARK ? theme.palette.primary[400] : theme.palette.primary[900],
                          },
                        }}
                      >
                          <ListItemIcon sx={{minWidth: '2rem', color: 'inherit'}}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText primary={<Typography sx={{color: 'inherit'}}>{item.label}</Typography>} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Card>
            </ClickAwayListener>
          </Paper>
        </Transitions>
      )}
    </Popper>
  )
}

export default Dropdown;