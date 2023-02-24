import React from "react";
import { Route, Routes } from "react-router-dom";
import SingIn from "../pages/Signin";

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<SingIn />}></Route>
  </Routes>
);

export default AuthRoutes;
