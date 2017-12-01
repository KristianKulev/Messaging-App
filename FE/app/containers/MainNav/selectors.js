import { createSelector } from 'reselect';

/**
 * Direct selector to the mainNav state domain
 */
const selectMainNavDomain = (state) => state.get('mainNav');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MainNav
 */

const makeSelectMainNav = () => createSelector(
  selectMainNavDomain,
  (substate) => substate.toJS()
);

export default makeSelectMainNav;
export {
  selectMainNavDomain,
};
