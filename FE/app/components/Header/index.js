/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { visibleOnlyWhenLoggedIn, getUsername, visibleOnlyAdmin } from 'services/auth.service';

import './styles.scss';

const LogoutBtn = visibleOnlyWhenLoggedIn(props => (
  <span onClick={() => { props.logout(); }} className="logout-btn">
    Logout
  </span>
));

const LoggedInAs = visibleOnlyWhenLoggedIn(props => (
  <span className="logged-in-as">Logged: { props.loggedAs }</span>
));

const AdminLink = visibleOnlyAdmin(() => {
  return (
    <Link to="/admin-link">
      Admin link for admin stuff
    </Link>
  );
});

const AuthenticatedNav = visibleOnlyWhenLoggedIn(props => (

  <nav className="header-component row">
    <Link to="/dashboard">
      Dashboard
    </Link>

    <AdminLink/>
    <LoggedInAs loggedAs={getUsername()} isAuthenticated={props.isAuthenticated}/>
    <LogoutBtn logout={props.logout} isAuthenticated={props.isAuthenticated} />
  </nav>

));

const UnauthenticatedNav = visibleOnlyWhenLoggedIn(props => (

  <nav className="header-component row">
    <Link to="/login">
        Login
      </Link>
    <Link to="/register">
        Register
      </Link>
  </nav>

  ));


class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <section className="header-component row">
        <UnauthenticatedNav isAuthenticated={!this.props.userIsAuthenticated}/>
        <AuthenticatedNav
          loggedAs={getUsername()}
          logout={this.props.logout}
          isAuthenticated={this.props.userIsAuthenticated} />
      </section>
    );
  }
}

Header.propTypes = {
  logout: React.PropTypes.func.isRequired,
  userIsAuthenticated: React.PropTypes.bool.isRequired,
};

export default Header;
