import { useTranslation } from "react-i18next";
import AppTabs from "components/ui/Tabs/AppTabs";
import UserProfileInformationForm from "./UserProfileInformationForm";
import UserProfileChangePasswordForm from "./UserProfileChangePasswordForm";

const UserProfileTabs = () => {
  const { t } = useTranslation();

  return (
    <AppTabs 

      tabs={[{
        label: t("users.profile.sections.user_information"),
        content: () => <UserProfileInformationForm />
      },{
        label: t("users.profile.sections.change_password"),
        content: () => <UserProfileChangePasswordForm />
      }]}
    />
  );
}

export default UserProfileTabs;