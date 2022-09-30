import { useState } from "react";
import useCreatePropertyMutation from "hooks/queries/properties/propertiesCreateMutation";
import ImageUploadDropzone from "components/ui/ImageUploadDropzone";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "constants/endpoints";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Typography,
  Box,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  InputAdornment,
  Button,
  CircularProgress,
  Select
} from '@mui/material';
import {
  CalendarMonth,
  AttachMoney,
  BathroomOutlined,
  BedroomParentOutlined,
  SquareFootOutlined,
  MapOutlined,
  TextFormatOutlined,
  Close,
  Title
} from '@mui/icons-material';

const getFormSchema = (t, item) => {
  const formSchema = yup.object().shape({
    "title": yup
      .string()
      .required(t("properties.validations.title.required")),
    "description": yup
      .string()
      .required(t("properties.validations.description.required")),
    "address": yup
      .string()
      .required(t("properties.validations.address.required")),
    "operating_since": yup
      .number()
      .typeError(t("properties.validations.operating_since.type_error_number"))
      .positive(t("properties.validations.operating_since.positive_field")),
    "price": yup
      .number()
      .typeError(t("properties.validations.price.type_error_number"))
      .positive(t("properties.validations.price.positive_field")),
    "bedrooms": yup
      .number()
      .typeError(t("properties.validations.bedrooms.type_error_number"))
      .positive(t("properties.validations.bedrooms.positive_field")),
    "bathrooms": yup
      .number()
      .typeError(t("properties.validations.bathrooms.type_error_number"))
      .positive(t("properties.validations.bathrooms.positive_field")),
    "property_size": yup
      .number()
      .typeError(t("properties.validations.property_size.type_error_number"))
      .positive(t("properties.validations.property_size.positive_field")),
  });

  const defaultValues = {
    "title": item ? item.title : "Happily final air prize grow earlier promised since.",
    "description": item ? item.description : "Meal signal grabbed universe wind take forget highway animal sort somewhere along include personal anywhere anybody through dry crop met powerful there father water",
    "address": "LtqSRyyFqgno yPZFN2ECDrK8n2z VgFKY2YqmNubhAUfq7a",
    "bathrooms": "2",
    "bedrooms": "3",
    "operating_since": "1955",
    "price": "1550000.0",
    "property_size": "500"
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const PropertiesCreate = ({ item, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formHook = useForm(getFormSchema(t, item));
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { mutate: createProperty, isLoading } = useCreatePropertyMutation();
  const onDiscardHandler = () => {
    navigate(API_ENDPOINTS.PROPERTIES, { replace: true });
  }

  const onSubmitHandler = async (data) => {
    const facilities = [
      {
        "name": "Free Wi-Fi",
        "icon_name": "WifiIcon",
        "important": false
      },
      {
        "name": "Shower",
        "icon_name": "ShowerIcon",
        "important": true
      },
      {
        "name": "Free Parking In The Area",
        "icon_name": "GarageIcon",
        "important": true
      }
    ];

    const features = [
      {
        "name": "Balcony",
        "icon_name": "BalconyIcon",
        "important": false,
        "value": 1
      },
      {
        "name": "Bathroom",
        "icon_name": "BathroomIcon",
        "important": true,
        "value": 1
      },
      {
        "name": "Livingroom",
        "icon_name": "LivingIcon",
        "important": true,
        "value": 2
      }
    ];


    const formData = new FormData();
    formData.append("property[title]", data['title']);
    formData.append("property[description]", data['description']);
    formData.append("property[p_type]", data['type']);
    formData.append("property[p_status]", data['status']);
    formData.append("property[features]", JSON.stringify(features));
    formData.append("property[facilities]", JSON.stringify(facilities));
    formData.append("property[address]", data['address']);
    formData.append("property[bathroom_amount]", data['bedrooms']);
    formData.append("property[beedroom_amount]", data['bathrooms']);
    formData.append("property[operating_since]", data['operating_since']);
    formData.append("property[price]", data['price']);
    formData.append("property[sq_mts]", data['property_size']);

    uploadedFiles.forEach(file => {
      formData.append("property[medias][]", file);
    });

    createProperty(formData, {
      onError: () => { }
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ mb: 3 }} variant='h4'>New Property</Typography>
      <form onSubmit={formHook.handleSubmit(onSubmitHandler)}>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                label="Title"
                id="title"
                size="small"
                fullWidth
                {...formHook.register('title')}
                error={formHook?.formState?.errors?.title}
                helperText={formHook?.formState?.errors?.title?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Title />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl size="small" sx={{ width: '100%' }}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  label="Type"
                  {...formHook.register('type')}
                  error={formHook?.formState?.errors?.type}
                  helperText={formHook?.formState?.errors?.type?.message}
                  value="house"
                >
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="appartment">Appartment</MenuItem>
                  <MenuItem value="commercial_building">Commercial Building</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl size="small" sx={{ width: '100%' }}>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  label="Status"
                  value="rent"
                  {...formHook.register('status')}
                  error={formHook?.formState?.errors?.status}
                  helperText={formHook?.formState?.errors?.status?.message}
                >
                  <MenuItem value="rent">Rent</MenuItem>
                  <MenuItem value="sale">Sale</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                size="small"
                multiline
                fullWidth
                maxRows={4}
                {...formHook.register('description')}
                error={formHook?.formState?.errors?.description}
                helperText={formHook?.formState?.errors?.description?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TextFormatOutlined />
                    </InputAdornment>
                  ),
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address" label="Address" fullWidth size="small"
                {...formHook.register('address')}
                error={formHook?.formState?.errors?.address}
                helperText={formHook?.formState?.errors?.address?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                id="operating_since" label="Operating Since" fullWidth size='small'
                {...formHook.register('operating_since')}
                error={formHook?.formState?.errors?.operating_since}
                helperText={formHook?.formState?.errors?.operating_since?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonth />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                id="price" label="Price" fullWidth size='small'
                {...formHook.register('price')}
                error={formHook?.formState?.errors?.price}
                helperText={formHook?.formState?.errors?.price?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                id="bathrooms"
                label="Bathrooms"
                fullWidth
                size='small'
                {...formHook.register('bathrooms')}
                error={formHook?.formState?.errors?.bathrooms}
                helperText={formHook?.formState?.errors?.bathrooms?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BathroomOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                id="bedrooms"
                label="Bedrooms"
                fullWidth
                size='small'
                {...formHook.register('bedrooms')}
                error={formHook?.formState?.errors?.bedrooms}
                helperText={formHook?.formState?.errors?.bedrooms?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BedroomParentOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                id="property_size"
                label="Property Size"
                fullWidth
                size='small'
                {...formHook.register('property_size')}
                error={formHook?.formState?.errors?.property_size}
                helperText={formHook?.formState?.errors?.property_size?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SquareFootOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUploadDropzone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress sx={{ width: '15px !important', height: '15px !important' }} color="inherit" /> : null}>
            {isLoading ? 'Saving' : 'Save'}
          </Button>
          <Button onClick={onDiscardHandler} variant="outlined" startIcon={<Close />} sx={{ ml: 2 }}>
            Discard
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default PropertiesCreate;