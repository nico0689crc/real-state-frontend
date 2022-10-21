import { useCallback } from 'react';
import { useTranslation } from "react-i18next";
import UserRowActions from './UserRowActions';

const useUserColumns = () => {
  const { t } = useTranslation();

  const getColumns = useCallback(() => {
    const columns = [
      { field: 'first_name', headerName: t('users.global.first_name'), flex: 1 },
      { field: 'last_name', headerName: t('users.global.last_name'), flex: 1 },
      { field: 'email', headerName: t('users.global.email'), flex: 1 },
      { field: 'user_role', headerName: t('users.global.user_role'), flex: 1 },
      { 
        field: 'id', 
        type: 'actions', 
        headerName: t('users.global.actions'), 
        flex: 0.75,
        renderCell: ({row}) => <UserRowActions user={row} />  
      }
    ];

    return columns;
  },[t]);

  return { getColumns };
}

export default useUserColumns;