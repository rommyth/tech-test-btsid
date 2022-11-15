import axios from 'axios';

export const Request = axios.create({
  baseURL: 'http://94.74.86.174:8080/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});
