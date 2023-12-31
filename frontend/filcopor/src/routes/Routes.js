import React from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Principal from "../pages/Principal";
import Register from "../pages/register";
import GestionReport from "../pages/GestionReport.js";
import EstadoDns from "../pages/estadoDns.js";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gestionReport" element={<GestionReport />} />
        <Route path="/estadoDns" element={<EstadoDns />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
