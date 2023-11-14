import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Button } from "@mui/material";
import "../css/Register.css";

//const STATES_API_URL = 'http://localhost:2525/states/getStates';
//const CITIES_API_URL = 'http://localhost:2525/states/cities';

const STATES_API_URL = 'http://api.filcopor.com.ar:8080/states/getStates';
const CITIES_API_URL = 'http://api.filcopor.com.ar:8080/states/cities';


function Register1(props) {
  const { user, setUser } = props;
  const [ciudades, setCiudades] = React.useState([]);
  const [provincias, setProvincias] = React.useState([]);
  const [selectedProvince, setSelectedProvince] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  
  const [telefonoError, setTelefonoError] = React.useState('');



  // Trae las provincias desde la API
  React.useEffect(() => {
    fetch(STATES_API_URL)
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setProvincias(transformedData);
      })
      .catch((error) => console.error(error));
  }, []);

  // Busca las ciudades en base a la provincia seleccionada
  React.useEffect(() => {
    if (selectedProvince) {
      fetch(`${CITIES_API_URL}/${selectedProvince}`)
        .then((response) => response.json())
        .then((data) => {
          const transformedData = data.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setCiudades(transformedData);
        })
        .catch((error) => console.error(error));
    } else {

      setCiudades([]);
    }
  }, [selectedProvince]);

  const handleCitySelection = (selectedCityId) => {
    const clone = { ...user };
    clone.id_ciudad = selectedCityId;
    console.log(selectedCityId);
    setUser(clone);
  };

  function handleChange(event) {

    console.log(user.nomape)
    if (event.target.value.length >= 45) {

      setErrorMessage(
        "Supera los caracteres maximos"
      );

    } else {
      //setUser({nomape:event.target.value});
      setErrorMessage("");
      let clone = { ...user };
      clone.nomape = event.target.value;
      setUser(clone);
    }
  }
const handleTelefonoBlur = async (event) => {
    const newTelefono = event.target.value;
    setUser((prevUser) => ({ ...prevUser, email: newTelefono }));

    setTelefonoError('');

  

    if (newTelefono && !validateTelefono(newTelefono)) {
      setTelefonoError('Telefono inválido');
      return;
    }

  
  };

  // Valida el formato del telefono
  const validateTelefono = (telefono) => {
    const telefonoRegex = /^[0-9]/;
    return telefonoRegex.test(telefono);
  };

 

  return (
    <Grid
      container
      padding={2}
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid item xs={12} sx={{ backgroundColor: "white" }}>
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
            id="nombre y apellido"
            type="text"
            value={user.nomape}

            /* onChange={(event) => {
               let clone = { ...user };
               clone.nomape = event.target.value;
               setUser(clone);
 
             }}*/
            onChange={(event) => handleChange(event)}
            label="Nombre y Apellido"
            variant="outlined"
            margin="normal"
            error={false}
            fullWidth //ancho completo
          />
          <span className='error-text'>{errorMessage}
          </span>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
                value={user.provincia}
                onChange={(event) => {
                  setSelectedProvince(event.target.value);
                  let clone = { ...user };
                  clone.provincia = event.target.value;
                  setUser(clone);
                }}
                select
                label="Provincia"
                helperText="Por favor seleccione su provincia"
                margin="normal"
              >
                {provincias.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
                select
                value={user.ciudad}
                onChange={(event) => {
                  handleCitySelection(event.target.value);
                }}
                label="Ciudad"
                helperText="Por favor seleccione su ciudad"
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
            onChange={(event) => {
              let clone = { ...user };
              clone.telefono = event.target.value;
              setUser(clone);
            }}
           
            variant="outlined"
            margin="normal"
            fullWidth //ancho completo
            onBlur={handleTelefonoBlur}
            error={telefonoError !== ''}
            helperText={telefonoError}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register1;
