import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SEND_REGISTER_REQUEST } from './constants';
import { registerRequestFail, registerRequestSuccess } from './actions';
import request from 'utils/request';
import apiEndpoint from 'configs/CoreConfig.constant';
import { toastr } from 'react-redux-toastr/lib';

export function* sendRegisterRequest(action) {

  const requestURL = `${apiEndpoint}/register`;

  try {
    // register successful;
    yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action.data),
      responseType: 'application/json',
    });

    yield put(registerRequestSuccess());
    toastr.success('Your registration is successful!', 'You can login with your credentials now.');
    yield put(push('/login'));


  } catch (err) {
    console.log(err);
    yield put(registerRequestFail(err.response.body));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchAndManageRegisters() {
  /**
   * Wathes for SEND_REGISTER_REQUEST
   */
  yield takeLatest(SEND_REGISTER_REQUEST, sendRegisterRequest);
}
