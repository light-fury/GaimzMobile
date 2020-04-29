import { apiClient } from '../constants/api-client';

export const signUp = (params) => apiClient.post('/signup', params).then(({ data }) => data);

export const signIn = (params) => apiClient.post('/login', params).then(({ data }) => data);

export const signInWithTwitch = (params) => apiClient.post('/login/twitch', params).then(({ data }) => data);

export const checkToken = () => apiClient.get('/checktoken').then(({ data }) => data);
