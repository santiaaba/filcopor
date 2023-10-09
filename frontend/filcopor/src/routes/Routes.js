import React from 'react';
import {BrowserRouter, Switch, Route, Routes} from 'react-router-dom';
import Login from '../pages/Login';
import Principal from '../pages/Principal';
import Register from '../pages/register';

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Login/>}/>
        <Route  path="/principal" element={<Principal/>}/>
        <Route  path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}   



export default Rutas;