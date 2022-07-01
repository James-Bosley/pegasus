import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import EditProfileModal from "../../components/edit-profile-modal/EditProfileModal";
import EditPasswordModal from "../../components/edit-password-modal/EditPasswordModal";
import Popup from "reactjs-popup";
import "./profilePage.scss";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="profile">
      <div className="profile__wrapper styled-container">
        <div className="profile__avatar">Placeholder Avatar</div>
        <h2 className="profile__subtitle">{user.display_name}</h2>
        <div className="profile__container">
          <Popup
            trigger={<p className="profile__action">Edit Password</p>}
            position="center center"
            modal
          >
            {close => <EditPasswordModal close={close} user={user} />}
          </Popup>
          <Popup
            trigger={<div className="profile__action">Edit Profile</div>}
            position="center center"
            modal
          >
            {close => <EditProfileModal close={close} />}
          </Popup>
        </div>
      </div>
      <div className="profile__wrapper styled-container">
        <p className="profile__text">
          Get your personalised perfomance report here. It is updated every time you request a
          download so you get the most up to date data!
        </p>
        <button className="profile__button styled-button-brand">Download</button>
      </div>
    </section>
  );
};
export default ProfilePage;
