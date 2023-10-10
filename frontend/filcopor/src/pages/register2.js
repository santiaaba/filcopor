import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from 'react';

function Register2(props) {
  const{user, setUser}=props
  return (
    <Grid
      container
      padding={2}
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid item xs={6} sx={{ backgroundColor: "white" }}>
        <Box
          component="form"
          sx={{
            width: 765,
            maxWidth: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            value={user.email}
            onChange={(event)=>{  
              let clone=Object.assign(
                {},user
              )
              clone.email=event.target.value
              setUser(clone)
            }}
            variant="outlined"
            margin="normal"
            fullWidth //ancho completo
          />
          <TextField
            id="outlined-basic"
            label="Contraseña"
            value={user.password}
            onChange={(event)=>{  
              let clone=Object.assign(
                {},user
              )
              clone.password=event.target.value
              setUser(clone)
            }}
            variant="outlined"
            margin="normal"
            fullWidth //ancho completo
          />
          <TextField
            id="outlined-basic"
            label="Repetir Contraseña"
            value={user.password2}
            onChange={(event)=>{  
              let clone=Object.assign(
                {},user
              )
              clone.password2=event.target.value
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

export default Register2;
