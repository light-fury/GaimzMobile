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

const getBotText = (val, radiantWon) => {
  if (radiantWon === true) {
    return 'BOT: Radiant Won';
  }
  if (radiantWon === false) {
    return 'BOT: Dire Won';
  }
  switch (val) {
    case 0:
      return 'BOT: Preparing Lobby';
    case 1:
      return 'BOT: Invite Send';
    case 2:
      return 'BOT: Starting Match';
    case 3:
      return 'BOT: Getting Match Data';
    default:
      return '';
  }
};

const MatchSummaryComponent = ({ match, currentPage }) => (
  <View>
    <Text style={[styles.profileText, styles.fontBig]}>
      {getBotText(currentPage, get(match, 'match.stats.radiantWon'))}
    </Text>
    <Text style={[styles.profileText, styles.description]}>
      {`#GMZLOBBY${get(match, 'match.matchId') || ''}`}
    </Text>
    <Text style={[styles.profileText, styles.description]}>
      {`${get(match, 'game.gameName')} ${get(match, 'match.gameType') === '1v1' ? '1VS1' : '5VS5'} | EU | BO1`}
    </Text>
  </View>
);

MatchSummaryComponent.propTypes = {
  match: PropTypes.shape().isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default MatchSummaryComponent;
