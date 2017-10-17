import { call, put, takeLatest } from 'redux-saga/effects';
import { SET_LOGGED_USERDATA_TO_STORAGE, SEND_LOGIN_REQUEST } from './constants';
import { setLoggedUserdataToStorage, loginRequestFail, loginRequestSuccess } from './actions';
import { userLoggedIn } from 'containers/App/actions';
import request from 'utils/request';
import storageService from 'services/storage.service';
import apiEndpoint from 'configs/CoreConfig.constant';

export function* sendLoginRequest(action) {

  const requestURL = `${apiEndpoint}/login`;

  try {
    // login successful; fire action to setLoggedUserdataToStorage
    const loginData = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action.data),
      responseType: 'application/json',
      // contentType: 'application/json',
    });
    yield put(setLoggedUserdataToStorage(loginData));
    yield put(loginRequestSuccess());

  } catch (err) {
    console.log(err);
    yield put(loginRequestFail(err.response.body));
  }
}

export function* setDataToStorage(action) {
  const loginData = action.data;

  // set token_id && ui_permissions to storage for future refference
  storageService.set('session', 'token_id', loginData.authToken);
  storageService.set('session', 'ui_permissions', loginData.uiPermissions);

  // Fire action to update the store
  yield put(userLoggedIn({
    token: {
      key: 'token_id',
      data: loginData.authToken,
    },
    uiPermissions: {
      key: 'ui_permissions',
      data: loginData.uiPermissions,
    },
  }));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchAndManageLogins() {
  /**
   * Wathes for SEND_LOGIN_REQUEST && fires
   * SET_LOGGED_USERDATA_TO_STORAGE action,
   * if successful and calls setDataToStorage.
   */
  yield takeLatest(SEND_LOGIN_REQUEST, sendLoginRequest);

  yield takeLatest(SET_LOGGED_USERDATA_TO_STORAGE, setDataToStorage);
}
