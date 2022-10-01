import { forwardRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NavItem = ({ item, }) => {
  const theme = useTheme();
  const location = useLocation();
  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const itemIcon = <item.icon stroke={1.5} size="1.3rem" />
  const listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={`${"/"}${item.url}`} target='_self' />)
  };
  const handleClickItem = () => {
    document.querySelectorAll('div.MuiListItemButton-root.Mui-selected').forEach(element => element.classList.remove('Mui-selected'))
  }

  useEffect(()=>{
    setIsCurrentPage((location.pathname === `/${item.url}`));
  },[location, item.url])

  return (
    <ListItemButton {...listItemProps} disabled={item.disabled} selected={isCurrentPage} onClick={handleClickItem()}>
      <ListItemIcon>{itemIcon}</ListItemIcon>
      <ListItemText primary={<Typography>{item.title}</Typography>}></ListItemText>
    </ListItemButton>
  );
};

export default NavItem;
