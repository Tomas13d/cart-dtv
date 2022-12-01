import axios from 'axios';
require('dotenv').config();

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || '';

const server = REACT_APP_API_URL + '/ible';
const requestAxios = axios.create({
  baseURL: server,
  responseType: 'json',
});


requestAxios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const updateAxios = (callback) => {
  requestAxios.defaults.headers.Authorization = localStorage.getItem('enp_id');
  callback();
};

export {
  requestAxios,
  updateAxios,
};
