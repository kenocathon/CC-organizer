import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { CssBaseline } from '@material-ui/core';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './components/layout/menus/Navigation';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact component={Navigation} />
        </Switch>
      </Router>
      <CssBaseline />
    </Fragment>
  </Provider>
);

export default App;
