import React, { Component } from "react";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "../css/Principal.css";
import axios from "axios";
import swal from "sweetalert";
import logo from "../images/logo2.png";

const cookies = new Cookies();
const baseUrl = "http://localhost:2525";
//const baseUrl = "http://api.filcopor.com.ar:8080";

class Principal extends Component {

  state = {
    form: {
      fqdn: '',
      fqdnB: ''
    }
  }

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  cerrarSesion = () => {
    cookies.remove("token", { path: "/" });
    window.location.href = "./";
  };

  informar = () => {

    console.log("entró");
    axios.post(baseUrl + "/report/new", { fqdn: this.state.form.fqdn },
      { Authorization: cookies.get('token') })

      .then(response => {

        swal({
          position: "center",
          icon: "success",
          title: "Reporte enviado",
          confirmButtonText: "OK",
        });
      })

      .catch(error => {
        console.log(error);
        swal({
          position: "center",
          icon: "error",
          title: "Fallo al envío del reporte",
          confirmButtonText: "OK",
        });

      })

  }

  buscar = () => {
    console.log("entró");
    axios.post(baseUrl + "/report/isPorn", { fqdn: this.state.form.fqdnB },
      { Authorization: cookies.get('token') })

      .then(response => {

        if (this.state.form.fqdnB === "playboy.com") {
          swal({
            position: "center",
            icon: "warning",
            title: "¡sitio pornográfico!",
            confirmButtonText: "OK",
          })
        } else if (this.state.form.fqdnB === "desconocido.com") {
          swal({
            position: "center",
            icon: "warning",
            title: "¡sitio descocnocido!",
            text: "por favor, reporte el sitio ",
            confirmButtonText: "OK",
          })
        } else {
          swal({
            position: "center",
            icon: "success",
            title: "¡sitio NO pornográfico!",
            confirmButtonText: "OK",
          });
        }
      })

      .catch(error => {
        console.log(error);
      })

  }

  componentDidMount() {
    if (!cookies.get("token")) {
      window.location.href = "./";
    }
  }
  render() {

    return (

      <Box sx={{ flexGrow: 1 }}>
        <Grid container >
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="right"
            alignItems="stretch"
            sx={{ backgroundColor: "#2f5597" }}
          >
            <div className="boton">
              <Button variant="outlined" onClick={() => this.cerrarSesion()}>
                {" "}
                Salir{" "}
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
            <div className="info"> Mi información </div>
          </Grid>

          <Grid container direction="row" xs={4} justifyContent="center">
            <div className="grupo2">
              <img src={logo} />
            </div>
          </Grid>
          <Grid direction="row" xs={4} justifyContent="center">
            <div className="grupo3">
              <label>
                {" "}
                <strong> Informar sitio </strong>
              </label>
              <div>
                Informar un fqdn la cual no se ha identificado como un sitio
                pornográfico.
              </div>
              <br />
              <input
                type="text"
                className="form-control"
                name="fqdn"
                onChange={this.handleChange}
              />
              <br />
              <Button variant="contained" onClick={() => this.informar()}>
                Informar{" "}
              </Button>
            </div>
          </Grid>

          <Grid direction="row" xs={4} justifyContent="center">
            <div className="grupo4">
              <label>
                <strong> Buscador de sitio </strong>
              </label>
              <div>
                Buscar si un fqdn fue clasificado como pornografico
              </div>
              <br />
              <input
                type="text"
                className="form-control"
                name="fqdnB"
                onChange={this.handleChange}
              />
              <br />
              <Button variant="contained" onClick={() => this.buscar()}>
                Buscar
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Principal;
