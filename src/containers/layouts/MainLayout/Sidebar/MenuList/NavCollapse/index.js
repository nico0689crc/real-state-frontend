import { useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import NavItem from '../NavItem';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

const NavCollapse = ({ menu, level}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
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
        <ListItemText>{menu.title}</ListItemText>
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
