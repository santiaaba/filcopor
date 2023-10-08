import React, {Component} from "react";
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import '../css/Principal.css';
import axios from 'axios';
import swal from 'sweetalert';


const cookies = new Cookies();
 
const baseUrl="http://api.filcopor.com.ar:8080";

class Principal extends Component {
    

    
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    cerrarSesion=()=>{
        cookies.remove('token',{path:"/"});
        window.location.href="./";

    }

    informar=()=>{
      console.log("entró");
      axios.post(baseUrl+"/report/new", {username: "sdiaz", fqdn:"google.com.ar", comentario:"hola", valoracion:"6" },
      {Authorization:cookies.get('token')})
      .then(response=>{
        alert('reporte enviado')
      })
        
      .catch(error=>{
          console.log(error);
          swal({             
            position: "center",
            icon: "error",
            title: "fallo al envío del reporte",
            confirmButtonText: "OK",
        }); 
    
       })

    }

    componentDidMount() {
        if(!cookies.get('token')){
            window.location.href="./";
        }
    }
     render() {


        return (
<Box sx={{flexGrow: 1}}>
      <Grid container spacing={1}
      
      >
<Grid item xs={12} 
        container
        direction="row"
        justifyContent="right"
        alignItems="stretch"/*className="grupo1"*/
        sx={{ backgroundColor: "rgb(18, 116, 207)" }}>   
            <div className="boton">
            
            <Button variant="outlined" onClick={()=>this.cerrarSesion()}> Salir </Button>
        </div>
        </Grid>

        <Grid item xs={12} 
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"/*className="grupo1"*/
        sx={{ backgroundColor: "rgb(18, 116, 207)" }}>   
            
          <div className="info">Mi información</div>
        </Grid>
        
        <Grid  container
        direction="row" 
        xs={4}
        justifyContent="center"       
        >
          <div className="grupo2">Filcopor</div>
        </Grid>
        <Grid  direction="row" 
        xs={4}
        justifyContent="center"
        
        
         >
          <div className="grupo3">
            <label> <strong> Informar sitio </strong></label>
            <div>Informar un fqdn la cual no se ha identificado como un sitio pornográfico.</div>
            <br/>
            <input
              type="text"
              className="form-control"
              name="informar"
              onChange={this.handleChange}
            />
            <br />
            <Button variant="contained"  onClick={()=> this.informar()}>Informar </Button>
         
          </div>
        </Grid>

        <Grid 
        direction="row" 
        xs={4}
        justifyContent="center"
         >
        <div className="grupo4" >
            <label><strong> Buscador de sitio </strong></label>
            <div>Buscar un fqdn la cual se determinará si es o no un sitio pornográfico</div>
            <br/>
            <input
              type="text"
              className="form-control"
              name="fqdn"
              onChange={this.handleChange}
            />
            <br/>
            <Button variant="contained"  onClick={()=> this.buscar()}>Buscar</Button>
         
          </div>        
          </Grid>
      </Grid>

    </Box>        

        );
     }
}

export default Principal;