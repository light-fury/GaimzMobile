import { get } from 'lodash';
import HttpClient from '../helpers/HttpClient';

/**
 * Creates a match based on the specified params
 * @param {p} match
 * @param {*} abortController
 */
export const createMatch = async (match, abortController = null) => {
  const params = {
    gameId: get(match, 'game.gameId'),
    bet: 0,
    gameMode: get(match, 'gameMode'),
    gameType: get(match, 'gameType.type'),
    restriction: get(match, 'restrictionLevel'),
    password: get(match, 'password', ''),
  };
  const response = await HttpClient.post('/match', params, {
    baseUrl: HttpClient.MatchMakingApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }
  throw Error('Unable to create match');
};


/**
 * Creates a match based on the specified params
 * @param {p} match
 * @param {*} abortController
 */
export const getDummyData = async (match, abortController = null) => {
  const response = await HttpClient.get('/match/create/test', {
    baseUrl: HttpClient.MatchMakingApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }
  throw Error('Unable to create match');
};


/**
 * Attempts to join the specified lobby
 * @param {*} lobby
 * @param {*} abortController
 */
export const joinLobby = async (lobby, abortController = null) => {
  const params = {
    matchId: get(lobby, 'matchId'),
    password: get(lobby, 'password'),
  };
  const response = await HttpClient.post('/match/lobby', params, {
    baseUrl: HttpClient.MatchMakingApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }
  throw Error('Unable to join lobby');
};

/**
 * Attempts to get a Matches status
 * @param {*} matchId
 * @param {*} abortController
 */
export const getMatchStatus = async (matchId, abortController = null) => {
  const response = await HttpClient.get(`/match/${matchId}`, {
    baseUrl: HttpClient.MatchMakingApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }

  throw Error('Unable to get match status');
};

/**
 * Gets a list of Matches for a specified Game
 * @param {*} gameId
 * @param {*} abortController
 */
export const getMatchList = async (gameId, abortController = null) => {
  const response = await HttpClient.get(`/match/list/${gameId}`, {
    baseUrl: HttpClient.MatchMakingApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }

  throw Error('Unable to get match status');
};

/**
 * Sends a lobby invite based on the provided params
 * @param {*} params
 * @param {*} abortController
 */
export const lobbyInvite = async (params, abortController = null) => {
  const response = await HttpClient.post('/lobby/invite', params, {
    baseUrl: HttpClient.MatchMakingApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }

  throw Error('Unable to prepare lobby invite');
};

/**
 * Updates a specified matches status
 * @param {*} matchId
 * @param {*} params
 * @param {*} abortController
 */
export const updateMatchStatus = async (matchId, params, abortController = null) => {
  const response = await HttpClient.put(`/match/${matchId}`, params, {
    baseUrl: HttpClient.MatchMakingApiUrl,
    abortController,
  });

  if (!response.error) {
    return response.payload;
  }

  throw Error('Unable to update match status');
};


export default {
  createMatch,
  getMatchStatus,
  getMatchList,
  lobbyInvite,
};
