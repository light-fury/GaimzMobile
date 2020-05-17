import AsyncStorage from '@react-native-community/async-storage';
import HttpClient from '../helpers/HttpClient';

/**
 * Signs a user up with basic details
 * @param {{
        captcha,
        userName,
        userEmail,
        userPassword,
        userPasswordConfirm,
      }} signUpParams
 * @param {*} abortController
 */
export const signUp = async (signUpParams, abortController = null) => {
  const response = await HttpClient.post('/signup', signUpParams, {
    baseUrl: HttpClient.BasicApiUrl,
    abortController,
    anonymous: true,
  });

  if (!response.error) {
    await AsyncStorage.setItem('AuthToken', response.payload.authToken);
    return response.payload.user;
  }

  throw Error('Failed to sign in');
};

/**
 * Signs in a user with the provided credentials
 * @param {*} email
 * @param {*} password
 * @param {*} abortController
 * @returns UserObject
 */
export const signIn = async (email, password, abortController = null) => {
  const response = await HttpClient.post('/login', {
    user_email: email,
    user_password: password,
  }, {
    baseUrl: HttpClient.BasicApiUrl,
    abortController,
    anonymous: true,
  });

  if (!response.error) {
    await AsyncStorage.setItem('AuthToken', response.payload.authToken);
    return response.payload.user;
  }

  throw Error('Failed to sign in');
};

/**
 * Using params from a Steam URL, attempt a social sign in
 * @param {*} params - Steam URL Params
 * @param {*} abortController
 * @returns UserObject
 */
export const signInWithSteam = async (params, abortController = null) => {
  const response = await HttpClient.post('/apps/steam/account', params, {
    baseUrl: HttpClient.BasicApiUrl,
    abortController,
  });

  if (!response.error) {
    await AsyncStorage.setItem('AuthToken', response.payload.authToken);
    return response.payload.user;
  }

  throw Error('Failed to sign in with Steam');
};


/**
 * Using params from a Twitch URL, attempt a social sign in
 * @param {*} params - Twitch URL Params
 * @param {*} abortController
 * @returns UserObject
 */
export const signInWithTwitch = async (params, abortController = null) => {
  const response = await HttpClient.post('/apps/twitch/code', params, {
    baseUrl: HttpClient.BasicApiUrl,
    abortController,
  });

  if (!response.error) {
    await AsyncStorage.setItem('AuthToken', response.payload.authToken);
    return response.payload.user;
  }

  throw Error('Failed to sign in with Twitch');
};

/**
 * Invokes the reset password process for the provided email
 * @param {*} email
 * @param {*} abortController
 */
export const resetPassword = async (email, abortController = null) => {
  const response = await HttpClient.post(`/login/reset/${email}`, null, {
    baseUrl: HttpClient.BasicApiUrl,
    abortController,
    anonymous: true,
  });
  if (!response.error) {
    return response.payload.data;
  }
  throw Error(response.error);
};

/**
 * Attempts to get a new access token
 * @param {User} abortController
 * @returns UserObject
 */
export const attemptRefreshUser = async (abortController = null) => {
  // eslint-disable-next-line no-undef

  // if (!(await AsyncStorage.getItem('AuthToken'))) {
  //   throw Error('No AuthToken present');
  // }

  const response = await HttpClient.get('/checktoken', {
    baseUrl: HttpClient.BasicApiUrl,
    abortController,
  });

  if (!response.error) {
    await AsyncStorage.setItem('AuthToken', response.payload.authToken);
    return response.payload.user;
  }

  throw Error('Failed to refresh token and retrieve User');
};
