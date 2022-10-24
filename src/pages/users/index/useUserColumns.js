import { useCallback, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Stack, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import useUserRole from "hooks/useUserRole";
import UserRowActions from './UserRowActions';
import AppTypography from 'components/ui/Typography/AppTypography';

const ShowMore = ({row}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { userRole } = useUserRole();

  const onToggleHandler = () => {
    setOpen(prevState => !prevState);
  }
  
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <IconButton onClick={onToggleHandler}>
        {open ? <Remove /> : <Add />}
      </IconButton>
      <Stack spacing={open? 2 : 0} justifyContent="center">
        {open ? (
          <Stack>
            <AppTypography variant='body1' fontWeight="bold">{t('users.global.user')}:</AppTypography>
            <AppTypography variant='body2'>{`${row.last_name}, ${row.first_name}`}</AppTypography>
          </Stack>
        ) : (
          <Stack>
            <AppTypography variant="button">{`${row.last_name}, ${row.first_name}`}</AppTypography>
            <AppTypography variant="overline">{userRole(row.user_role)}</AppTypography>
          </Stack>
        )}
        <Stack 
          spacing={2}
          sx={{
            height: open ? 'auto' : 0, 
            overflow: 'hidden',
            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.shortest
            })
          }}
        >
          <Stack>
            <AppTypography variant='body1' fontWeight="bold">{t('users.global.email')}:</AppTypography>
            <AppTypography variant='body2'>{row.email}</AppTypography>
          </Stack>
          <Stack>
            <AppTypography variant='body1' fontWeight="bold">{t('users.global.user_role')}:</AppTypography>
            <AppTypography variant='body2'>{userRole(row.user_role)}</AppTypography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>

  )
}

const useUserColumns = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const getColumns = useCallback(() => {
    const columns = [
      { 
        field: 'user', 
        headerName: t('users.global.user'), 
        renderCell: ({row}) => isDownSm ? <ShowMore row={row} /> : `${row.last_name}, ${row.first_name}`,
        flex: 1 
      },
      { field: 'email', headerName: t('users.global.email'), flex: 1, hide: isDownSm },
      { field: 'user_role', headerName: t('users.global.user_role'), flex: 1, hide: isDownMd },
      { 
        field: 'id', 
        type: 'actions', 
        renderHeader: () => !isDownMd ? t('users.global.actions') : null,
        sortable: false,
        filterable: false,
        flex: isDownSm ? 0.25 : 0.5,
        renderCell: ({row}) => <UserRowActions user={row} />  
      }
    ];

    return columns;
  },[t, isDownSm, isDownMd]);

  return { getColumns };
}

export default useUserColumns;