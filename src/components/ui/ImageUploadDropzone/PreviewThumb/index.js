import React from 'react';
import { useTranslation } from "react-i18next";
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AppIconButton from 'components/ui/Buttons/AppIconButton/AppIconButton';

const PreviewThumb = ({ path, onDeleteUploadFile, isLoading }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  return (
    <Grid item xs={12} sm={3}>
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
          <AppIconButton
            type="submit"
            variant="contained"
            disabled={isLoading}
            size="small"
            onClick={onDeleteUploadFile}
            isLoading={isLoading}
            tooltipText={t("global.delete")}
            tooltipPlacement="left"
            sx={{
              backgroundColor: "#ffebee !important",
              color: `${theme.palette.primary.main} !important`,
              '&:hover': {
                color: `${theme.palette.primary.main} !important`,
                backgroundColor: "#ffcdd2 !important",
              }
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{height: "20px", width: "20px"}}/>
          </AppIconButton>
        </Box>
        <img alt='Preview' src={path} />
      </Box>
    </Grid>
  );
};

export default PreviewThumb;
