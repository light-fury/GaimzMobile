import { apiClient } from '../constants/api-client';

export const signUp = (params) => apiClient.post('/signup', params).then(({ data }) => data);

export const signIn = (params) => apiClient.post('/login', params).then(({ data }) => data);

export const signInWithSteam = (params) => apiClient.post('/apps/steam/account', params).then(({ data }) => data);

export const signInWithTwitch = (params) => apiClient.post('/apps/twitch/code', params).then(({ data }) => data);

export const checkToken = () => apiClient.get('/checktoken').then(({ data }) => data);

export const resetPassword = (email) => apiClient.post(`/login/reset/${email}`).then(({ data }) => data);
