import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Register1 from "./register1";
import Register2 from "./register2";
import Register3 from "./register3";
import swal from 'sweetalert';
import axios from 'axios';

//const REGISTER_API_URL = 'http://localhost:2525/auth/register';
const REGISTER_API_URL = "http://api.filcopor.com.ar:8080/auth/register";

const steps = ["Datos Principales", "Datos de contacto", "Aceptar términos"];

export default function HorizontalLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [enabled, setEnabled] = React.useState(true);
  const [user, setUser] = React.useState({
    nomape: null,
    id_ciudad: null,
    telefono: null,
    email: null,
    password: null,
    password2: null,
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleSubmit = () => {

    let data = Object.assign({}, user)
    delete data.provincia
    delete data.password2
    axios.post(REGISTER_API_URL, data)
      .then
      (
        ok => {
          swal(
            {
              position: "center",
              icon: "success",
              title: "Acceso Permitido",
              text: "Bienvenido Usuario Registrado ",
              timer: 3500,
            }); setTimeout(() => { window.location.href = "principal"; }, 3500);
        })
      .catch(e => {
        console.log();
        swal(
          {
            position: "center",
            icon: "error",
            title: "Registracion fallida",
            text: "Error en la registracion",
            timer: 3500,
          });
      }
      )
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography> // ver si hay que sacar o no??
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && <Register1 user={user} setUser={setUser} />}
          {activeStep === 1 && <Register2 user={user} setUser={setUser} />}
          {activeStep === 2 && <Register3 user={user} setUser={setUser} enablebutton={setEnabled} />}

          {/*<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>*/}
          { }
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Anterior
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleSkip}
                sx={{ mr: 1 }}
              >
                Cancelar
              </Button>
            )}

            <Button
              variant="contained"
              disabled={activeStep === steps.length - 1 ? enabled : false}

              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext

              }
            >
              {activeStep === steps.length - 1 ? "Finalizado" : "Siguiente"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
