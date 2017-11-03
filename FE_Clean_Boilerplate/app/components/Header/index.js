/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { visibleOnlyWhenLoggedIn, getUsername } from 'services/auth.service';

import './styles.scss';

const LogoutBtn = visibleOnlyWhenLoggedIn(props => (
  <span onClick={() => { props.logout(); }} className="logout-btn">
    Logout
  </span>
));

const LoggedInAs = visibleOnlyWhenLoggedIn(props => (
  <span className="logged-in-as">Logged: { props.loggedAs }</span>
));


class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <nav className="header-component row">
        <Link to="/dashboard">
          Dashboard
        </Link>
        <Link to="/test">
          Test Page
        </Link>
        <Link to="/login">
          Login
        </Link>
        <Link to="/register">
          Register
        </Link>


        <LoggedInAs loggedAs={getUsername()} isAuthenticated={this.props.userIsAuthenticated}/>
        <LogoutBtn logout={this.props.logout} isAuthenticated={this.props.userIsAuthenticated} />
      </nav>
    );
  }
}

Header.propTypes = {
  logout: React.PropTypes.func.isRequired,
  userIsAuthenticated: React.PropTypes.bool.isRequired,
};

export default Header;
