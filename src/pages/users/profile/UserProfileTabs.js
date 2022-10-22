import { useTranslation } from "react-i18next";
import AppTabs from "components/ui/Tabs/AppTabs";
import MainCard from "components/ui/Card/MainCard";
import UserProfileInformationForm from "./UserProfileInformationForm";
import UserProfileChangePasswordForm from "./UserProfileChangePasswordForm";

const UserProfileTabs = () => {
  const { t } = useTranslation();

  return (
    <MainCard contentSX={{paddingX: 3, paddingY: 2}}>
      <AppTabs 
        tabs={[{
          label: t("users.profile.sections.user_information"),
          content: () => <UserProfileInformationForm />
        },{
          label: t("users.profile.sections.change_password"),
          content: () => <UserProfileChangePasswordForm />
        }]}
      />
    </MainCard>
  );
}

export default UserProfileTabs;