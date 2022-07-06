import { useCallback, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, NavLink, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../../App";
import ReactSwitch from "react-switch";
import "./gamesAppPage.scss";
import toast from "react-hot-toast";

const GamesAppPage = () => {
  const { user } = useContext(UserContext);

  const [socket, setSocket] = useState(null);
  const [notificationKey, setNotificationKey] = useState(null);
  const [sessionState, setSessionState] = useState(null);
  const [isActiveUser, setIsActiveUser] = useState(false);

  const getUsersInGames = useCallback(() => {
    if (!sessionState) return [];

    const gameWaitUsers = sessionState.games.wait.flatMap(game => game.players.map(i => i.id));
    const gameOnUsers = sessionState.games.on.flatMap(game => game.players.map(i => i.id));

    return [...gameWaitUsers, ...gameOnUsers];
  }, [sessionState]);

  // Checks if a user should be flagged as active.
  useEffect(() => {
    if (!user || !sessionState) return;

    const queueUsers = sessionState.queue.map(i => i.id);
    if ([...queueUsers, ...getUsersInGames()].includes(user.id)) {
      setIsActiveUser(true);
    }
  }, [getUsersInGames, sessionState, user]);

  // Connects socket and sets up notification alerts.
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
      if (getUsersInGames().includes(user.id)) {
        toast.error("You cannot leave whilst picked for a game");
        return;
      }

      socket.emit("leave-session", user.id);
      setIsActiveUser(false);

      const sw = await navigator.serviceWorker.ready;
      const subscription = await sw.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
      }
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
