import logo from './logo.svg';
import './App.css';
import Register from './register.js'
import Register1 from './register1.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HorizontalLinearStepper from './HorizontalLinearStepper'

function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Register />} />
       <Route path="/register1" element={<Register1 />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;