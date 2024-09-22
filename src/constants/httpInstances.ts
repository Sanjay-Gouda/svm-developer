import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const AUTH_TOKEN = cookies.get('token');

const httpInstance = axios.create({
  // baseURL: 'https://svm-711o.onrender.com/xq12opmpas/api/',
  baseURL: 'https://c5be-2409-40c1-6032-641c-fdd7-6b17-5776-6160.ngrok-free.app/xq12opmpas/api/',

});

export const setAuthHeader = (context: GetServerSidePropsContext) => {
  const token = context.req.headers.cookie?.split('=')[1];
  if (token) {
    httpInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
};

httpInstance.interceptors.request.use(
  (config) => {
    if (AUTH_TOKEN) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    }
    config['headers']['ngrok-skip-browser-warning'] = '69420';
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { httpInstance };
