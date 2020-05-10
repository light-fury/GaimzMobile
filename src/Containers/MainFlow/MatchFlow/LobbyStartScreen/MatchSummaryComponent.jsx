// @flow
import React from 'react';
import {
  Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  get,
} from 'lodash';

import styles from './LobbyStartScreen.style';

const MatchSummaryComponent = ({ match }) => (
  <View>
    <Text style={[styles.profileText, styles.description]}>#GMZLOBBY2973</Text>
    <Text style={[styles.profileText, styles.description]}>
      {`${get(match, 'game.gameName')} ${get(match, 'match.gameType') === '1v1' ? '1VS1' : '5VS5'} | EU | BO1`}
    </Text>
  </View>
);

MatchSummaryComponent.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default MatchSummaryComponent;
