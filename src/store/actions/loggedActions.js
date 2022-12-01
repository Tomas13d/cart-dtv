import { requestAxios, updateAxios } from './utils';
import objectPath from 'object-path';
export const LOGGED_REQUEST_INIT = 'LOGGED_REQUEST_INIT';
export const LOGGED_REQUEST_SUCCESS = 'LOGGED_REQUEST_SUCCESS';
export const LOGGED_REQUEST_ERROR = 'LOGGED_REQUEST_ERROR';

const userRequestInit = () => {
  return {
    type: LOGGED_REQUEST_INIT,
    payload: {
      init: true,
    },
  };
};

const userRequestSuccess = (data) => {
  return {
    type: LOGGED_REQUEST_SUCCESS,
    payload: {
      init: false,
      success: true,
      logged: data,
    },
  };
};

const userRequestError = (error) => {
  return {
    type: LOGGED_REQUEST_ERROR,
    payload: {
      init: false,
      success: false,
      error: error,
    },
  };
};

export const getUserLogged = () => {
  return function (dispatch) {
    dispatch(userRequestInit());
    updateAxios(() => {
      requestAxios
        .get('/ible/logged?token=' + localStorage.getItem('token'))
        .then((response) => {
          const result = response.data;
          objectPath.get(result.data, 'id') !== undefined
            ? localStorage.setItem('U_ID', result.data.id)
            : localStorage.setItem('U_ID', '');
          dispatch(userRequestSuccess(result.data));
        })
        .catch((err) => {
          dispatch(userRequestError(err));
        });
    });
  };
};
