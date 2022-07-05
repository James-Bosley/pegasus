import { useContext, useState } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import toast from "react-hot-toast";
import expressApi from "../../util/api";
import googleIcon from "../../assets/icons/google_signin_normal.png";
import "./loginPage.scss";

const LoginPage = () => {
  const { user, changeUser } = useContext(UserContext);

  const location = useLocation();
  const [formValues, setFormValues] = useState({
    username: location.state?.email || "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setFormValues(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  // Saves the token to localStorage so it can be used by the game app.
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await expressApi.loginLocal(formValues);
      localStorage.setItem("authToken", JSON.stringify(data.data.token));
      changeUser();
      //
    } catch (err) {
      toast.error("Incorrect Email / Password");
    }
  };

  if (user) {
    return <Navigate to={"/games/pick"} />;
  }

  return (
    <section>
      <div className="login__wrapper styled-container">
        <h2 className="login__title">Login</h2>
        <form className="form">
          <label className="form__label">
            Email Address
            <input
              type="text"
              name="username"
              className="form__input form__input--login"
              value={formValues.username}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            Password
            <input
              type="password"
              name="password"
              className="form__input form__input--login"
              value={formValues.password}
              onChange={handleChange}
            />
          </label>
        </form>
        <div className="login__cta-container">
          <button
            className="form__submit styled-button-action"
            type="submit"
            onClick={handleSubmit}
          >
            Log In
          </button>
          <p className="login__cta-text">OR</p>
          <a href="http://localhost:8080/v1/login/google" className="login__oauth">
            <img src={googleIcon} alt="Login with Google" className="login__oauth-icon" />
          </a>
        </div>
        <p className="login__info">
          Need an account? Sign up with google by clicking the icon above, or{" "}
          <Link to="/signup" className="login__info--span">
            Register Here
          </Link>
          .
        </p>
      </div>
    </section>
  );
};
export default LoginPage;
