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
      <Typography sx={{ mb: 3 }} variant='h4'>{t("properties.create_edit.title_create")}</Typography>
      <Stack direction="row" justifyContent="center" width="100%">
        <MainCard contentSX={{p: '1rem 0 !important'}} sx={{ paddingX: 4, paddingY: 2, maxWidth: "50rem"}}>
          <Stack spacing={2}>
            <Input
              id="title"
              name="title"
              error={!!errors.title} 
              {...register('title')}
              required
              label={t("properties.create_edit.labels.title")}
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
                label={t("properties.create_edit.labels.type")}
                {...register('type')}
                error={!!errors.type}
                helperText={errors.type?.message}
                value="house"
              >
                <MenuItem value="house">{t("properties.create_edit.labels.type_house")}</MenuItem>
                <MenuItem value="appartment">{t("properties.create_edit.labels.type_appartment")}</MenuItem>
                <MenuItem value="commercial_building">{t("properties.create_edit.labels.type_commercial_building")}</MenuItem>
              </InputSelect>
              <InputSelect
                name="status"
                id="status"
                label={t("properties.create_edit.labels.status")}
                {...register('status')}
                error={!!errors.status}
                helperText={errors.status?.message}
                value="rent"
              >
                <MenuItem value="rent">{t("properties.create_edit.labels.status_rent")}</MenuItem>
                <MenuItem value="sale">{t("properties.create_edit.labels.status_sale")}</MenuItem>
                <MenuItem value="inactive">{t("properties.create_edit.labels.status_inactive")}</MenuItem>
              </InputSelect>
            </Stack>
            <Input
              id="description"
              label={t("properties.create_edit.labels.description")}
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
              label={t("properties.create_edit.labels.address")} 
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
                label={t("properties.create_edit.labels.price")} 
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
                label={t("properties.create_edit.labels.operating_since")} 
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
                label={t("properties.create_edit.labels.bedrooms")} 
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
                label={t("properties.create_edit.labels.property_size")} 
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
                label={t("properties.create_edit.labels.bathrooms")} 
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
            <ImageUploadDropzone 
              uploadedFiles={uploadedFiles} 
              setUploadedFiles={setUploadedFiles}
              label={t("properties.create_edit.labels.dropzone_label")} 
            />
            <Stack direction="row" justifyContent="center" width="100%" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress sx={{ width: '15px !important', height: '15px !important' }} color="inherit" /> : null}>
                {isLoading ? t("global.saving_button") : t("global.save_button")}
              </Button>
              <Button onClick={onDiscardHandler} variant="outlined" startIcon={<Close />}>
                {t("global.cancel_button")}
              </Button>
            </Stack>
          </Stack>
        </MainCard>
      </Stack>
    </>
  )
}

export default PropertyCreateForm;