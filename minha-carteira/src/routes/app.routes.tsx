import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import EditRegistry from "../pages/EditRegistry";
import List from "../pages/List";

const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/list/:type" element={<List />} />
      <Route path="/edit/:id" element={<EditRegistry />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
