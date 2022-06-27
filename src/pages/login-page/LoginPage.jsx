import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import expressApi from "../../util/api";
import "./loginPage.scss";

const LoginPage = () => {
  const { user, changeUser } = useContext(UserContext);

  const [formValues, setFormValues] = useState({ username: "", password: "" });

  const handleChange = ({ target }) => {
    setFormValues(prevState => ({ ...prevState, [target.name]: target.value }));
  };

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
          <button
            className="form__submit styled-button-action"
            type="submit"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </form>
      </div>
    </section>
  );
};
export default LoginPage;
