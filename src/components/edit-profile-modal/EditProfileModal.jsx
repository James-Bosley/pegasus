import { useContext, useState } from "react";
import { UserContext } from "../../App";
import toast from "react-hot-toast";
import expressApi from "../../util/api";
import "./editProfileModal.scss";

const EditProfileModal = ({ close }) => {
  const { user, changeUser } = useContext(UserContext);
  const [userEdits, setUserEdits] = useState(user);

  const handleChange = ({ target }) => {
    setUserEdits(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await expressApi.editProfile(userEdits);
      toast.success("Changes Submitted");
      changeUser();
      close();
      //
    } catch (err) {
      toast.error("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="edit-profile">
      <h2 className="edit-profile__title">Edit Profile</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label className="form__label">
          First Name <span className="form__required">*</span>
          <input
            type="text"
            className="form__input"
            name="first_name"
            value={userEdits.first_name}
            onChange={handleChange}
          />
        </label>
        <label className="form__label">
          Last Name <span className="form__required">*</span>
          <input
            type="text"
            className="form__input"
            name="last_name"
            value={userEdits.last_name}
            onChange={handleChange}
          />
        </label>
        <label className="form__label">
          Display Name - what other users will see <span className="form__required">*</span>
          <input
            type="text"
            className="form__input"
            name="display_name"
            value={userEdits.display_name}
            onChange={handleChange}
          />
        </label>
        <div className="edit-profile__select-container">
          <label className="form__label">
            Gender
            <select
              name="gender"
              className="form__select"
              defaultValue=""
              value={userEdits.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Please select...
              </option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="">Prefer not to say</option>
            </select>
          </label>
          <label className="form__label">
            Handedness
            <select
              name="handedness"
              className="form__select"
              defaultValue=""
              value={userEdits.handedness}
              onChange={handleChange}
            >
              <option value="" disabled>
                Please select...
              </option>
              <option value="r">Right</option>
              <option value="l">Left</option>
              <option value="">Prefer not to say</option>
            </select>
          </label>
        </div>
        <div className="edit-profile__cta-container">
          <button
            className="edit-profile__button styled-button-light"
            type="button"
            onClick={() => close()}
          >
            Cancel
          </button>
          <button className="edit-profile__button styled-button-action" type="submit">
            Confirm Changes
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditProfileModal;
