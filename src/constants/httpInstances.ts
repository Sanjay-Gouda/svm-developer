import axios from 'axios';

export const httpInstance = axios.create({
  baseURL: 'https://svm-ra9i.onrender.com/api/',
  // baseURL: 'http://localhost:3050/api/',
});
