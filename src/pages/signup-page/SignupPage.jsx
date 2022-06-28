import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { toast } from "react-hot-toast";
import expressApi from "../../util/api";
import "./signupPage.scss";

const SignupPage = () => {
  const { user } = useContext(UserContext);

  const requiredFields = {
    email: "",
    first_name: "",
    last_name: "",
    display_name: "",
    auth_method: "local",
    password: "",
    confirm_password: "",
  };

  const [formValues, setFormValues] = useState(requiredFields);
  const [error, setError] = useState(false);

  const handleChange = ({ target }) => {
    setFormValues(prevState => ({ ...prevState, [target.name]: target.value }));

    if (target.name === "confirm_password") {
      target.classList.remove("form__input--error");

      if (formValues.password !== target.value) {
        target.classList.add("form__input--error");
      } else {
        target.classList.add("form__input--match");
      }
    }
  };

  const validateForm = e => {
    let isValid = true;
    Object.keys(requiredFields).forEach(field => {
      e.target[field].classList.remove("form__input--error");

      if (!e.target[field].value) {
        e.target[field].classList.add("form__input--error");
        isValid = false;
      }
    });
    return isValid;
  };

  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();

    const isValid = validateForm(e);
    if (!isValid) {
      setError("Please complete all required fields");
      toast.error("Please complete all required fields");
      return;
    }

    if (formValues.password !== formValues.confirm_password) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      await expressApi.addUser(formValues);
      toast.success("Account created!");
      navigate("/login", { state: { email: formValues.email } });
      //
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="signup">
      <div className="signup__wrapper styled-container">
        <h2 className="signup__title">Sign up for Pegasus</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__label">
            Email Address <span className="form__required">*</span>
            <input
              type="email"
              className="form__input"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            First Name <span className="form__required">*</span>
            <input
              type="text"
              className="form__input"
              name="first_name"
              value={formValues.first_name}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            Last Name <span className="form__required">*</span>
            <input
              type="text"
              className="form__input"
              name="last_name"
              value={formValues.last_name}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            Display Name - what other users will see <span className="form__required">*</span>
            <input
              type="text"
              className="form__input"
              name="display_name"
              value={formValues.display_name}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            Password <span className="form__required">*</span>
            <input
              type="password"
              className="form__input"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            Confirm Password <span className="form__required">*</span>
            <input
              type="password"
              className="form__input"
              name="confirm_password"
              value={formValues.confirm_password}
              onChange={handleChange}
            />
          </label>
          <div className="form__select-container">
            <label className="form__label">
              Gender
              <select name="gender" className="form__select" defaultValue="">
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
              <select name="gender" className="form__select" defaultValue="">
                <option value="" disabled>
                  Please select...
                </option>
                <option value="r">Right</option>
                <option value="l">Left</option>
                <option value="">Prefer not to say</option>
              </select>
              <input type="hidden" name="auth_method" value={formValues.auth_method} />
            </label>
          </div>
          <button type="submit" className="signup__button styled-button-action">
            Submit
          </button>
        </form>
        {error && <p className="signup__error">{error}</p>}
      </div>
    </section>
  );
};
export default SignupPage;
