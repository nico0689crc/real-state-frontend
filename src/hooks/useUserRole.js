import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const useUserRole = () => {
  const { t } = useTranslation();
  

  const userRoleLabel = useCallback((role) => {
    let userRole;
    switch (role) {
      case "super_administrator":
        userRole = t("users.create_edit.labels.user_role_super_administrator")
        break;
      case "administrator":
        userRole = t("users.create_edit.labels.user_role_administrator")
        break;
      case "real_estate_administrator":
        userRole = t("users.create_edit.labels.user_role_real_estate_administrator")
        break;
      case "agent":
        userRole = t("users.create_edit.labels.user_role_agent")
        break;
      case "user_regular":
        userRole = t("users.create_edit.labels.user_role_user_regular")
        break;
      case "banned":
        userRole = t("users.create_edit.labels.user_role_banned")
        break;
      default:
        console.log("Please assign a valid user role.");
        break;
    }
    return userRole;
  },[t]);

  const userRoles = useCallback((user_role) => {
    
    const roles = {
      super_administrator: ["super_administrator", "administrator", "real_estate_administrator", "agent", "user_regular", "banned"], 
      administrator: ["administrator"],
      real_estate_administrator: ["real_estate_administrator", "agent"],
      agent: ["agent"],   
      user_regular: ["user_regular"], 
      banned: ["banned"]
    };

    const permittedRoles = roles[user_role].map(rol => ({ 
      value: rol, text: userRoleLabel(rol) 
    }));

    return permittedRoles;
  },[userRoleLabel]);

  return { userRoleLabel, userRoles };
}

export default useUserRole;