import React from 'react';
import { Box, IconButton, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const PreviewThumb = ({ path, onDeleteUploadFile }) => {
  const theme = useTheme();
  return (
    <Grid item xs={4} sm={3}>
      <Box
        sx={{
          position: 'relative',
          height: '150px',
          '& img': {
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 1
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
        >
          <IconButton onClick={() => onDeleteUploadFile()} aria-label="delete" size="small" color="primary" sx={{
            backgroundColor: theme.palette.grey[100],
            height: 25,
            width: 25,
            "&:hover": {
              backgroundColor: theme.palette.grey[300],
              transform: 'scale(1.1)'
            },
            '& > svg': {
              width: '100%',
              height: '100%'
            }
          }}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
        <img alt='Preview' src={path} />
      </Box>
    </Grid>
  );
};

export default PreviewThumb;
