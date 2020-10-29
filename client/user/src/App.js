import './assets/css/styles.css';
import './assets/css/Footer-Basic.css';
import './assets/css/Login-Form-Clean.css';
import './assets/fonts/fontawesome5-overrides.min.css';

import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import AOS from 'aos';

const App = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Fragment>
      <Landing />
      <Footer />
    </Fragment>
  );
}

export default App;
