import './assets/css/styles.css';
import './assets/css/Login-Form-Clean.css';
import './assets/fonts/fontawesome5-overrides.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import AOS from 'aos';

import Routes from './components/routing/Routes';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Loading from './components/layout/Loading';


const App = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/loading' component={Loading} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

export default App;
