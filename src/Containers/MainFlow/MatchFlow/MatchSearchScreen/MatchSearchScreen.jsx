// @flow
import React, {
  useContext, useCallback, useState, useEffect,
} from 'react';
import {
  View, ScrollView, Dimensions, TouchableOpacity, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './MatchSearchScreen.style';
import { colors, calcReal } from '../../../../Assets/config';
import { MatchContext, UserContext } from '../../../../contexts';
import {
  getGames, createMatch, checkToken, getMatchList,
} from '../../../../api';
import { setApiClientHeader } from '../../../../constants/api-client';
import { dotaBackground } from '../../../../Assets';

const { width } = Dimensions.get('window');

const MatchSearchScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [, setUser] = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [matchList, setMatchList] = useState([]);

  const initData = useCallback(async () => {
    try {
      const apiGames = await getGames();
      setGames(apiGames);
      if (apiGames.length < 1) {
        return;
      }
      console.log(apiGames);
      const matches = await getMatchList(apiGames[0].gameId);
      setMatchList(matches);
      console.log(matches);
    } catch (err) {
      //
      console.log(JSON.stringify(err));
    }
  });

  const sendMatch = useCallback(async (item) => {
    try {
      setMatch({
        ...item,
        game: item,
        gameMode: item.gameTypes[0].gameModes[0],
        gameType: item.gameTypes[0],
        restrictionLevel: 'Everyone',
      });
      const data = await checkToken();
      setUser(data.user);
      setApiClientHeader('Authorization', `Bearer ${data.authToken}`);
      await AsyncStorage.setItem('AuthToken', data.authToken);
      const response = await createMatch(match);
      if (response && response.matchStatus === 'match_requested') {
        setMatch({
          ...match,
          match: response,
        });
        navigation.navigate('MatchTimerScreen');
      }
    } catch (err) {
      //
    }
  });

  useEffect(() => { initData(); }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => { sendMatch(item); }}>
        <ImageBackground
          style={styles.itemBackground}
          imageStyle={styles.itemImage}
          defaultSource={dotaBackground}
          source={{ uri: item.gamePictureUrl }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header} />
      <ScrollView
        style={styles.searchContainer}
        contentContainerStyle={styles.padding0}
      />
      {/* <FlatList
        style={styles.flexContainer}
        contentContainerStyle={styles.scrollIntent}
        data={games}
        horizontal
        pagingEnabled
        getItemLayout={(data, index) => ({
          length: width - calcReal(48),
          offset: (width - calcReal(48)) * index,
          index,
        })}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.gameName}-${index}`}
      /> */}

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
