import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, NavLink, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../../App";
import ReactSwitch from "react-switch";
import "./gamesAppPage.scss";

const GamesAppPage = () => {
  const { user } = useContext(UserContext);

  const [socket, setSocket] = useState(null);
  const [sessionState, setSessionState] = useState(null);
  const [isActiveUser, setIsActiveUser] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:8080", { withCredentials: true });
    socket.on("updated-session", session => setSessionState(session));
    setSocket(socket);

    return () => socket.disconnect();
  }, []);

  const navigate = useNavigate();
  const toggleUser = () => {
    if (!isActiveUser) {
      socket.emit("join-session", user.id);
      setIsActiveUser(true);
      navigate("pick");
    } else {
      socket.emit("leave-session", user.id);
      setIsActiveUser(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!sessionState) {
    return <div>Loading...</div>;
  }

  return (
    <section className="game-app">
      <div className="game-app__wrapper styled-container">
        <label className="game-app__label">
          <ReactSwitch onChange={toggleUser} checked={isActiveUser} />
          <span className="game-app__action">{isActiveUser ? "Leave" : "Join"}</span>
        </label>
        <nav className="game-app__nav">
          <NavLink to="pick" className="game-app__nav-link">
            Pick
          </NavLink>
          <NavLink to="queue" className="game-app__nav-link">
            Games
          </NavLink>
        </nav>
        <Outlet context={{ sessionState, socket }} />
      </div>
    </section>
  );
};
export default GamesAppPage;
