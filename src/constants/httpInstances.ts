import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const AUTH_TOKEN = cookies.get('token');

const httpInstance = axios.create({
  baseURL: 'https://svm-r2y4.onrender.com/xq12opmpas/api/',
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
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { httpInstance };
