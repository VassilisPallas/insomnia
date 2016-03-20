import * as types from '../constants/actionTypes';
import requestsReducer from './requests'
import settingsReducer from './settings'

const initialState = {
  initialized: false,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GLOBAL_STATE_SAVED:
      return state;
    case types.GLOBAL_STATE_RESTORED:
      return Object.assign({}, state, action.state, {initialized: true});
    case types.GLOBAL_LOAD_START:
      return Object.assign({}, state, {loading: true});
    case types.GLOBAL_LOAD_STOP:
      return Object.assign({}, state, {loading: false});
    default:
      // Send everything else to the child reducers
      const requests = requestsReducer(state.requests, action);
      const settings = settingsReducer(state.settings, action);
      return Object.assign({}, state, {
        settings,
        requests
      });
  }
};
