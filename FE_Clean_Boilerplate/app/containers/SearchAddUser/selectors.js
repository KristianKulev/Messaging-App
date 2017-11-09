import { createSelector } from 'reselect';

/**
 * Direct selector to the searchAddUser state domain
 */
const selectSearchAddUserDomain = state => state.get('searchAddUser');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchAddUser
 */

const makeSelectSearchAddUser = () => createSelector(
  selectSearchAddUserDomain,
  substate => substate.toJS()
);

const makeSelectUserFound = () => createSelector(
  selectSearchAddUserDomain,
  substate => substate.toJS().userFound
);

export default makeSelectSearchAddUser;
export {
  selectSearchAddUserDomain,
  makeSelectUserFound,
};
