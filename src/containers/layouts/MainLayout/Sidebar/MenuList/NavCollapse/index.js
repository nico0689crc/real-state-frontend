import { useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import NavItem from '../NavItem';

const NavCollapse = ({ menu, level}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
    document.querySelectorAll('a.MuiListItemButton-root.Mui-selected').forEach(element => element.classList.remove('Mui-selected'))
  };

  const menus = menu.children?.map((item) => <NavItem key={item.id} item={item} level={level + 1} />);

  return (
    <>
      <ListItemButton selected={selected === menu.id} onClick={handleClick}>
        <ListItemIcon>
          <menu.icon strokeWidth={1.5} size="1.3rem"/>
        </ListItemIcon>
        <ListItemText primary={<Typography>{menu.title}</Typography>} />
        {open ? (
          <IconChevronUp stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        ) : (
          <IconChevronDown stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menus}
        </List>
      </Collapse>
    </>
  );
};

export default NavCollapse;
