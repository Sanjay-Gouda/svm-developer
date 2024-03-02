import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const cookie_token = context.req.headers.cookie?.split('=')[1];
//   const tokenData = createHttpInstance(cookie_token);
//   console.log(cookie_token, 'INSIDE');
//   return {
//     props: { tokenData },
//   };
// };

const httpInstance = axios.create({
  baseURL: 'https://svmdevelopers.in/xq12opmpas/api/',
  // baseURL: 'https://754d-14-192-30-188.ngrok-free.app/api/',
  // baseURL: 'http://localhost:3060/api/',
});

// httpInstance.interceptors.request.use(function (config) {
//   const token = cookies.get('token');
//   // l  console.log(token, 'INSIDE');
//   if (config) {
//     if (config['headers']) {
//       config['headers']['Authorization'] = 'Bearer' + token;
//     }
//   }
//   return config;
// });

export { httpInstance };
