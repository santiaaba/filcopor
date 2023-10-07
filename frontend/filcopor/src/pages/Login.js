import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import logo from '../images/Filcopor_5.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

<link  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
/>
     
const baseUrl="http://localhost:3003/usuarios";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('apellido', respuesta.apellido, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                swal(
                {   position: "center",
                    icon: "success",
                    title: "Acceso Permitido",
                    text: "Bienvenido "+ respuesta.nombre+ " " + respuesta.apellido,
                    timer: 3500,
                });
                  setTimeout(() => {window.location.href = "/principal";}, 3500);
                }else{
                 swal({             
                position: "center",
                icon: "error",
                title: "No se permite el acceso",
                text: "El nombre de usuario o la contraseña ingresada son incorrectos.",
                confirmButtonText: "OK",
            });
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="./principal";
        }
    }



    render() {
        return (
    <Box sx={{flexGrow: 1}}>
        <Grid container  columns={12}  className="containerPrincipal">

        <Grid item xs={6} container
      direction="row"
      justifyContent="center"
      backgroundColor= "rgb(208, 250, 250)" 
      alignItems="stretch" >
        <div className="form-group">
          <div>
            <br/>
            <TextField
              type="text"
              id="outlined-basic "        
              label="Usuario"

              className="form-control"
              name="username"
              onChange={this.handleChange}
            />
            <br/>   
            <br/>
            <TextField
              type="password"
              id="outlined-basic "        
              className="form-control"
              label="Contraseña"
              name="password"
              onChange={this.handleChange}
            />
            
            <br/> <br/>

            <Button variant="contained"  onClick={()=> this.iniciarSesion()}>Ingresar </Button>
          </div>
          <br/><br/>
          <div>
            <label>No tengo cuenta y deseo registrarme </label>
            <br/><br/>
            <Button variant="outlined" href='./register' >Registrarse </Button>

          </div>
     
        </div>
        </Grid>
        <Grid item xs={6}       direction="row"
      justifyContent="center"
      alignItems="stretch" 
    backgroundColor=" rgb(18, 116, 207)"
     >
        <div>
          <div className="form-group2">
            <img   width= {160} src= {logo} />

            <br></br><br></br>
            <h4> Para utilizar el servicio de filtración es necesario autenticarse</h4>
        </div>
        </div>
        </Grid>

        </Grid>
    </Box>
        );
    }
}

export default Login;