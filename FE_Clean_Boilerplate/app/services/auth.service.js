import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import authWrapper from 'redux-auth-wrapper/authWrapper';

import storageService from './storage.service';

const userIsNotAuthenticated = connectedRouterRedirect({
  // This sends the user either to the query param route if we have one, or to the
  // landing page if none is specified and the user is already logged in
  redirectPath: '/test',

  // This prevents us from adding the query parameter when we send the user away
  // from the login page
  allowRedirectBack: false,

  // Determine if the user is authenticated or not
  authenticatedSelector: (state) => {

    const isUserLoggedIn = state.toJS().global.currentUserTokenId;

    return !isUserLoggedIn;
  },
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated',
});

const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // Determine if the user is authenticated or not
  authenticatedSelector: (state) => {

    const isUserLoggedIn = state.toJS().global.currentUserTokenId;

    return isUserLoggedIn && isUserLoggedIn.data !== null;
  },
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated',
});

// Use to set the initial state in the store, checking if the user is authenticated
const getGlobalStateFromStorage = () => {
  const currentUserTokenId = storageService.get('session', 'token_id');
  const uiPermissions = storageService.get('session', 'ui_permissions');

  return {
    currentUserTokenId,
    uiPermissions,
  };
};

const userIsAuthenticatedFlag = () => {
  return storageService.exists('session', 'token_id');
};

// Requires `isAuthenticated` prop to be passed to the component manually
const visibleOnlyWhenLoggedIn = authWrapper({
  wrapperDisplayName: 'VisibleOnlyWhenLoggedIn',
});

const visibleOnlyAdmin = connectedAuthWrapper({
  authenticatedSelector: (state) => {
    return state.toJS().global.uiPermissions && state.toJS().global.uiPermissions[0] === 'admin';
  },
  wrapperDisplayName: 'AdminAccessibleSection',
});

export {
  userIsNotAuthenticated,
  userIsAuthenticated,
  getGlobalStateFromStorage,
  userIsAuthenticatedFlag,
  visibleOnlyWhenLoggedIn,
  visibleOnlyAdmin,
};
