// @flow

import {
  GET_SECRETS,
  GET_SECRETS_SUCCESS,
  GET_SECRETS_ERROR,
  UPDATE_SETTINGS,
} from '../ActionTypes';
import { createReducer } from '../CreateReducer';

const INITIAL_STATE = {
  secretsData: {},
  isFetching: false,
  error: null,
};

const reducers = {
  [GET_SECRETS]: (state) => ({ ...state, isFetching: true }),
  [UPDATE_SETTINGS]: (state, { data }) => ({ ...state, ...data }),
  [GET_SECRETS_SUCCESS]: (state, { data }) => ({
    ...state,
    secretsData: [...data],
    isFetching: false,
  }),
  [GET_SECRETS_ERROR]: (state, { error }) => ({
    ...state,
    secretsData: [],
    error,
    isFetching: false,
  }),
};

export const reducer = createReducer(INITIAL_STATE, reducers);

export default reducer;
