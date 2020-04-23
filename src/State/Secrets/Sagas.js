import {Platform, Alert} from 'react-native';
import {put, takeLatest, select} from 'redux-saga/effects';
import FastImage from 'react-native-fast-image';
import Axios from 'axios';

import {GET_SECRETS} from '../ActionTypes';
import * as CreateSecretsActions from './Actions';

export function* getImageData({payload}) {
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
