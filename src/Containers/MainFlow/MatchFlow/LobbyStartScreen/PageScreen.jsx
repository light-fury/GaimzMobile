// @flow
import React from 'react';
import {
  Text, View, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import MatchSummaryComponent from './MatchSummaryComponent';
import MatchOneDetailUserComponent from './MatchOneDetailUserComponent';
import styles from './LobbyStartScreen.style';
import MatchTeamDetailUserComponent from './MatchTeamDetailUserComponent';

const PageScreen = ({
  match, matchType, direPlayer, radiantPlayer, selectedTeam, currentPage,
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
    {!matchType && (
      <ScrollView
        style={styles.flexContainer}
        contentContainerStyle={styles.reportModal}
        showsVerticalScrollIndicator={false}
      >
        <MatchTeamDetailUserComponent
          selectedTeam={selectedTeam}
          match={match}
        />
        <MatchSummaryComponent currentPage={currentPage} match={match} />
      </ScrollView>
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
};

export default PageScreen;
