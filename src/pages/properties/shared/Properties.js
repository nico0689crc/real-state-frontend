import { useState } from "react";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import PropertyForm from "./PropertyForm";

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
    "status": yup
      .string()
      .required(t("properties.validations.status.required")),
    "type": yup
      .string()
      .required(t("properties.validations.type.required")),
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
    "title": item ? item.title : "",
    "description": item ? item.description : "",
    "address": item ? item.address : "",
    "bathrooms": item ? item.bathroom_amount : "",
    "bedrooms": item ? item.beedroom_amount : "",
    "operating_since": item ? item.operating_since : "",
    "price": item ? item.price : "",
    "property_size": item ? item.sq_mts : "",
    "type": item ? item.p_type : "",
    "status": item ? item.p_status : "",
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const Properties = ({ item, isLoading, mutate }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { t } = useTranslation();

  const form = useForm(getFormSchema(t, item));

  const onSubmit = async (data) => {
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
    !item && formData.append("property[features]", JSON.stringify(features));
    !item && formData.append("property[facilities]", JSON.stringify(facilities));
    formData.append("property[address]", data['address']);
    formData.append("property[bathroom_amount]", data['bedrooms']);
    formData.append("property[beedroom_amount]", data['bathrooms']);
    formData.append("property[operating_since]", data['operating_since']);
    formData.append("property[price]", data['price']);
    formData.append("property[sq_mts]", data['property_size']);

    uploadedFiles.forEach(file => {
      formData.append("property[medias][]", file);
    });

    mutate({id: item?.id, data: formData});
  }

  return (
    <PropertyForm 
      form={form} 
      onSubmit={onSubmit} 
      isLoading={isLoading} 
      uploadedFiles={uploadedFiles} 
      setUploadedFiles={setUploadedFiles}
      item={item}
    />
  )
}

Properties.propTypes = {
  item: PropTypes.object
}

Properties.defaultProps = {
  item: null,
};

export default Properties;