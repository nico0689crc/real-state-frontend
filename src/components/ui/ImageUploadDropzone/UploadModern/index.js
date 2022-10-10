import React from 'react';
import Box from '@mui/material/Box';
import { InsertPhotoOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import AppTypography from "components/ui/Typography/AppTypography";

const UploadModern = ({ uploadText, dropzone }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 7,
        },
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
        <InsertPhotoOutlined sx={{ fontSize: 40 }} />
        <AppTypography sx={{fontSize: "1.25rem" }}>{uploadText}</AppTypography>
      </Box>
    </Box>
  );
};

export default UploadModern;
