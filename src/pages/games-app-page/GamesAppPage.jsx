import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../../App";
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

  // Example update obj:
  //   {
  //     type: "record-result" || "start",
  //     payload: { win_score: 21, lose_score: 10, winningPlayers: [21], losingPlayers: [17] },
  //   }

  const handleJoin = () => {
    socket.emit("join-session", user.id);
    setIsActiveUser(true);
  };

  const handleLeave = () => {
    socket.emit("leave-session", user.id);
    setIsActiveUser(false);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!sessionState) {
    return <div>Loading...</div>;
  }

  return (
    <section className="app" style={{ width: "80%" }}>
      <div className="app__wrapper styled-container">
        <nav className="app__nav">
          <NavLink to="pick" className="app__nav-link">
            Pick
          </NavLink>
          <NavLink to="queue" className="app__nav-link">
            Games
          </NavLink>
        </nav>
        <Outlet context={{ sessionState, socket }} />
        {isActiveUser ? (
          <button className="app__button styled-button-light" onClick={handleLeave}>
            Leave Session
          </button>
        ) : (
          <button className="app__button styled-button-action" onClick={handleJoin}>
            Join Session
          </button>
        )}
      </div>
    </section>
  );
};
export default GamesAppPage;
