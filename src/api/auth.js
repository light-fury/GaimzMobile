import AsyncStorage from '@react-native-community/async-storage';

import { apiClient } from '../constants/api-client';
import HttpClient from '../helpers/HttpClient';

export const signUp = (params) => apiClient.post('/signup', params).then(({ data }) => data);

export const signIn = (params) => apiClient.post('/login', params).then(({ data }) => data);

export const signInWithSteam = (params) => apiClient.post('/apps/steam/account', params).then(({ data }) => data);

export const signInWithTwitch = (params) => apiClient.post('/apps/twitch/code', params).then(({ data }) => data);

export const checkToken = () => apiClient.get('/checktoken').then(({ data }) => data);

export const resetPassword = (email) => apiClient.post(`/login/reset/${email}`).then(({ data }) => data);

export const attemptRefreshUser = async (abortController = null) => {
  // eslint-disable-next-line no-undef
  const token = await AsyncStorage.getItem('AuthToken');
  HttpClient.setAuthenticationToken(token);
  const response = await HttpClient.get('checktoken', abortController);
  if (!response.error) {
    AsyncStorage.setItem('AuthToken', response.payload.authToken);
    return response.payload.user;
  }
  throw Error('Failed to refresh token and retrieve User');
};
