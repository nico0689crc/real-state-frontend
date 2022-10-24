import { List, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

const NavGroup = ({ item }) => {
	const { attributes: { user_role }} = useSelector(state => state.authStore);
	const items = item.children?.filter(item => item.roles.includes(user_role)).map((menu) => {
		switch (menu.type) {
			case 'collapse':
				return <NavCollapse key={menu.id} menu={menu} level={1}/>;
			case 'item':
				return <NavItem key={menu.id} item={menu} level={1}/>;
			default:
				return (
					<Typography key={menu.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return (
		<List sx={{paddingX: 0.5, paddingTop: 2.25}}>
			{items}
		</List>
	);
};

export default NavGroup;
