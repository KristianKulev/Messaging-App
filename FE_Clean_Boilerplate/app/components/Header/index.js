/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { visibleOnlyWhenLoggedIn } from 'services/auth.service';

import './styles.scss';

const LogoutBtn = visibleOnlyWhenLoggedIn(props => (
  <span onClick={() => { props.logout(); }} className="logout-btn">
    Logout
  </span>
));


class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props);
    return (
      <nav className="header-component">
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
