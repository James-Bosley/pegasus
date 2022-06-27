import { useState, useMemo, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import ProfilePage from "./components/";
import Footer from "./components/footer/Footer";

const UserContext = createContext({ userToken: "", setUserToken: () => {} });

const App = () => {
  // Creates state for the user token and creates a function that returns the state and state
  // setter that is passed to the context provider for use throughout the application.
  const [userToken, setUserToken] = useState("");
  const userValue = useMemo(() => ({ userToken, setUserToken }), [userToken]);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setUserToken(JSON.parse(localStorage.getItem("authToken")));
    }
  }, []);

  return (
    <UserContext.Provider value={userValue}>
      <div className="app">
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
