// import { useState } from 'react'
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
// import MockLogin from "./components/Mockup";

function App() {
  
  return (
    <div className="bg-[#F6FCFC] max-w-[1600px]  mx-auto rounded-sm ">
      <Navbar />
      {/* <MockLogin/> */}

      <Routes>
        
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
