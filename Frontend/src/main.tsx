import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'
import {Toaster} from "react-hot-toast"

import { createTheme, ThemeProvider } from "@mui/material";
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/AuthContext.tsx';


const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "white" },
  },
});



axios.defaults.baseURL="http://localhost:5000/gpt/v1"
axios.defaults.withCredentials=true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Toaster position="top-center"/>
    <App />
    </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
