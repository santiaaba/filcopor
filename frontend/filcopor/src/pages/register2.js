import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from 'react';

// Para verificar si el mail ya esta registrado, el back anda bien pero el front devuelve cualquiera
//const CHECK_EMAIL_API_URL = 'http://localhost:2525/user/check-email/:email';
const CHECK_EMAIL_API_URL = 'http://api.filcopor.com.ar:8080/user/check-email/:email';


function Register2(props) {
  const { user, setUser } = props;
  const [emailExists, setEmailExists] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');


  
  const handleEmailBlur = async (event) => {
    const newEmail = event.target.value;
    setUser((prevUser) => ({ ...prevUser, email: newEmail }));

    setEmailError('');

    if (newEmail && emailExists) {
      setEmailError('El email ya está registrado');
      return;
    }

    if (newEmail && !validateEmail(newEmail)) {
      setEmailError('Email inválido');
      return;
    }

    await checkEmailAvailability(newEmail);
  };

  // Valida el formato del email
  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  // Verifica si el email ya está registrado
  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(CHECK_EMAIL_API_URL.replace(':email', email));
      if (response.ok) {
        const data = await response.json();
        setEmailExists(data.exists);
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // Valida contraseñas
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setUser((prevUser) => ({ ...prevUser, password: newPassword }));
    setPasswordError('');

    if (newPassword.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
    }
  };

  const handlePassword2Change = (event) => {
    const newPassword2 = event.target.value;
    setUser((prevUser) => ({ ...prevUser, password2: newPassword2 }));
    setPasswordError('');

    if (newPassword2 !== user.password) {
      setPasswordError('Las contraseñas no coinciden');
    }
  };

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
            onChange={(event) => {
              const clone = { ...user };
              clone.email = event.target.value;
              setUser(clone);
            }}
            onBlur={handleEmailBlur}
            variant="outlined"
            margin="normal"
            fullWidth
            error={emailError !== ''}
            helperText={emailError}
          />


          <TextField
            id="outlined-basic"
            label="Contraseña"
            value={user.password}
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            fullWidth //ancho completo
            type="password"
            error={passwordError !== ''}
            helperText={passwordError}
          />


          <TextField
            id="outlined-basic"
            label="Repetir Contraseña"
            value={user.password2}
            onChange={handlePassword2Change}
            variant="outlined"
            margin="normal"
            fullWidth //ancho completo
            type="password"
            error={passwordError !== ''}
            helperText={passwordError}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register2;
