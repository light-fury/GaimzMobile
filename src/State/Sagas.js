// @flow
import {fork} from 'redux-saga/effects';
import createSecretsDataSagas from './Secrets/Sagas';

export default function* root() {
  yield fork(createSecretsDataSagas);
}
