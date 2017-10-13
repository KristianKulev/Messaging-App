import { takeLatest } from 'redux-saga/effects';
import { USER_LOGGED_OUT } from 'containers/App/constants';
import storageService from 'services/storage.service';

export function* setDataToStorage(action) {
  const loginData = action.data;

  storageService.set(loginData.storageType, loginData.key, loginData.payload);
}

export function* remDataFromStorage(action) {
  const loginData = action.data;

  storageService.rem(loginData.storageType, loginData.payload.tokenKey);
  storageService.rem(loginData.storageType, loginData.payload.uiPermissionsKey);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchAndSetDataToStorage() {
  /**
   * Watches for SET_LOGGED_USERDATA_TO_STORAGE actions,
   *  and calls setDataToStorage when one comes in.
   */
  yield takeLatest(USER_LOGGED_OUT, remDataFromStorage);
}
