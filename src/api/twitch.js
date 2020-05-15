import HttpClient from '../helpers/HttpClient';

/**
 * Returns list of streams based off your Twitch login.
 * @param {*} abortController
 * @returns [Object]
 */
export const getTwitchLives = async (abortController = null) => {
  const response = await HttpClient.get('/apps/twitch/live', {
    baseUrl: HttpClient.BasicApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }
  // Failed to get Twitch Live Streams
  return [];
};

export default {
  getTwitchLives,
};
