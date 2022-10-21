import { useSelector, useDispatch } from "react-redux";
import { usersActions, FORM_TYPES } from "store/users/usersSlice";
import UserEdit from "pages/users/edit/UserEdit";

const UserProfileInformationForm = () => {
  const dispatch = useDispatch();
  const {attributes} = useSelector(state => state.authStore);

  dispatch(usersActions.setUserEditFormType({userEditFormType: FORM_TYPES.NORMAL}));

  return <UserEdit user={attributes}/>
}

export default UserProfileInformationForm;