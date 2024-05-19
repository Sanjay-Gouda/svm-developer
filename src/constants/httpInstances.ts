import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const httpInstance = axios.create({
  // baseURL: 'https://svmdevelopers.in/xq12opmpas/api/',
  baseURL: 'https://5004-150-107-191-12.ngrok-free.app/xq12opmpas/api/',
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
