import React from "react";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import AuthRedirect from "./components/AuthRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthRedirect> <Login /> </AuthRedirect>} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<AuthRedirect> <Register /> </AuthRedirect>} />
      </Routes>
    </>
  );
}

export default App;