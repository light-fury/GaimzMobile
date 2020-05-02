import { get } from 'lodash';
import { apiClient } from '../constants/api-client';

export const createMatch = (match) => {
  const params = {
    gameId: get(match, 'game.gameId'),
    bet: 0,
    gameMode: get(match, 'gameMode'),
    gameType: get(match, 'gameType.type'),
    restriction: get(match, 'restrictionLevel'),
    password: get(match, 'password'),
  };

  return apiClient.post('https://mmapi.gaimz.com/match', params).then(({ data }) => data);
};
