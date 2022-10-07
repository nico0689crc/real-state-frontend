import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import UploadModern from './UploadModern';
import PreviewThumb from './PreviewThumb';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { borderRadius } from 'constants/ui';

const ImageUploadDropzone = ({ uploadedFiles, setUploadedFiles, label }) => {
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
  }, [dropzone.acceptedFiles, setUploadedFiles]);

  const onDeleteUploadFile = (file) => {
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...dropzone.acceptedFiles]);
  };

  return (
    <Box className='container' sx={{
      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.42)'}`,
      borderRadius: `${borderRadius}px`,
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
          uploadText={label}
          setUploadedFiles={setUploadedFiles}
          dropzone={dropzone}
        />}

    </Box>
  );
};

ImageUploadDropzone.propTypes = {
  label: PropTypes.string
}

ImageUploadDropzone.defaultProps = {
  label: "Drag and drop some files here, or click to select files.",
};

export default ImageUploadDropzone;
