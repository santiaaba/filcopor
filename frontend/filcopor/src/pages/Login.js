import React, { Component } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import logo from "../images/Filcopor_5.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const cookies = new Cookies();
//const LOGIN_API_URL = 'http://localhost:2525/auth/login';
const LOGIN_API_URL = "http://api.filcopor.com.ar:8080/auth/login";

class Login extends Component {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  iniciarSesion = () => {
    axios
      .post(LOGIN_API_URL, {
        email: this.state.form.email,
        password: this.state.form.password,
      })
      .then((response) => {
        console.log(response.data);
        cookies.set("token", response.data.token, { path: "/" });
        window.location.href = "/principal";
      })

      .catch((error) => {
        console.log(error);
        swal({
          position: "center",
          icon: "error",
          title: "Acceso no permitido",
          text: "El email o la contraseña ingresada son incorrectos.",
          confirmButtonText: "OK",
        });
      });
  };

  componentDidMount() {
    if (cookies.get("email")) {
      window.location.href = "./principal";
    }
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columns={12} className="containerPrincipal">
          <Grid
            item
            xs={6}
            container
            direction="row"
            justifyContent="center"
            backgroundColor="rgb(208, 250, 250)"
            alignItems="stretch"
          >
            <div className="form-group">
              <div>
                <br />
                <TextField
                  type="text"
                  id="outlined-basic "
                  label="Email"
                  className="form-control"
                  name="email"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  type="password"
                  id="outlined-basic "
                  className="form-control"
                  label="Contraseña"
                  name="password"
                  onChange={this.handleChange}
                />
                <br /> <br />
                <Button
                  variant="contained"
                  onClick={() => this.iniciarSesion()}
                >
                  Ingresar{" "}
                </Button>
                {/*<Grid
                  item
                  xs={200}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Button variant="text">Olvide mi contraseña</Button>
    </Grid>*/}
              </div>
              <br />
              <br />
              <div>
                <label> </label>
                <br />
                <br />
                <Button variant="outlined" href="./register">
                  Registrarse{" "}
                </Button>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            backgroundColor="#2f5597"
          >
            <div>
              <div className="form-group2">
                <img width={250} height={250} src={logo} />
                <br></br>
                <br></br>
                <h4>
                  {" "}
                  Para utilizar el servicio es necesario autenticarse
                </h4>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Login;
