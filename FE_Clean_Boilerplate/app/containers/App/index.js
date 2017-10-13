/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/index';
import TestPage from 'containers/TestPage/index';
import Login from 'containers/Login/index';
import MainNav from 'containers/MainNav';

import FormValidationRules from 'configs/FormValidation.config'; // eslint-disable-line

import { userIsAuthenticated, userIsNotAuthenticated, userIsAuthenticatedFlag } from 'services/auth.service';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    window.app = this;
  }

  render() {

    return (
      <section>
        <MainNav userIsAuthenticatedFlag={userIsAuthenticatedFlag()}/>
        <Switch>
          <Route path="/test" component={userIsAuthenticated(TestPage)} />
          <Route path="/login" component={userIsNotAuthenticated(Login)} />


          {/* Used for NotFoundPage, place actual routes above */}
          <Route path="" component={NotFoundPage} />
        </Switch>
      </section>
    );
  }
}

