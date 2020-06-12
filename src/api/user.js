import AsyncStorage from '@react-native-community/async-storage';
import HttpClient from '../helpers/HttpClient';

/**
 * Update a user with the provided params
 * @param {*} params
 * @param {*} abortController
 * @returns {User}
 */
export const updateUser = async (params, abortController = null) => {
  const response = await HttpClient.patch('/user', params, {
    abortController,
    baseUrl: HttpClient.BasicApiUrl,
  });

  if (!response.error && response.payload.success) {
    return response.payload.user;
  }

  throw Error('Unable to update user');
};

/**
 * Update a user with the provided params
 * @param {*} params
 * @param {*} abortController
 * @returns {User}
 */
export const updateAvatar = async (param, abortController = null) => {
  const response = await HttpClient.post('/user/avatar', param, {
    abortController,
    baseUrl: HttpClient.BasicApiUrl,
  }, {
    'Content-Type': 'multipart/form-data',
  });

  if (!response.error && response.payload.success) {
    return response.payload.user;
  }

  throw Error('Unable to update user');
};

/**
 * Permanently delete a user and clear local storage
 * @param {*} abortController
 */
export const deleteUser = async (abortController = null) => {
  const response = await HttpClient.deleteMethod('/user', {
    abortController,
    baseUrl: HttpClient.BasicApiUrl,
  });

  if (!response.error) {
    await AsyncStorage.removeItem('AuthToken');
    await AsyncStorage.removeItem('MatchSettings');
  }

  throw Error('Unable to delete user');
};

/**
 * Gets a user by Id
 * @param {*} userId
 * @param {*} abortController
 */
export const getUserById = async (userId, abortController = null) => {
  const response = await HttpClient.get(`/user/${userId}`, {
    abortController,
    baseUrl: HttpClient.BasicApiUrl,
  });

  if (!response.error) {
    return response.payload;
  }

  throw Error('Unable to get user by Id');
};
