import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CalendarMonth, AttachMoney,BathroomOutlined, BedroomParentOutlined, SquareFootOutlined, MapOutlined, TextFormatOutlined, Close, Title } from '@mui/icons-material';
import { Typography, Stack, MenuItem, InputAdornment, Button, CircularProgress } from '@mui/material';
import API_ENDPOINTS from "constants/endpoints";
import ImageUploadDropzone from "components/ui/ImageUploadDropzone";
import MainCard from "components/ui/Card/MainCard";
import Input from "components/ui/Inputs/Input";
import InputSelect from "components/ui/Inputs/InputSelect";

const PropertyCreateForm = ({ form, onSubmit, isLoading, setUploadedFiles, uploadedFiles, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = form;
  const onDiscardHandler = () => {
    navigate(API_ENDPOINTS.PROPERTIES, { replace: true });
  }

  return (
    <>
      <Typography sx={{ mb: 3 }} variant='h4'>New Property</Typography>
      <Stack direction="row" justifyContent="center" width="100%">
        <MainCard contentSX={{p: '1rem 0 !important'}} sx={{ paddingX: 4, paddingY: 2, maxWidth: "50rem"}}>
          <Stack spacing={2}>
            <Input
              id="title"
              name="title"
              error={!!errors.title} 
              {...register('title')}
              required
              label="Title"
              helperText={!!errors.title?.message && errors.title.message }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Title />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={2}>
              <InputSelect
                name="type"
                id="type"
                label="Type"
                {...register('type')}
                error={!!errors.type}
                helperText={errors.type?.message}
                value="house"
              >
                <MenuItem value="house">House</MenuItem>
                <MenuItem value="appartment">Appartment</MenuItem>
                <MenuItem value="commercial_building">Commercial Building</MenuItem>
              </InputSelect>
              <InputSelect
                name="status"
                id="status"
                label="Status"
                {...register('status')}
                error={!!errors.status}
                helperText={errors.status?.message}
                value="rent"
              >
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="sale">Sale</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </InputSelect>
            </Stack>
            <Input
              id="description"
              label="Description"
              size="small"
              multiline
              fullWidth
              maxRows={4}
              {...register('description')}
              error={errors?.description}
              helperText={errors?.description?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextFormatOutlined />
                  </InputAdornment>
                ),
              }} 
            />
            <Input
              id="address" 
              label="Address" 
              {...register('address')}
              required
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={2}>
              <Input
                id="price" 
                label="Price" 
                {...register('price')}
                required
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
              <Input
                id="operating_since" 
                label="Operating Since" 
                {...register('operating_since')}
                required
                error={!!errors.operating_since}
                helperText={errors.operating_since?.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonth />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
              <Input
                id="bedrooms"
                label="Bedrooms"
                {...register('bedrooms')}
                required
                error={!!errors.bedrooms}
                helperText={errors.bedrooms?.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BedroomParentOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <Input
                id="property_size"
                label="Property Size"
                {...register('property_size')}
                required
                error={!!errors.property_size}
                helperText={errors.property_size?.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SquareFootOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <Input
                id="bathrooms"
                label="Bathrooms"
                {...register('bathrooms')}
                required
                error={!!errors.bathrooms}
                helperText={errors.bathrooms?.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BathroomOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <ImageUploadDropzone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
            <Stack direction="row" justifyContent="center" width="100%" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress sx={{ width: '15px !important', height: '15px !important' }} color="inherit" /> : null}>
                {isLoading ? 'Saving' : 'Save'}
              </Button>
              <Button onClick={onDiscardHandler} variant="outlined" startIcon={<Close />}>
                Discard
              </Button>
            </Stack>
          </Stack>
        </MainCard>
      </Stack>
    </>
  )
}

export default PropertyCreateForm;