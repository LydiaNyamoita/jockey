// import { useState } from 'react'
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./pages/HomePage";
import JockeyPage from "./pages/Jockey";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import MockLogin from "./components/Mockup";
import "bootstrap/dist/css/bootstrap.css";
import { useContext } from "react";
import { AuthContext } from "./commons/AuthContext";
import RouteGuard from "./commons/RouteGuard";
function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  let nav;
  let back_btn;
  if (isLoggedIn) {
    nav = <Navbar />;
  }
  const handleBack = () => {
    navigate(-1);
  };
  if (location.pathname !== "/login" && location.pathname !== "/") {
    back_btn = (
      <button
        className="bg-red-300 hover:bg-red-400 text-blac-800 font-bold py-2 px-2 rounded inline-flex items-center"
        onClick={handleBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
        <div className="pl-4"></div>
        <span>Back</span>
      </button>
    );
  }
  return (
    <div className=" max-w-[1600px]  mx-auto rounded-sm ">
      {nav}
      {back_btn}
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
      </Routes>
    </div>
  );
}

export default App;
