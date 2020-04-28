import { apiClient } from '../constants/api-client';

export const getTwitchLives = () => apiClient.get('/apps/twitch/live').then(({ data }) => data);

export default {
  getTwitchLives,
};
