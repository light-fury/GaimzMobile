import * as ActionTypes from '../ActionTypes';

export const createSecretsData = (payloadData) => ({
  type: ActionTypes.GET_SECRETS,
  payload: payloadData,
});

export const createSecretsDataSuccess = (data) => ({
  type: ActionTypes.GET_SECRETS_SUCCESS,
  data,
});

export const createSecretsDataError = (error) => ({
  type: ActionTypes.GET_SECRETS_ERROR,
  error,
});

export const updateSettingsData = (data) => ({
  type: ActionTypes.UPDATE_SETTINGS,
  data,
});
