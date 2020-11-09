import './assets/css/styles.css';
import './assets/css/Login-Form-Clean.css';
import './assets/fonts/fontawesome5-overrides.min.css';

import axios from 'axios';
import Cookies from 'js-cookie';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import AOS from 'aos';

import authReducer from './store/reducers/auth';
import profilesReducer from './store/reducers/profiles';
import globalVarsReducer from './store/reducers/globalVars';
import alertsReducer from './store/reducers/alerts';
import roomsReducer from './store/reducers/rooms';
import { loadUser } from './store/actions/auth';

import Routes from './components/routing/Routes';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Loading from './components/layout/Loading';


//Setting token as a header for all requests
if (Cookies.get('token')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('token');
} else {
  delete axios.defaults.headers.common['Authorization'];
}

//Initialize redux store
const rootReducer = combineReducers({
  auth: authReducer,
  globalVars: globalVarsReducer,
  profiles: profilesReducer,
  alerts: alertsReducer,
  rooms: roomsReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

const App = () => {

  //Setting animation library
  useEffect(() => {
    AOS.init();
  }, []);

  //Tries to get the user if there's a token (auto-connect)
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/loading' component={Loading} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
