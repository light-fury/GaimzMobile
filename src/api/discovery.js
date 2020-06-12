import HttpClient from '../helpers/HttpClient';

/**
 * Returns list of streams based off your Twitch login.
 * @param {*} abortController
 * @returns {Array}
 */
export const getRecentVideos = async (twitchId, abortController = null) => {
  const response = await HttpClient.get(`/discover/videos/${twitchId}`, {
    baseUrl: HttpClient.DiscoveryApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }
  // Failed to get Twitch Live Streams
  return [];
};

export default {
  getRecentVideos,
};
