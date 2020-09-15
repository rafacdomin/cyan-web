import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'leaflet/dist/leaflet.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';
import GlobalStyle from './styles/global';
import Routes from './routes';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppProvider>
          <Routes />
        </AppProvider>
      </Router>
    </>
  );
}

export default App;
