import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadModern from './UploadModern';
import PreviewThumb from './PreviewThumb';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ImageUploadDropzone = ({ uploadedFiles, setUploadedFiles }) => {
  const theme = useTheme();

  const dropzone = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUploadedFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
  }, [dropzone.acceptedFiles]);

  const onDeleteUploadFile = (file) => {
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...dropzone.acceptedFiles]);
  };

  return (
    <Box className='container' sx={{
      border: `1px solid ${theme.palette.mode === 'light' ? '#0000003b' : '#ffffff3b'} `,
      borderRadius: 1,
      p: 2,
      cursor: 'pointer'
    }}>
      {uploadedFiles.length > 0 ?
        <Grid container spacing={2}>
          {uploadedFiles.length > 0 ?
            uploadedFiles.map((file, index) => (
              <Grid key={index} item xs={4} sm={3} lg={2}>
                <PreviewThumb
                  file={file}
                  onDeleteUploadFile={onDeleteUploadFile}
                  key={index + file.path}
                />
              </Grid>
            ))
            : null}
        </Grid>
        : <UploadModern
          uploadText='Drag n drop some files here, or click to select files'
          setUploadedFiles={setUploadedFiles}
          dropzone={dropzone}
        />}

    </Box>
  );
};

export default ImageUploadDropzone;
