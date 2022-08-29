import { useCallback, useState } from 'react';
import { Typography, Box, Pagination, CircularProgress, Grid } from '@mui/material';
import usePropertiesQuery from "hooks/queries/properties/propertiesQuery";
import PropertyItem from "./PropertyItem";

const Properties = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationOnChangeHandler = useCallback((event, page) => {
    setCurrentPage(page)
  }, []);

  const { isFetching, data, error } = usePropertiesQuery({ page: { size: "15", number: currentPage } });

  if (error) {
    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width: '100%' }}>
      <Typography sx={{ margin: 0 }} variant='h4'>Error!</Typography>
    </Box>;
  }

  if (isFetching) {
    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width: '100%' }}>
      <CircularProgress />
    </Box>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'start' }}>
        <Typography sx={{ marginBottom: 3 }} variant='h4'>Properties List</Typography>
      </Box>
      {data?.data?.length > 0 ? (
        <>
          <Box sx={{ width: '100%', marginBottom: 3 }}>
            <Grid container spacing={2} >
              {data?.data?.map((property, index) => (
                <PropertyItem property={property} key={index} />
              ))}
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              onChange={paginationOnChangeHandler}
              count={data?.meta?.pages}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
              page={currentPage}
              boundaryCount={2} />
          </Box>
        </>
      ) : <Typography sx={{ margin: 0 }} variant='h4'>No Data</Typography>}
    </Box>
  );
};

export default Properties;