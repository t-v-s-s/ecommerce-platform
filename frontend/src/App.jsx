import React from "react";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import AuthRedirect from "./components/AuthRedirect";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthRedirect> <Login /> </AuthRedirect>} />
        <Route path="/register" element={<AuthRedirect> <Register /> </AuthRedirect>} />
      </Routes>
    </>
  );
}

export default App;