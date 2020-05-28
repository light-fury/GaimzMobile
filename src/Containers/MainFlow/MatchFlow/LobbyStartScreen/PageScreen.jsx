// @flow
import React from 'react';
import {
  Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

import MatchSummaryComponent from './MatchSummaryComponent';
import MatchOneDetailUserComponent from './MatchOneDetailUserComponent';
import MatchTeamDetailComponent from './MatchTeamDetailComponent';
import styles from './LobbyStartScreen.style';

const PageScreen = ({
  match, matchType, direPlayer, radiantPlayer, selectedTeam, direTeam, radiantTeam, currentPage,
}) => (
  <View style={styles.individualPage}>
    {matchType && (
      <View style={styles.flexContainer}>
        <Text style={[styles.profileText, styles.matchProgressText, styles.alignLeft]}>
          {direPlayer.userName}
        </Text>
        <MatchOneDetailUserComponent teamMember={direPlayer} />
        <Text style={[styles.profileText, styles.matchProgressText, styles.alignLeft]}>
          {radiantPlayer.userName}
        </Text>
        <MatchOneDetailUserComponent teamMember={radiantPlayer} />
        <MatchSummaryComponent currentPage={currentPage} match={match} />
      </View>
    )}
    {!matchType && direTeam && (
      <View style={styles.teamItemContainer}>
        <MatchTeamDetailComponent teamMember={selectedTeam ? direTeam : radiantTeam} />
        <MatchSummaryComponent currentPage={currentPage} match={match} />
      </View>
    )}
  </View>
);

PageScreen.propTypes = {
  match: PropTypes.shape().isRequired,
  matchType: PropTypes.bool.isRequired,
  direPlayer: PropTypes.shape().isRequired,
  radiantPlayer: PropTypes.shape().isRequired,
  selectedTeam: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  direTeam: PropTypes.shape().isRequired,
  radiantTeam: PropTypes.shape().isRequired,
};

export default PageScreen;
