import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import expressApi from "../../util/api";
import EditProfileModal from "../../components/edit-profile-modal/EditProfileModal";
import EditPasswordModal from "../../components/edit-password-modal/EditPasswordModal";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";
import "./profilePage.scss";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const handleDownload = async () => {
    try {
      const { data } = await expressApi.getReport();
      // Creates a Blob from the PDF Stream.
      const file = new Blob([data], { type: "application/pdf" });
      // Builds a URL from the file.
      const fileURL = URL.createObjectURL(file);
      // Open the new URL on new Window.
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;
      //
    } catch (err) {
      toast.error("Please sign in to view your report.");
      navigate("/login");
    }
  };

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
        <button className="profile__button styled-button-brand" onClick={handleDownload}>
          Download
        </button>
      </div>
    </section>
  );
};

export default ProfilePage;
