import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <CssBaseline />
      <SnackbarProvider anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      >
        <App />
      </SnackbarProvider>
    </React.StrictMode>
  </BrowserRouter>
  , document.getElementById('root')
);