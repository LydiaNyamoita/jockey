// import { useState } from 'react'
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./pages/HomePage";
import JockeyPage from "./pages/Jockey";
import { Route, Routes } from "react-router-dom";
// import MockLogin from "./components/Mockup";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  let nav;
  if (isLoggedIn) {
    nav = <Navbar />;
  }
  return (
    <div className=" max-w-[1600px]  mx-auto rounded-sm ">
      {nav}
      {/* <MockLogin/> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/jockey/:id" element={<JockeyPage />} />
      </Routes>
    </div>
  );
}

export default App;
