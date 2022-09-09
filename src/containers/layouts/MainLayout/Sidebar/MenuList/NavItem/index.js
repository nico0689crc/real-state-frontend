import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const theme = useTheme();
  const customization = useSelector((state) => state.uiStore);

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={`${"/"}${item.url}`} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  // active menu item on page load
  useEffect(() => {
    // const currentPathnameArray = document.location.pathname.split('/');
    // console.log(currentPathnameArray, item.url);

    // if (currentPathname === "/" && item.url === '') {
    //   setIsCurrentPage(true);
    // }
    // if (currentPathname.split('/')[-1] === item.url) {
    //   setIsCurrentPage(true);
    // }
  }, []);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 20}px`
      }}
      selected={isCurrentPage}
      // onClick={() => itemHandler(item.id)}
      onClick={() => { }}
    >
      <ListItemIcon sx={{
        my: 'auto',
        minWidth: !item?.icon ? 18 : 36,
        color: theme.palette.mode === 'light' && isCurrentPage ? theme.palette.primary.main : 'inherit'
      }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography sx={{
            fontWeight: isCurrentPage ? 'bold' : '400'
          }}
            variant={isCurrentPage ? 'subtitle1' : 'subtitle2'}
            color={(theme.palette.mode === 'light' && isCurrentPage) ? theme.palette.primary.main : 'inherit'}>
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
