import { put, takeLatest } from 'redux-saga/effects';

import { GET_SECRETS } from '../ActionTypes';
import * as CreateSecretsActions from './Actions';

// export function* getImageData({ payload }) {
export function* getImageData() {
  try {
    // const {navigation, fromMain} = payload;
    yield put(CreateSecretsActions.createSecretsDataError('Load failed'));
  } catch (e) {
    yield put(CreateSecretsActions.createSecretsDataError(e));
  }
}

export default function* () {
  yield takeLatest(GET_SECRETS, getImageData);
}
