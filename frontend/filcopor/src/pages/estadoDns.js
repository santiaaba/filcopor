import React, { Component, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import "../css/estadoDns.css";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";

import logo from "../images/logo2.png";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const cookies = new Cookies();

const EstadoDns = () => {
  const [data, setData] = useState([]);
  const [fqdn, setFQDN] = useState("");
  const [domain, setDomain] = useState("");
  const [id, setId] = useState("");

  const [isPorn, setisPorn] = useState("");
  const [ponderation, setPonderation] = useState(0);
  const [token, setToken] = useState("");
  const [datos, setDatos] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [fechaDesdeBD, setFechaDesdeBD] = useState("");

  const [parteFechaE, setParteFecha] = useState("");
  const [condicionCumplida, setCondicionCumplida] = useState(false);

  useEffect(() => {
    componentDidMount();
    const axiosInstance = axios.create({
      baseURL: "http://localhost:2525", // Reemplaza con la URL de tu API
      // baseURL: "http://api.filcopor.com.ar:8080",

      headers: {
        Authorization: cookies.get("token"),
      },
    });
    // Realiza una solicitud con Axios
    axiosInstance
      .post(
        "/report/all",
        { Authorization: cookies.get("token") },
        axiosInstance
      )

      .then((response) => {
        setData(response.data);

        console.error("Entro:");
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, [token]);

  const cerrarSeson = () => {
    cookies.remove("token", { path: "/" });
    window.location.href = "./";
  };

  const Estado = () => {
    // Estado para almacenar si se cumple la condición

    // Tu condición aquí (cámbiala según tus necesidades)
    const esCondicionCumplida = false; // Cambia esto con tu lógica de condición

    // Actualiza el estado basado en la condición
    useEffect(() => {
      setCondicionCumplida(esCondicionCumplida);
    }, []);

    if (condicionCumplida) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>Server is offline</div>
          <div
            style={{
              marginLeft: "5px", // Ajusta el espacio entre los divs según sea necesario
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "red",
            }}
          ></div>{" "}
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>Server is online</div>
          <div
            style={{
              marginLeft: "5px", // Ajusta el espacio entre los divs según sea necesario
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
            }}
          ></div>{" "}
        </div>
      );
    }
  };

  const componentDidMount = () => {
    console.error("Entro en el cookies");

    if (!cookies.get("token")) {
      window.location.href = "./";
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="right"
          alignItems="stretch"
          sx={{ backgroundColor: "#2f5597" }}
        >
          <div className="boton" style={{ marginTop: 0 }}>
            <div style={{ marginTop: 5 }}>Acceso como administrador</div>
            <Button variant="outlined" onClick={() => cerrarSeson()}>
              Salir
            </Button>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch" /*className="grupo1"*/
          sx={{ backgroundColor: "#2f5597" }}
        >
          <div style={{ marginRight: "10px" }}>
            <Link
              to="/estadoDns"
              style={{ color: "white", textDecoration: "underline" }}
            >
              Sistema
            </Link>
          </div>

          <div style={{ color: "white", textDecoration: "none" }}>|</div>
          <div style={{ marginLeft: "10px" }}>
            <Link
              to="/GestionReport"
              style={{ color: "white", textDecoration: "none" }}
              className="info"
            >
              Sitios reportados
            </Link>
          </div>
        </Grid>

        <Grid container direction="row" xs={4} justifyContent="center">
          <div className="grupoA">
            <img src={logo} />
          </div>
        </Grid>
        <Grid direction="row" xs={4} justifyContent="center">
          <div className="grupo3">
            <label>
              {" "}
              <strong> Estado de los DNS </strong>
              <div>
                <div>Server Status for 181.30.34.70</div>
                <div> {Estado()}</div>
              </div>
              <br></br>
              <div>
                <div>Server Status for 181.30.34.75</div>
                <div> {Estado()}</div>
              </div>
            </label>
            <br />

            <br />
          </div>
        </Grid>

        <Grid direction="row" xs={4} justifyContent="center">
          <div className="grupo4">
            <label>
              <strong> Sitios reportados a revisar </strong>
            </label>
            <div>
              {" "}
              <div>{data.length}</div>
            </div>
            <br />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

// Función para enviar datos cuando se hace clic

export default EstadoDns;
