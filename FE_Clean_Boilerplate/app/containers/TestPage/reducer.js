/*
 *
 * TestPage reducer
 *
 */

import { fromJS } from 'immutable';
import { INCREMENT_COUNTER, SET_INC_AMOUNT } from './constants';

const initialState = fromJS({ count: 0, incAmount: 1 });

function testPageReducer(state = initialState, action) {
  switch (action.type) {

    case INCREMENT_COUNTER:
      let currentState = state.toJS();
      let incAmount = +currentState.incAmount;
      let currentCount = +currentState.count;

      return state = state.set('count', fromJS(currentCount + incAmount));

    case SET_INC_AMOUNT:
      return state = state.set('incAmount', fromJS(action.payload));

    default:
      return state;
  }
}

export default testPageReducer;
