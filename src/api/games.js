import { apiClient } from '../constants/api-client';

export const getGames = () => apiClient.get('/games').then(({ data }) => data);
