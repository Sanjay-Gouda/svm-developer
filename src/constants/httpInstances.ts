import axios from 'axios';

export const httpInstance = axios.create({
  // baseURL: 'https://svm-ra9i.onrender.com/api/',
  // baseURL: 'https://svmdevelopers.in/api/',
  // baseURL: 'http://localhost:3050/api/',
  baseURL: 'http://192.168.1.9:3050/api/',
});

httpInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('loginToken');
  if (config) {
    if (config['headers']) {
      config['headers']['Authorization'] = 'Bearer ' + token;
    }
  }
  return config;
});
