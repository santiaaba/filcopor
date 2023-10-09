import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Register from "./register";
import { Button } from "@mui/material";

const provincias = [
  {
    value: 1,
    label: "Buenos Aires",
  },
  {
    value: 2,
    label: "Ciudad Autónoma de Buenos Aires",
  },
  {
    value: 3,
    label: "Catamarca",
  },
  {
    value: 4,
    label: "Chaco",
  },
  {
    value: 5,
    label: "Jujuy",
  },
];
const ciudadesaux = [
  {
    value: 1,
    stateid: 1,
    label: "Roque Perez",
  },
  {
    value: 2,
    stateid: 1,
    label: "Lobos",
  },
  {
    value: 3,
    stateid: 1,
    label: "Cañuelas",
  },
  {
    value: 4,
    stateid: 1,
    label: "La Plata",
  },
  {
    value: 5,
    stateid: 3,
    label: "Catamarca",
  },
];

function Register1(props) {
  const{user, setUser}=props
  const[ciudades, setCiudades]=React.useState([])
  console.log(user)

  return (
    <Grid
      container
      direction="row"
     
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid
        item
        xs={12}
        sx={{ backgroundColor: "white" }}
      >
        <Box
          component="form"
          //onSubmit={handleSubmit}
          sx={{
            width: 765,
            maxWidth: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="nombre y apellido"
            type="text"
            value={user.nomape}
            onChange={(event)=>{  
              let clone=Object.assign(
                {},user
              )
              clone.nomape=event.target.value
              setUser(clone)
            }}
            label="Nombre y Apellido"
            variant="outlined"
            margin="normal"
            error={false}
            fullWidth //ancho completo
          />
          <Grid container>
          <Grid item  xs={6}>
          <TextField
            id="outlined-select-currency"
            value={user.provincia}
            onChange={(event)=>{  
              setCiudades(ciudadesaux.filter(a=> a.stateid  == event.target.value))
              let clone=Object.assign(
                {},user
              )
              clone.provincia=event.target.value
              setUser(clone)
            }}
            select
            label="Provincia"
            helperText="Por favor selecione su provincia"
            margin="normal"
          >
            {provincias.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </Grid>  
          <Grid item  xs={6}>
          <TextField
            id="outlined-select-currency"
            select
            value={user.ciudad}
            onChange={(event)=>{  
              let clone=Object.assign(
                {},user
              )
              clone.ciudad=event.target.value
              setUser(clone)
            }}
            label="Ciudad"
            helperText="Por favor selecione su ciudad"
            margin="normal"
          >
            {ciudades.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </Grid>
          </Grid>
          <TextField
            id="outlined-basic"
            label="Telefono"
            value={user.telefono}
            onChange={(event)=>{  
              let clone=Object.assign(
                {},user
              )
              clone.telefono=event.target.value
              setUser(clone)
            }}
            variant="outlined"
            margin="normal"
            fullWidth //ancho completo
          />
        </Box>
       
      </Grid>
    </Grid>
  );
}

export default Register1;
