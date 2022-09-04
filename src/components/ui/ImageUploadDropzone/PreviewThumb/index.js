import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const PreviewThumb = ({ file, onDeleteUploadFile }) => {
  const theme = useTheme();
  return (
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
        <IconButton onClick={() => onDeleteUploadFile(file)} aria-label="delete" size="small" color="primary" sx={{
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
      <img alt='preview' src={file.preview} />
    </Box>
  );
};

export default PreviewThumb;
