import HttpClient from '../helpers/HttpClient';

/**
 * Get a list of games supported for matches
 * @param {*} abortController
 */
export const getGames = async (abortController = null) => {
  const response = await HttpClient.get('/games', {
    baseUrl: HttpClient.BasicApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }
  // Failed to get Games
  return [];
};

export default {
  getGames,
};
