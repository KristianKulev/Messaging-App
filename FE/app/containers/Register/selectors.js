import { createSelector } from 'reselect';

/**
 * Direct selector to the register state domain
 */
const selectRegisterDomain = state => state.get('register');

/**
 * Other specific selectors
 */

const makeSelectRegisterError = () => createSelector(
  selectRegisterDomain,
  substate => substate.toJS().registerError
);

/**
 * Default selector used by Register
 */

const makeSelectRegister = () => createSelector(
  selectRegisterDomain,
  substate => substate.toJS()
);

export {
  selectRegisterDomain,
  makeSelectRegister,
  makeSelectRegisterError,
};
