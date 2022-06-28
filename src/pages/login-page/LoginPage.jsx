import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../../App";
import expressApi from "../../util/api";
import googleIcon from "../../assets/icons/google_signin_normal.png";
import "./loginPage.scss";

const LoginPage = () => {
  const { user, changeUser } = useContext(UserContext);

  const [formValues, setFormValues] = useState({ username: "", password: "" });

  const handleChange = ({ target }) => {
    setFormValues(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  // Saves the token to localStorage so it can be used by the game app.
  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await expressApi.loginLocal(formValues);
    localStorage.setItem("authToken", JSON.stringify(data.token));
    changeUser();
  };

  if (user) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <section>
      <div className="login__wrapper styled-container">
        <h2 className="login__title">Login</h2>
        <form className="form">
          <label className="form__label">
            Username
            <input
              type="text"
              name="username"
              className="form__input"
              value={formValues.username}
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            Password
            <input
              type="password"
              name="password"
              className="form__input"
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
          <a href="http://localhost:8080/v1/login/google">
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
