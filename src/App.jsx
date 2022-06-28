import { useState, useMemo, createContext, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import expressApi from "./util/api";
import "./app.scss";

import Header from "./components/header/Header";
import HomePage from "./pages/home-page/HomePage";
import SignupPage from "./pages/signup-page/SignupPage";
import LoginPage from "./pages/login-page/LoginPage";
import AboutPage from "./pages/about-page/AboutPage";
import GamesAppPage from "./pages/games-app-page/GamesAppPage";
import PickView from "./views/pick-view/PickView";
import QueueView from "./views/queue-view/QueueView";
import ResultsView from "./views/results-view/ResultsView";
import ProfilePage from "./pages/profile-page/ProfilePage";
import Footer from "./components/footer/Footer";

export const UserContext = createContext({ user: null, setUser: () => {} });

const App = () => {
  // Creates state for the user  and creates a function that returns the state and state
  // setter that is passed to the context provider for use throughout the application.
  const [user, setUser] = useState(null);

  const changeUser = useCallback(async () => {
    try {
      const { data } = await expressApi.getUser();
      setUser(data.data.user);
      //
    } catch (err) {
      setUser(null);
    }
  }, []);

  const userValue = useMemo(() => ({ user, changeUser }), [user, changeUser]);

  useEffect(() => {
    changeUser();
  }, [changeUser]);

  // If the app loads with a token in the URL query, this is added to localStorage, as
  // the app will have been redirected from an OAuth login.
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");
  if (token) {
    localStorage.setItem("authToken", JSON.stringify(token));
  }

  return (
    <UserContext.Provider value={userValue}>
      <div className="app">
        <Toaster />
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="games" element={<GamesAppPage />}>
              <Route path="pick" element={<PickView />} />
              <Route path="queue" element={<QueueView />} />
              <Route path="complete/:id" element={<ResultsView />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default App;
