import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Stack, Button, Box } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { DataGrid, esES, enUS } from '@mui/x-data-grid';
import { usersActions, FORM_TYPES } from "store/users/usersSlice";
import { retrieveUsersActionCreator } from "store/users/usersActionCreators";
import useUserColumns from './useUserColumns';
import MainCard from 'components/ui/Card/MainCard';
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
    <Box sx={{ display: "grid", gridTemplateRows: 'auto 1fr', rowGap: "1.5rem", height: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant='h4'>{t("users.index.title")}</Typography>
        {!error && (
          <Button variant="contained" onClick={handleToggleCreateDialog} startIcon={<PersonAdd />}>
            {t("users.create_edit.add_user_button")}
          </Button>
        )}
      </Stack>
      <MainCard contentSX={{p: '1rem 0 !important', height: "100%"}} sx={{ paddingX: 4, paddingY: 2}}>
        <Stack justifyContent="center" alignItems="center" height="100%">
          { error && <Typography sx={{ margin: 0 }} variant='h4'>Error!</Typography> }
          {!error && (
            <DataGrid
              sx={{width: "100%"}} 
              rows={users} 
              columns={getColumns()}
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
      </MainCard>
      <UserCreate
        setOpenDialog={setOpenCreateDialog} 
        openDialog={openCreateDialog}
      />
    </Box>
  );
};

export default UsersList;