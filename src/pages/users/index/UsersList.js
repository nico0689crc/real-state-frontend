import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Stack, Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { DataGrid, esES, enUS } from '@mui/x-data-grid';
import { usersActions, FORM_TYPES } from "store/users/usersSlice";
import { retrieveUsersActionCreator } from "store/users/usersActionCreators";
import useUserColumns from './useUserColumns';
import UserCreate from '../create/UserCreate';

const UsersList = () => {
  const [gridLocales, setGridLocales] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const { getColumns } = useUserColumns();
  const dispatch = useDispatch();
  const {t, i18n: { language }} = useTranslation();
  const { users, isFetching, error, totalUsers, currentPage } = useSelector(state => state.usersStore);
  
  dispatch(usersActions.setUserEditFormType({userEditFormType: FORM_TYPES.DIALOG}));
  
  dispatch(retrieveUsersActionCreator({pageSize: "20"}));

  const paginationOnChangeHandler = useCallback((page) => {
    dispatch(usersActions.setCurrentPage({ currentPage: page + 1 }));
  }, [dispatch]);

  const handleToggleCreateDialog = useCallback(() => {
    setOpenCreateDialog(prevState => !prevState);
  },[]);

  useEffect(() => {
    if(language === "es") {
      language === "es" && setGridLocales(esES.components.MuiDataGrid.defaultProps.localeText);
    } else {
      language === "en" && setGridLocales(enUS.components.MuiDataGrid.defaultProps.localeText);
    }
  },[language]);

  return (
    <Stack spacing={2}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{sm: "center"}} spacing={2}>
        <Typography variant='h4'>{t("users.index.title")}</Typography>
        {!error && (
          <Button variant="contained" size='small' onClick={handleToggleCreateDialog} startIcon={<PersonAdd />}>
            {t("users.create_edit.add_user_button")}
          </Button>
        )}
      </Stack>
      <Stack justifyContent="center" alignItems="center" height="100%">
        { error && <Typography sx={{ margin: 0 }} variant='h4'>Error!</Typography> }
        {!error && (
          <DataGrid
            sx={{width: "100%"}} 
            rows={users} 
            columns={getColumns()}
            disableSelectionOnClick
            autoHeight
            pagination
            paginationMode="server"
            rowCount={totalUsers}
            onPageChange={paginationOnChangeHandler}
            loading={isFetching} 
            rowsPerPageOptions={[20]}
            page={(currentPage - 1)}
            initialState={{pagination: { pageSize: 20}}}
            localeText={gridLocales}
          />
        )}
      </Stack>
      <UserCreate
        setOpenDialog={setOpenCreateDialog} 
        openDialog={openCreateDialog}
      />
    </Stack>
  );
};

export default UsersList;