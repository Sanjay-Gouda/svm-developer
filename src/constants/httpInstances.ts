import axios from 'axios';

export const httpInstance = axios.create({
  baseURL: 'https://svm-ra9i.onrender.com/api/',
});
