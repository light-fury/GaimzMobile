import React, {
  useContext, useCallback, useState, useEffect,
} from 'react';
import {
  View, Image, TouchableOpacity, ImageBackground, Text, FlatList, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import ConfirmButton from '../../../../Components/ConfirmButton';
import LoadingComponent from '../../../../Components/LoadingComponent';
import styles from './MatchSearchScreen.style';
import { colors } from '../../../../Assets/config';
import { LobbyContext, MatchContext } from '../../../../contexts';
import {
  getGames, getMatchList, joinLobby,
} from '../../../../api';
import { lockIcon, profileTempDota } from '../../../../Assets';


const MatchSearchScreen = ({ navigation }) => {
  const [, setMatch] = useContext(MatchContext);
  const [loading, setLoading] = useState(false);
  const [lobbyList, setLobbyList] = useState([]);
  const [, setLobby] = useContext(LobbyContext);

  const fetchLobbiesFromGame = useCallback(async (targetGame) => {
    try {
      const lobbies = await getMatchList(targetGame.gameId);
      if (lobbies.length > 0) {
        return lobbies;
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
      // TODO: this will pull all the lobbies from all the games, only current game should be pulled
      apiGames.map((item) => promises.push(fetchLobbiesFromGame(item)));
      const apiResult = await Promise.all(promises);
      const resultList = [].concat(...apiResult);
      if (resultList.length > 0) {
        setLobbyList(resultList);
      }
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  });

  const sendLobby = useCallback(async (item) => {
    setLoading(true);

    try {
      if (item.restriction === 'PasswordProtected') {
        setLobby({ matchId: item.matchId });
        navigation.navigate('MatchPasswordScreen');
        return;
      }
      if (item.restriction === 'Everyone') {
        throw new Error('How did you get here?');
      }

      const response = await joinLobby({ matchId: item.matchId });
      if (response) {
        setMatch({
          match: response,
        });
        navigation.navigate('MatchTimerScreen');
      } else {
        if (item.restriction === 'FollowersOnly') {
          navigation.navigate('MatchErrorScreen', { errorMessage: `You need to follow to ${item.username} before you can match with him on Gaimz` });
          return;
        }
        if (item.restriction === 'SubsOnly') {
          navigation.navigate('MatchErrorScreen', { errorMessage: `You need to subscribe to ${item.username} before you can match with him on Gaimz` });
          return;
        }
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
      <TouchableOpacity style={styles.rowContainer} onPress={() => sendLobby(item)}>
        <ImageBackground
          style={styles.itemBackground}
          imageStyle={styles.itemImage}
          defaultSource={profileTempDota}
          source={{ uri: item.avatarUrl || '' }}
          resizeMode="cover"
        >
          {item.restriction === 'PasswordProtected' && (
            <Image source={lockIcon} style={styles.lockImage} resizeMode="contain" />
          )}
        </ImageBackground>
        <View style={styles.ph12}>
          <Text style={styles.profileName}>{item.username}</Text>
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
          data={lobbyList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.gameName}-${index}`}
        />
      </View>
      <Text style={styles.orText}>OR</Text>
      <ConfirmButton
        borderColor={colors.secondaryOpacity}
        textColor={colors.grayText}
        label="CREATE GAME"
        onClick={() => navigation.replace({ key: 'MatchSearchScreen', newKey: 'MatchSettingScreen', routeName: 'MatchSettingScreen' })}
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
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default MatchSearchScreen;
