import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../modules/auth/pages/Login.tsx";
import SignUp from "../modules/auth/pages/Signup.tsx";
import Dashboard from "../modules/dashboard/pages/Dashboard.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
