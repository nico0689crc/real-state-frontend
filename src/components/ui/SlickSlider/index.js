import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slider from 'react-slick';
import MediaSlider from './MediaSlider';

const ArrowBackIconCustom = ({ currentSlide, slideCount, ...props }) => <ArrowBackIcon {...props} />
const ArrowForwardIconCustom = ({ currentSlide, slideCount, ...props }) => <ArrowForwardIcon {...props} />

const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <ArrowForwardIconCustom />,
  prevArrow: <ArrowBackIconCustom />
};

const SlickSlider = ({ medias, ...respProps }) => {
  return (
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%'
    }}>
      <MediaSlider>
        <Slider {...settings}>
          {medias.map((media, index) => (
            <Box key={index} sx={{
              position: 'relative',
              height: { xs: 260, md: 320 }
            }} >
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  '& img': {
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                  },
                }}
              >
                <img src={media.media_path} alt={media.media_path} />
              </Box>
            </Box>
          ))}
        </Slider>
      </MediaSlider>
    </Box>
  );
}

export default SlickSlider;