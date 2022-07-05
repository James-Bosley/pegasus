import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, NavLink, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../../App";
import ReactSwitch from "react-switch";
import "./gamesAppPage.scss";

const GamesAppPage = () => {
  const { user } = useContext(UserContext);

  const [socket, setSocket] = useState(null);
  const [notificationKey, setNotificationKey] = useState(null);
  const [sessionState, setSessionState] = useState(null);
  const [isActiveUser, setIsActiveUser] = useState(false);

  useEffect(() => {
    let token = null;
    if (localStorage.getItem("authToken")) {
      token = JSON.parse(localStorage.getItem("authToken"));
    }

    const socket = io(process.env.REACT_APP_API || "https://gochamp-server.herokuapp.com", {
      query: { token },
      withCredentials: true,
    });

    socket.on("updated-session", session => setSessionState(session));
    socket.on("notifications-key", key => setNotificationKey(key));

    setSocket(socket);

    return () => socket.disconnect();
  }, [user]);

  const getSubscription = async () => {
    const sw = await navigator.serviceWorker.ready;

    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: notificationKey,
    });

    const asString = JSON.stringify(subscription);
    return JSON.parse(asString);
  };

  const navigate = useNavigate();
  const toggleUser = async () => {
    if (!isActiveUser) {
      socket.emit("join-session", user.id);
      setIsActiveUser(true);

      const subscription = await getSubscription();
      if (subscription) {
        socket.emit("notifications-start", { id: user.id, ...subscription });
      }

      navigate("pick");
      //
    } else {
      socket.emit("leave-session", user.id);
      setIsActiveUser(false);

      const sw = await navigator.serviceWorker.ready;
      const subscription = await sw.pushManager.getSubscription();
      await subscription.unsubscribe();
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
