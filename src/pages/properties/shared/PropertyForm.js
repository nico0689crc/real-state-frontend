import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CalendarMonth, AttachMoney,BathroomOutlined, BedroomParentOutlined, SquareFootOutlined, MapOutlined, TextFormatOutlined, Close, Title } from '@mui/icons-material';
import { Stack, InputAdornment, Button, CircularProgress } from '@mui/material';
import { snackBarAlertActions } from "store/snackBarAlertSlice";
import API_ENDPOINTS from "constants/endpoints";
import ImageUploadDropzone from "components/ui/ImageUploadDropzone";
import MainCard from "components/ui/Card/MainCard";
import Input from "components/ui/Inputs/Input";
import InputSelect from "components/ui/Inputs/InputSelect";
import useDestroyPropertyImageMutation from "hooks/queries/properties/useDestroyPropertyImageMutation";

const PropertyForm = ({ form, onSubmit, isLoading, setUploadedFiles, uploadedFiles, item }) => {
  let submit_label;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSnackBarAlert } = snackBarAlertActions;
  const [existingFiles, setExistingFiles] = useState(item?.media.map(file => ({
    id: file.id,
    path: file.media_path,
    onDelete: () => onDeleteExistingFileHandler(file),
    isLoading: false
  })));
  const { register, handleSubmit, formState: { errors } } = form;
  
  const onDiscardHandler = () => {
    navigate(API_ENDPOINTS.PROPERTIES, { replace: true });
  }

  const onSuccessHandler = () => {
    dispatch(setSnackBarAlert({
      type: "success",
      content: {
        title: t("properties.create_edit.success_image_destroy_title"),
        message: t("properties.create_edit.success_image_destroy_message")
      }
    }));

    setExistingFiles(prev => prev.filter(f => !f.isLoading));
  }

  const onErrorHandler = (data) => {
    const { status, exception, error } = data.response.data;
    
    dispatch(setSnackBarAlert({
      type: "error",
      content: {
        title: error,
        subTitle: status,
        message: exception
      }
    }));

    setExistingFiles(prev => prev.map(f => {
      f.isLoading = false;
      return f;
    }));
  }

  const { mutate: detroyPropertyImage } = useDestroyPropertyImageMutation(onSuccessHandler, onErrorHandler);

  function onDeleteExistingFileHandler(file) {    
    setExistingFiles(prev => prev.map(f => {
      f.isLoading = f.id === file.id;
      return f;
    }));
    detroyPropertyImage({ property_id: item.id, media_id: file.id });
  }

  if(item){
    submit_label = isLoading ? t("global.updating_button") : t("global.update_button");
  } else {
    submit_label = isLoading ? t("global.saving_button") : t("global.save_button");
  }

  return (
    <Stack direction="row" justifyContent="center" width="100%">
      <MainCard contentSX={{p: '0 !important'}} sx={{paddingX: {xs: 2, md: 4}, paddingY: {xs: 2, md: 2}, maxWidth: "50rem"}}>
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
          <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
            <InputSelect
              name="type"
              id="type"
              label={t("properties.create_edit.labels.type")}
              error={!!errors.type}
              helperText={errors.type?.message}
              control={form.control}
              options={[
                { value: "house", text: t("properties.create_edit.labels.type_house") },
                { value: "appartment", text: t("properties.create_edit.labels.type_appartment") },
                { value: "commercial_building", text: t("properties.create_edit.labels.type_commercial_building") },
              ]}
            />
            <InputSelect
              name="status"
              id="status"
              label={t("properties.create_edit.labels.status")}
              error={!!errors.status}
              helperText={errors.status?.message}
              control={form.control}
              options={[
                { value: "rent", text: t("properties.create_edit.labels.status_rent") },
                { value: "sale", text: t("properties.create_edit.labels.status_sale") },
                { value: "inactive", text: t("properties.create_edit.labels.status_inactive") },
              ]}
            />
          </Stack>
          <Input
            id="description"
            label={t("properties.create_edit.labels.description")}
            size="small"
            multiline={true}
            fullWidth
            rows={6}
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
          <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
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
            onDeleteExistingFile={onDeleteExistingFileHandler}
            label={t("properties.create_edit.labels.dropzone_label")}
            existingFiles={existingFiles} 
          />
          <Stack direction={{xs: 'column-reverse', sm: 'row'}} justifyContent="center" width="100%" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress sx={{ width: '15px !important', height: '15px !important' }} color="inherit" /> : null}
            >
              {submit_label}
            </Button>
            <Button onClick={onDiscardHandler} variant="outlined" startIcon={<Close />}>
              {t("global.cancel_button")}
            </Button>
          </Stack>
        </Stack>
      </MainCard>
    </Stack>
  )
}

export default PropertyForm;