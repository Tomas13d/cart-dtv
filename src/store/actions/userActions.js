import { requestAxios, updateAxios } from './utils';
export const USER_AUTH_INIT = 'USER_AUTH_INIT';
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

const userAuthInit = () => {
  return {
    type: USER_AUTH_INIT,
    payload: {
      init: true,
    },
  };
};

const userAuthSuccess = (data, dispatch) => {
  return {
    type: USER_AUTH_SUCCESS,
    payload: {
      init: false,
      success: true,
      error: false,
      user: data,
    },
  };
};

const userAuthError = (err) => {
  return {
    type: USER_AUTH_ERROR,
    payload: {
      init: false,
      success: false,
      error: err,
    },
  };
};

export const userAuth = (data) => {
  return function (dispatch) {
    dispatch(userAuthInit());
    requestAxios
      .post('/ible/login', data)
      .then((response) => {
        const result = response.data;
        localStorage.setItem('NOMBRE', result.data.user.username);
        localStorage.setItem('token', result.data.token);
        updateAxios(async () => dispatch(userAuthSuccess(result.data.user)));
      })
      .catch((err) => {
        dispatch(userAuthError(err));
      });
  };
};
