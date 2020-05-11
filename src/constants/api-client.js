import axios from 'axios';
import { decamelizeKeys, camelizeKeys } from 'humps';

export const apiClient = axios.create({
  baseURL: 'https://basicapi.gaimz.com',
  timeout: 20000,
});

apiClient.interceptors.request.use(
  // Warning: change the interceptor if you're trying to send something other than JSON
  (request) => ({
    ...request,
    data: decamelizeKeys(request.data),
  }),
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => ({
    ...response,
    data: camelizeKeys(response.data),
  }),
  (error) => Promise.reject(error),
);

export const setApiClientHeader = (name, value) => {
  apiClient.defaults.headers.common[name] = value;
};

export const removeApiClientHeader = (name) => {
  delete apiClient.defaults.headers.common[name];
};
