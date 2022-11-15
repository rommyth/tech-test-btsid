import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://94.74.86.174:8080/api',
});
