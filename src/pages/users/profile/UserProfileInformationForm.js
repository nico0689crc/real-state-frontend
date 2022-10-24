import { useSelector } from "react-redux";
import UserEdit from "pages/users/edit/UserEdit";

const UserProfileInformationForm = () => {
  const { attributes } = useSelector(state => state.authStore);
  return attributes && <UserEdit user={attributes} isProfileUpdate={true} isDialog={false}/>;
}

export default UserProfileInformationForm;