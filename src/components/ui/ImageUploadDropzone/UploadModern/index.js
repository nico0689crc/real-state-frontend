import React from 'react';
import Box from '@mui/material/Box';
import { InsertPhotoOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';

const UploadModern = ({ uploadText, dropzone }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,
        p: 7
      }}
    >
      <Box
        {...dropzone.getRootProps({ className: 'dropzone' })}
        sx={{
          cursor: 'pointer',
          borderRadius: 1,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <input {...dropzone.getInputProps()} />
        <InsertPhotoOutlined
          sx={{ fontSize: 40 }}
        />
        <Typography variant='body2' sx={{ mb: 0 }}>{uploadText}</Typography>
      </Box>
    </Box>
  );
};

export default UploadModern;
