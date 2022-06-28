import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./profilePage.scss";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>ProfilePage</div>;
};
export default ProfilePage;
