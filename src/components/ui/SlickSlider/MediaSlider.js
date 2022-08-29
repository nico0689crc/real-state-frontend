import React from 'react';
import PropsTypes from 'prop-types';
import { Box } from '@mui/material';

const MediaSlider = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100%',
        '& .slick-slider': {
          height: '100%',
          position: 'relative'
        },
        '& .slick-list': {
          height: '100%',
          overflow: 'hidden'
        },
        '& .slick-track': {
          height: '100%',
          display: 'flex'
        },
        '& .slick-slide > div, & .slick-slide > div > div': {
          width: '100%',
          height: '100%',
        },
        '& .slick-slide img': {
          width: '100%',
          height: '100%',
          borderRadius: 2.5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },
        '& .slick-dots': {
          position: 'absolute',
          display: 'flex !important',
          width: '100%',
          height: '25px',
          margin: 0,
          bottom: '10px',
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
          listStyle: 'none',
          '& li': {
            marginLeft: '5px',
            transition: 'all 0.4s ease',
            '& button': {
              cursor: 'pointer',
              width: '10px',
              height: '10px',
              fontSize: 0,
              borderRadius: '50%',
              border: 0,
              padding: 0,
              transition: 'all 0.4s ease',
            },
            '&.slick-active > button': {
              backgroundColor: '#ff5c41',
              width: '12px',
              height: '12px',
            },
          },
        },
        '& .slick-prev, & .slick-next': {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 30,
          height: 30,
          borderRadius: '50%',
          display: 'flex !important',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: 'none',
          color: 'white',
          fontSize: 0,
          padding: '5px',
          transition: 'ease 0.2s all',
          backgroundColor: 'rgb(0 0 0 / 50%)',
          '&:hover, &:focus': {
            backgroundColor: (theme) => 'rgb(0 0 0 / 70%)',
            color: '#ff5c41'
          },
        },
        '& .slick-next': {
          right: 15,
          zIndex: 1,
        },
        '& .slick-prev': {
          left: 15,
          zIndex: 1,
        }
      }}
    >
      {children}
    </Box>
  );
};

export default MediaSlider;

MediaSlider.propTypes = {
  children: PropsTypes.node,
};
