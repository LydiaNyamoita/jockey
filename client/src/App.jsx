import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./pages/HomePage";
import JockeyPage from "./pages/Jockey";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import RouteGuard from "./commons/RouteGuard";
import Profile from "./pages/Profile";
import BetPage from "./pages/Bet";
function App() {
  return (
    <div className=" max-w-[1600px]  mx-auto rounded-sm ">
      <Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <RouteGuard>
                <HomePage />
              </RouteGuard>
            }
          />
          <Route path="/login" element={<Login />} />

          <Route
            path="/jockey/:id"
            element={
              <RouteGuard>
                <JockeyPage />
              </RouteGuard>
            }
          />
          <Route
            path="/jockey/:id/bet"
            element={
              <RouteGuard>
                <BetPage />
              </RouteGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <RouteGuard>
                <Profile />
              </RouteGuard>
            }
          />
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
