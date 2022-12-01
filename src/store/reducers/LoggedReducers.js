import {
  LOGGED_REQUEST_INIT,
  LOGGED_REQUEST_SUCCESS,
  LOGGED_REQUEST_ERROR,
} from '../actions/loggedActions';

const initialize = {
  init: false,
  success: false,
  error: false,
  logged: {},
};
const LoggedReducers = (state = initialize, action) => {
  switch (action.type) {
    case LOGGED_REQUEST_INIT:
      return {
        ...state,
        ...action.payload,
      };
    case LOGGED_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case LOGGED_REQUEST_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default LoggedReducers;
