import { get } from 'lodash';
import { apiClient } from '../constants/api-client';

export const createMatch = (match) => {
  const params = {
    gameId: get(match, 'game.gameId'),
    bet: 0,
    gameMode: get(match, 'gameMode'),
    gameType: get(match, 'gameType.type'),
    restriction: get(match, 'restrictionLevel'),
    password: get(match, 'password', ''),
  };
  return apiClient.post('/match', params, { baseURL: 'https://mmapi.gaimz.com' }).then(({ data }) => data);
};

export const joinLobby = (lobby) => {
  const params = {
    matchId: get(lobby, 'matchId'),
    password: get(lobby, 'password'),
  };
  return apiClient.post('/match/lobby', params, { baseURL: 'https://mmapi.gaimz.com' }).then(({ data }) => data);
};

export const getMatchStatus = (matchId) => apiClient.get(`/match/${matchId}`, { baseURL: 'https://mmapi.gaimz.com' }).then(({ data }) => data);

export const getMatchList = (gameId) => apiClient.get(`/match/list/${gameId}`, { baseURL: 'https://mmapi.gaimz.com' }).then(({ data }) => data);

export const lobbyInvite = (params) => apiClient.post('/lobby/invite', params, { baseURL: 'https://mmapi.gaimz.com' }).then(({ data }) => data);

export const updateMatchStatus = (matchId, params) => apiClient.put(`/match/${matchId}`, params, { baseURL: 'https://mmapi.gaimz.com' }).then(({ data }) => data);

export default {
  createMatch,
  getMatchStatus,
  getMatchList,
  lobbyInvite,
};
