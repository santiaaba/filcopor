import { Box } from "@mui/material";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import Grid from "@mui/material/Grid";
import logo from "./images/logo.png";
import "./App.css";
import * as React from "react";
import { Typography } from "@mui/material";


function Register(props) {
  return (
    <Grid
      container
      direction="row"
      height={window.innerHeight}
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid alignItems="stretch" item xs={4} sx={{ backgroundColor: "#2f5597" }}>
        <div className="App">
          <img src={logo} width={300} height={300} />
        </div>
       
      </Grid>
      <Grid item xs={8} sx={{ backgroundColor: "white", padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Registracion
      </Typography> 
        <Box>
          <HorizontalLinearStepper />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
