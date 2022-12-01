import {
    USER_AUTH_INIT,
    USER_AUTH_SUCCESS,
    USER_AUTH_ERROR,
  } from '../actions/userActions';
  
  const initializeState = {
    init: false,
    success: false,
    error: false,
    user: {},
  };
  
  const UserReducers = (state = initializeState, action) => {
    switch (action.type) {
      case USER_AUTH_INIT:
        return {
          ...state,
          ...action.payload,
        };
      case USER_AUTH_SUCCESS:
        return {
          ...state,
          ...action.payload,
        };
      case USER_AUTH_ERROR:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default UserReducers;
  