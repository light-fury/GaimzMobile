import React, {
  useContext, useCallback, useState, useEffect,
} from 'react';
import {
  View, Image, TouchableOpacity, ImageBackground, Text, FlatList, Alert,
} from 'react-native';
import {
  find, get,
} from 'lodash';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';

import ConfirmButton from '../../../../Components/ConfirmButton';
import LoadingComponent from '../../../../Components/LoadingComponent';
import styles from './MatchSearchScreen.style';
import { colors } from '../../../../Assets/config';
import { MatchContext, UserContext } from '../../../../contexts';
import {
  getGames, createMatch, checkToken, getMatchList,
} from '../../../../api';
import { setApiClientHeader } from '../../../../constants/api-client';
import { lockIcon, profileTempDota } from '../../../../Assets';

const tempMatches = [
  {
    matchId: '84',
    gameId: '1',
    startTime: '2020-05-08T02:12:06.369Z',
    endTime: '2020-05-08T02:22:06.369Z',
    bet: 0,
    matchStatus: 'match_requested',
    gameMode: 'All Pick',
    gameType: '1v1',
    restriction: 'FollowersOnly',
    players: [{
      userId: '42074',
      playerStatus: 'match_requested',
      user: {
        userId: '42074', userName: 'Blueshark', userAvatarUrl: 'https://api.adorable.io/avatars/face/eyes1/nose5/mouth10/8806c0', userEmail: 'pituhin98@gmail.com', userRole: 'Gaimer',
      },
    }],
    game: {
      gameId: '1', gameName: 'DOTA 2', gamePictureUrl: 'http://cdn.dota2.com/apps/dota2/images/nav/logo.png', gameTypes: [{ type: '1v1', gameModes: ['Solo Mid'], nrOfPlayers: 2 }, { type: '5v5', gameModes: ['All Pick'], nrOfPlayers: 10 }], success: true,
    },
  },
  {
    matchId: '84',
    gameId: '1',
    startTime: '2020-05-08T02:12:06.369Z',
    endTime: '2020-05-08T02:22:06.369Z',
    bet: 0,
    matchStatus: 'match_requested',
    gameMode: 'Solo Mid',
    gameType: '1v1',
    restriction: 'SubsOnly',
    players: [{
      userId: '42074',
      playerStatus: 'match_requested',
      user: {
        userId: '42074', userName: 'Blueshark', userAvatarUrl: 'https://api.adorable.io/avatars/face/eyes1/nose5/mouth10/8806c0', userEmail: 'pituhin98@gmail.com', userRole: 'Gaimer',
      },
    }],
    game: {
      gameId: '1', gameName: 'DOTA 2', gamePictureUrl: 'http://cdn.dota2.com/apps/dota2/images/nav/logo.png', gameTypes: [{ type: '1v1', gameModes: ['Solo Mid'], nrOfPlayers: 2 }, { type: '5v5', gameModes: ['All Pick'], nrOfPlayers: 10 }], success: true,
    },
  },
];

const MatchSearchScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [matchList, setMatchList] = useState(tempMatches);

  const fetchMatchFromGame = useCallback(async (targetGame) => {
    try {
      const matches = await getMatchList(targetGame.gameId);
      if (matches.length > 0) {
        return matches
          .filter((item) => (item.gameType !== '1v1' || item.players.length === 1)
            && (item.gameType !== '5v5' || (item.players.length <= 9 && item.players.length > 0)))
          .map((item) => ({
            ...item,
            game: {
              ...targetGame,
              gameType: targetGame.gameTypes.find((subType) => subType.type === item.type),
            },
          }));
      }
    } catch (err) {
      //
    }
    return [];
  });

  const initData = useCallback(async () => {
    try {
      setLoading(true);
      const apiGames = await getGames();
      if (apiGames.length < 1) {
        return;
      }
      const promises = [];
      apiGames.map((item) => promises.push(fetchMatchFromGame(item)));
      const apiResult = await Promise.all(promises);
      const resultList = [].concat(...apiResult);
      if (resultList.length > 0) {
        setMatchList(resultList);
      }
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  });

  const sendMatch = useCallback(async (item) => {
    try {
      if (item.restriction === 'FollowersOnly') {
        navigation.navigate('MatchErrorScreen', { errorMessage: `You need to follow to ${item.players[0].user.userName} before you can match with him on Gaimz` });
        return;
      }
      if (item.restriction === 'SubsOnly') {
        navigation.navigate('MatchErrorScreen', { errorMessage: `You need to subscribe to ${item.players[0].user.userName} before you can match with him on Gaimz` });
        return;
      }
      setLoading(true);
      setMatch({
        ...item,
        gameType: find(get(item, 'game.gameTypes'), (gameType) => gameType.type === item.gameType),
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
      Alert.alert('Error', 'There was an error creating your game');
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => { initData(); }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.rowContainer} onPress={() => sendMatch(item)}>
        <ImageBackground
          style={styles.itemBackground}
          imageStyle={styles.itemImage}
          defaultSource={profileTempDota}
          source={{ uri: item.players[0].user.userAvatarUrl || '' }}
          resizeMode="cover"
        >
          {item.restriction === 'PasswordProtected' && (
            <Image source={lockIcon} style={styles.lockImage} resizeMode="contain" />
          )}
        </ImageBackground>
        <View style={styles.ph12}>
          <Text style={styles.profileName}>{item.players[0].user.userName}</Text>
          <Text style={styles.gameDetails}>{`${item.gameType} - ${item.gameMode}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never' }}
      style={styles.container}
    >
      <View style={styles.header} />
      <View
        style={styles.searchContainer}
      >
        <Text style={styles.itemTitle}>
          AVAILABLE GAMES
        </Text>
        <View style={styles.space} />
        <FlatList
          style={styles.flexContainer}
          contentContainerStyle={styles.padding0}
          data={matchList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.gameName}-${index}`}
        />
      </View>
      <Text style={styles.orText}>OR</Text>
      <ConfirmButton
        borderColor={colors.secondaryOpacity}
        textColor={colors.grayText}
        label="CREATE GAME"
        onClick={() => navigation.replace('MatchSettingScreen')}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
        disabled={loading}
      />
      <View style={styles.space} />
      {loading && (
        <LoadingComponent />
      )}
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
