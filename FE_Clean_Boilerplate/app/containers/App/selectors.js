/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectCurrentUserTokenId = () => createSelector(
  selectGlobal,
  globalState => globalState.get('currentUserTokenId')
);

export {
  selectGlobal,
  makeSelectCurrentUserTokenId,
};
