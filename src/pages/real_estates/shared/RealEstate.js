import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import RealEstateForm from "./RealEstateForm";

const getFormSchema = (t, item) => {

  const formSchema = yup.object().shape({
    "name": yup.string().required(t("real_estates.validations.required")),
    "description": yup.string().required(t("real_estates.validations.required")),
    "contact_phone": yup.string().required(t("real_estates.validations.required")),
    "contact_email": yup.string().required(t("real_estates.validations.required")),
    "address": yup.string().required(t("real_estates.validations.required")),
    ...(!item ? {
      "first_name": yup.string().required(t("real_estates.validations.required")),
      "last_name": yup.string().required(t("real_estates.validations.required")),
      "email": yup.string().required(t("real_estates.validations.required")),
      "password": yup.string().required(t("real_estates.validations.required")),
      "password_confirmation": yup.string().required(t("real_estates.validations.required"))
    } : {})
  });

  const defaultValues = {
    "name": item ? item.name : "",
    "description": item ? item.description : "",
    "contact_phone": item ? item.contact_phone : "",
    "contact_email": item ? item.contact_email : "",
    "address": item ? item.address : "",
    ...(!item ? {
      "first_name": "",
      "last_name": "",
      "email": "",
      "password": "",
      "password_confirmation": ""
    } : {})
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const RealEstate = ({ item, isLoading, mutate }) => {
  const { t } = useTranslation();

  const form = useForm(getFormSchema(t, item));

  const onSubmit = async (data) => {

    const formData = new FormData();
    
    formData.append("real_estate[name]", data['name']);
    formData.append("real_estate[description]", data['description']);
    formData.append("real_estate[contact_phone]", data['contact_phone']);
    formData.append("real_estate[contact_email]", data['contact_email']);
    formData.append("real_estate[address]", data['address']);

    if(!item){
      formData.append("real_estate[real_estate_user_responsible_attributes][first_name]", data['first_name']);
      formData.append("real_estate[real_estate_user_responsible_attributes][last_name]", data['last_name']);
      formData.append("real_estate[real_estate_user_responsible_attributes][email]", data['email']);
      formData.append("real_estate[real_estate_user_responsible_attributes][password]", data['password']);
      formData.append("real_estate[real_estate_user_responsible_attributes][password_confirmation]", data['password_confirmation']);
    }

    mutate({id: item?.id, data: formData});
  }

  return (
    <RealEstateForm 
      form={form} 
      onSubmit={onSubmit} 
      isLoading={isLoading}
      item={item}
    />
  )
}

RealEstate.propTypes = {
  item: PropTypes.object
}

RealEstate.defaultProps = {
  item: null,
};

export default RealEstate;