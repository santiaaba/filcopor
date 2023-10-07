import React, {Component} from "react";
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import '../css/Principal.css';

const cookies = new Cookies();
 

class Principal extends Component {
    state={
        form:{
            fqdn:''
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

    cerrarSesion=()=>{
        cookies.remove('id',{path:"/"});
        cookies.remove('apellido',{path:"/"});
        cookies.remove('nombre',{path:"/"});
        cookies.remove('username',{path:"/"});
        window.location.href="./";

    }


    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }
     render() {

        console.log('id:'+ cookies.get('id'));
        console.log('apellido:' +cookies.get('apellido'));
        console.log('nombre:' +cookies.get('nombre'));
        console.log('username:' +cookies.get('username'));

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
            <div>Informar un fqdn que la cual no se ha identificado como pornográfico.</div>
            <br/>
            <input
              type="text"
              className="form-control"
              name="informar"
              onChange={this.handleChange}
            />
            <br />
            <Button variant="contained"  onClick={()=> this.informar()}>Informar</Button>
         
          </div>
        </Grid>
        <Grid direction="row" 
        xs={4}
        justifyContent="center"
        
         >
        <div className="grupo4" xs={4}>
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