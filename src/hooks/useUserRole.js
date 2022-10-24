import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const useUserRole = () => {
  const { t } = useTranslation();

  const userRole =useCallback((role) => {
    let userRole;
    switch (role) {
      case "administrator":
        userRole = t("users.create_edit.labels.user_role_administrator")
        break;
      case "super_administrator":
        userRole = t("users.create_edit.labels.user_role_super_administrator")
        break;
      case "user_regular":
        userRole = t("users.create_edit.labels.user_role_user_regular")
        break;
      default:
        console.log("Please assign a valid user role.");
        break;
    }
    return userRole;
  },[t]);

  return { userRole };
}

export default useUserRole;