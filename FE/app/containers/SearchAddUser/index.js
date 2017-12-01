/**
 *
 * SearchAddUser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearchAddUser from './selectors';
import { makeSelectUserFound } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  searchForUser,
  startNewConversationWithUser,
  cleanUserFoundData,
} from './actions';

import UserSearchBox from 'components/UserSearchBox';
import UserAddBox from 'components/UserAddBox';

export class SearchAddUser extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    window.ss = this;
  }

  findUserByName(data) {
    this.usernameToFind = data.usernameToFind;

    // Dispatch search to BE
    this.props.searchForUser(this.usernameToFind);
  }

  startNewConversation(shouldStart) {

    if (shouldStart) {

      if (!this.props.userFound) return;

      this.props.startNewConversationWithUser(this.props.userFound.username);

    } else {
      // user rejected newConversationStart
      this.props.cleanUserFoundData();
    }
  }

  render() {

    const content = !this.props.userFound ?
      (<UserSearchBox
        onSubmitCallback={data => this.findUserByName(data)}/>) :
      (<UserAddBox
        userFound={this.props.userFound}
        startNewConversation={shouldStart => this.startNewConversation(shouldStart)}/>);
    return (
      <section className="search-add-user col-xs-12">
        { content }
      </section>
    );
  }
}

SearchAddUser.propTypes = {
  searchForUser: PropTypes.func.isRequired,
  startNewConversationWithUser: PropTypes.func.isRequired,
  cleanUserFoundData: PropTypes.func.isRequired,
  userFound: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  searchAddUser: makeSelectSearchAddUser(),
  userFound: makeSelectUserFound(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchForUser: username => dispatch(searchForUser(username)),
    startNewConversationWithUser: username => dispatch(startNewConversationWithUser(username)),
    cleanUserFoundData: () => dispatch(cleanUserFoundData()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchAddUser', reducer });
const withSaga = injectSaga({ key: 'searchAddUser', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchAddUser);
