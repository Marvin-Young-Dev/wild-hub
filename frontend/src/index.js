import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Navbar from "./components/Navbar/navbar";
import Register from "./pages/register/register";
import Login from "./pages/login/Login";
import { AuthProvider } from "./components/AuthContex/AuthContex";

// Patchnotes
import WhPatchnotes from "./pages/wildhub/whpatchnotes/whpatchnotes";

// Admin STUFF !
import Donald from "./pages/admin/donald";

// Error Pages
import Error1 from "./pages/error/error1";
import Error2 from "./pages/error/error2";
import Error3 from "./pages/error/error3";
import Error4 from "./pages/error/error4";

// Ranked
import Ranked from "./pages/ranked/ranked";
import SupportRanked from "./pages/ranked/supportranked/supportranked";

// Aram
import Aram from "./pages/aram/aram";

// MiniGame
import MiniGameHome from "./pages/miniGame/miniGameHome";

// HelpUs
import HelpUs from "./pages/helpUs/helpUs";

// WildHub
import WildHub from "./pages/wildhub/wildhub";
import HallOfFame from "./pages/wildhub/halloffame/halloffame";

const RandomError = () => {
  const errors = [<Error1 />, <Error2 />, <Error3 />, <Error4 />];
  const randomIndex = Math.floor(Math.random() * errors.length);
  return errors[randomIndex];
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donald" element={<Donald />} />
          <Route path="/aram" element={<Aram />} />
          <Route path="/ranked" element={<Ranked />} />
          <Route path="/ranked/supportranked" element={<SupportRanked />} />
          <Route path="/minigame" element={<MiniGameHome />} />
          <Route path="/helpUs" element={<HelpUs />} />
          <Route path="/wildhub" element={<WildHub />} />
          <Route path="/wildhub/halloffame/halloffame" element={<HallOfFame />} />
          <Route path="/wildhub/whpatchnotes/whpatchnotes" element={<WhPatchnotes />} />
          <Route path="/*" element={<RandomError />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
