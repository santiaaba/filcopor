import React, { Component, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import "../css/GestionReport.css";
import axios from "axios";
import swal from "sweetalert";
import logo from "../images/logo2.png";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const cookies = new Cookies();
//const baseUrl = "http://api.filcopor.com.ar:8080/fqdn/new";

const baseUrl = "http://localhost:2525/fqdn/new";

const GestionReport = () => {
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

  const enviarDatos = (sitio, identificador, fechayhora) => {
    const urlVariable = "https://www.${sitio}.com";
    setFQDN(sitio);
    setDomain(sitio);
    setId(identificador);
    setFechaDesdeBD(fechayhora);
    if (fechaDesdeBD) {
      const fecha = new Date(fechaDesdeBD);
      const parteFecha = fecha.toISOString().split("T")[0];
      console.log("Parte de la fecha:", parteFecha);
    }

    setDatos(
      <div>
        <div>
          Sitio a revisar:{" "}
          <p>
            <a
              href={`https://www.${sitio}.com`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {sitio}
            </a>
          </p>
        </div>
      </div>
    );
  };

  const limpio = () => {
    setDatos(<div></div>);
  };

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

  const crearFQDN = (nombre, esPorn, ponderacion, dominio, identificador) => {
    //const nombreCom = `${nombre}.com`;
    componentDidMount();
    const axiosInstance = axios.create({
      baseURL: "http://localhost:2525", // Reemplaza con la URL de tu API
      //baseURL: "http://api.filcopor.com.ar:8080",

      headers: {
        Authorization: cookies.get("token"),
      },
    });

    axiosInstance
      .post(
        baseUrl,
        {
          name: nombre,
          isPorn: esPorn,
          ponderation: ponderacion,
          domain: dominio,
        },
        { Authorization: cookies.get("token") }
      )

      .then((response) => {
        swal({
          position: "center",
          icon: "success",
          title: "Operación exitosa " + identificador,
          confirmButtonText: "OK",
        });
      })

      .catch((error) => {
        console.log(error);
        swal({
          position: "center",
          icon: "error",
          title: "Fallo al envío del reporte",
          timer: 10000,
          confirmButtonText: "OK",
        });
      });
  };

  /**   const obtenerParteFecha = (fechad) => {
    setFechaDesdeBD(fechad);

    if (fechad) {
      const fecha = new Date(fechad);
      setParteFecha(fecha.toISOString().split("T")[0]);
      console.log("Parte de la fecha:", parteFechaE);
    }
  };
*/
  const handleChangeselect = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChangeponde = (event) => {
    setPonderation(parseInt(event.target.value));
  };
  const handleChangeisporn = (event) => {
    setisPorn(event.target.value);
  };

  const cerrarSeson = () => {
    cookies.remove("token", { path: "/" });
    window.location.href = "./";
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
          <div className="info"> Sitios reportados </div>
        </Grid>

        <Grid container direction="row" xs={4} justifyContent="center">
          <div className="grupoA">
            <img src={logo} />
          </div>
        </Grid>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            background: "",
            marginTop: "194px",
            width: "100%",
          }}
        >
          <Grid
            className="posicion"
            direction="row"
            xs={11}
            container
            spacing={2}
          >
            <div className="grupoB">
              <List className="centrar">
                <ListItem>
                  <ListItemText>
                    <strong> Sitio </strong>{" "}
                  </ListItemText>
                  <ListItemText>
                    <strong> Fecha </strong>{" "}
                  </ListItemText>
                  <ListItemText>
                    <strong> Usuario </strong>{" "}
                  </ListItemText>
                </ListItem>

                {data.map((item) => (
                  <ListItem onClick={() => enviarDatos(item.fqdn, item.id)}>
                    <ListItemText key={item.id}> {item.fqdn} </ListItemText>
                    <ListItemText key={item.id}>{item.fechayhora}</ListItemText>
                    <ListItemText key={item.id}> {item.email} </ListItemText>
                  </ListItem>
                ))}
              </List>
            </div>
            <div className="grupoC">
              <Grid>
                <div style={{ height: 100 }}>
                  <strong> vista previa</strong>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",

                      marginTop: "15px",
                    }}
                  >
                    {datos}
                  </div>
                </div>

                <br></br>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => crearFQDN(fqdn, "yes", 10000, domain, id)}
                    >
                      Porno
                    </Button>{" "}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => crearFQDN(fqdn, "no", 0, domain, id)}
                    >
                      Limpio
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        crearFQDN(fqdn, "no se sabe", 20, domain, id)
                      }
                    >
                      {" "}
                      Descartar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </div>
      </Grid>
    </Box>
  );
};

// Función para enviar datos cuando se hace clic

export default GestionReport;
