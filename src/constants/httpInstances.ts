import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const httpInstance = axios.create({
  // baseURL: 'https://svmdevelopers.in/xq12opmpas/api/',
  baseURL: 'https://svm-r2y4.onrender.com/xq12opmpas/api/',
});

httpInstance.interceptors.request.use(function (config) {
  // console.log(token, 'TOKEN');
  if (config?.['headers']) {
    config['headers']['ngrok-skip-browser-warning'] = '69420';
  }

  return config;
});

// httpInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('loginToken');

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (err) => {
//     console.log(err);
//     return Promise.reject(err);
//   }
// );

export { httpInstance };
