// @flow
import React, {
  useContext, useCallback, useState, useEffect,
} from 'react';
import {
  Text, View, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './MatchSearchScreen.style';
import { colors } from '../../../../Assets/config';
import { MatchContext } from '../../../../contexts';
import { getGames } from '../../../../api';
import { createMatch } from '../../../../api/matchmaking';

const restrictionLevels = [
  'Everyone',
  'FollowersOnly',
  'SubsOnly',
  'PasswordProtected',
];

const MatchSearchScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [games, setGames] = useState([]);

  const initData = useCallback(async () => {
    try {
      const apiGames = await getGames();
      setGames(apiGames);
    } catch (err) {
      //
    }
  });

  const sendMatch = useCallback(async () => {
    createMatch(match);
  }, [match]);

  useEffect(() => { initData(); }, []);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header} />
      <ScrollView
        style={styles.searchContainer}
        contentContainerStyle={styles.padding0}
      >
        <Text style={[styles.itemTitle, styles.fontSpacing]}>
          AVAILABLE GAMES
        </Text>
      </ScrollView>
      <View style={styles.space} />
      <ConfirmButton
        borderColor={colors.secondaryOpacity}
        textColor={colors.grayText}
        label="CREATE GAME"
        onClick={() => navigation.replace('MatchSettingScreen')}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
      />
      <View style={styles.space} />
    </SafeAreaView>
  );
};

MatchSearchScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default MatchSearchScreen;
