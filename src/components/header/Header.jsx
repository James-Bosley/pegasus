import { slide as BurgerMenu } from "react-burger-menu";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="drop-menu__container">
          <BurgerMenu className="drop-menu">
            <NavLink to="about" className="drop-menu__item">
              About
            </NavLink>
            {user ? (
              <>
                <NavLink to="games" className="drop-menu__item">
                  Games
                </NavLink>
                <NavLink to="profile" className="drop-menu__item">
                  Profile
                </NavLink>
              </>
            ) : (
              <NavLink to="login" className="drop-menu__item">
                Login / Signup
              </NavLink>
            )}
          </BurgerMenu>
        </div>
        <Link to="/" className="header__logo-container">
          <h1 className="header__logo">Pegasus</h1>
        </Link>
        {user ? (
          <Link to="profile" className="header__user">
            Profile
          </Link>
        ) : (
          <Link to="login" className="header__user">
            Login / Signup
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
