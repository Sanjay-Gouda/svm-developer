import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const httpInstance = axios.create({
  baseURL: 'https://svmdevelopers.in/xq12opmpas/api/',
  // baseURL: 'https://5503-150-107-191-174.ngrok-free.app/xq12opmpas/api/',
});

// httpInstance.interceptors.request.use(function (config) {
//   const token = cookies.get('token');
//   if (config) {
//     if (config['headers']) {
//       config['headers']['ngrok-skip-browser-warning'] = '69420';
//     }
//   }
//   return config;
// });

export { httpInstance };
