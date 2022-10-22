import { useCallback } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from "react-i18next";
import UserRowActions from './UserRowActions';

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
        renderCell: ({row}) => `${row.last_name}, ${row.first_name}`,
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