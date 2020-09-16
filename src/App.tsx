import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'leaflet/dist/leaflet.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

function App() {
  toast.configure();

  return (
    <>
      <GlobalStyle />
      <Router>
        <AppProvider>
          <Header />
          <Routes />
        </AppProvider>
      </Router>
    </>
  );
}

export default App;
