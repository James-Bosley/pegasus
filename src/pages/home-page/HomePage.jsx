import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import "./homePage.scss";

const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <section className="home">
      <div className="home__wrapper styled-container">
        <h2 className="home__title">
          Welcome{" "}
          {user
            ? `back ${user.first_name[0].toUpperCase() + user.first_name.slice(1)}`
            : "to Pegasus"}
        </h2>
        <p className="home__text">
          Choose games, keep scores, and rank your performance with Pegasus!
        </p>
        {!user && <p className="home__text">Find out more or create an account to get started.</p>}
        <div className="home__cta-container">
          {user ? (
            <Link to="games" className="home__button styled-button-action">
              Go To Games
            </Link>
          ) : (
            <>
              <Link to="login" className="home__button styled-button-light">
                Login
              </Link>
              <Link to="signup" className="home__button styled-button-action">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default HomePage;
