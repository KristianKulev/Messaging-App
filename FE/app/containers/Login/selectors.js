import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = state => state.get('login');

/**
 * Other specific selectors
 */

const makeSelectLoginError = () => createSelector(
  selectLoginDomain,
  substate => substate.toJS().loginError
);

/**
 * Default selector used by Login
 */

const makeSelectLogin = () => createSelector(
  selectLoginDomain,
  substate => substate.toJS()
);

export {
  selectLoginDomain,
  makeSelectLogin,
  makeSelectLoginError,
};
