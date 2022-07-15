import { useState } from "react";
import toast from "react-hot-toast";
import expressApi from "../../util/api";
import "./editPasswordModal.scss";

interface Props {
  close: Function;
}

const EditPasswordModal = ({ close }: Props): JSX.Element => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState({ main: "", check: "" });

  const handleNew = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>): Promise<void> => {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter current password");
      return;
    }

    if (newPassword.main !== newPassword.check) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await expressApi.editPassword(password, newPassword.main);
      toast.success("Password Changed");
      close();
      //
    } catch (err: any) {
      toast.error("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="edit-password">
      <h2 className="edit-profile__title">Change Password</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label className="form__label">
          Current Password <span className="form__required">*</span>
          <input
            type="password"
            className="form__input"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <label className="form__label">
          Password <span className="form__required">*</span>
          <input
            type="password"
            className="form__input"
            name="main"
            value={newPassword.main}
            onChange={handleNew}
          />
        </label>
        <label className="form__label">
          Confirm Password <span className="form__required">*</span>
          <input
            type="password"
            className="form__input"
            name="check"
            value={newPassword.check}
            onChange={handleNew}
          />
        </label>
        <div className="edit-password__cta-container">
          <button
            className="edit-password__button styled-button-light"
            type="button"
            onClick={() => close()}
          >
            Cancel
          </button>
          <button className="edit-password__button styled-button-action" type="submit">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditPasswordModal;
