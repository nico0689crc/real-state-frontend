import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import UploadModern from './UploadModern';
import PreviewThumb from './PreviewThumb';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { borderRadius } from 'constants/ui';

const GridContainer = ({ files }) => {
  return <Grid container spacing={2}>
    {files.map((file, index) => (
      <PreviewThumb 
        path={file.path} 
        onDeleteUploadFile={file.onDelete} key={index} 
      />
    ))}  
  </Grid>
}

const ImageUploadDropzone = ({ uploadedFiles, setUploadedFiles, onDeleteExistingFile, existingImages, label }) => {
  const theme = useTheme();

  const dropzone = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png']},
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })));
    },
  });
  useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
  }, [dropzone.acceptedFiles, setUploadedFiles]);

  const onDeleteUploadFile = (file) => {
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...dropzone.acceptedFiles]);
  };

  const onDeleteExistingFileHandler = (file) => {
    onDeleteExistingFile(file);
  };

  return (
    <Box className='container' sx={{
      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.42)'}`,
      borderRadius: `${borderRadius}px`, p: 2, cursor: 'pointer'
    }}>
      {existingImages && existingImages.length > 0 && (
        <GridContainer files={existingImages.map(file => ({
          path: file.media_path,
          onDelete: () => onDeleteExistingFileHandler(file)
        }))}/>
      )}

      {!existingImages && uploadedFiles.length > 0 && (
        <GridContainer files={uploadedFiles.map(file => ({ 
          path: file.preview, 
          onDelete: () => onDeleteUploadFile(file)
        }))}/>
      )}

      {((existingImages && existingImages.length === 0) || (!existingImages && uploadedFiles.length === 0)) && (
        <UploadModern uploadText={label} setUploadedFiles={setUploadedFiles} dropzone={dropzone} />
      )}
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
