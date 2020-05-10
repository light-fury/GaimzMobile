// @flow
import React, {
  useState, useRef, useEffect, useCallback, useContext,
} from 'react';
import {
  Text, View, ImageBackground, StatusBar,
  Image, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import moment from 'moment';
import {
  get, find,
} from 'lodash';

import { updateMatchStatus, getMatchStatus, lobbyInvite } from '../../../../api';
import { MatchContext, UserContext } from '../../../../contexts';
import ProfileComponent from './ProfileScreen';
import PageScreen from './PageScreen';
import MatchSummaryComponent from './MatchSummaryComponent';
import styles from './LobbyStartScreen.style';
import {
  lobbyBgDota, arrowRight, radiantIcon, direIcon,
} from '../../../../Assets';
import MatchOneDetailComponent from './MatchOneDetailComponent';
import MatchTeamDetailComponent from './MatchTeamDetailComponent';
import { calcReal } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

const WAIT_TEXT = 'GAIMZ BOT PREPARING LOBBY';
const INVITE_TEXT = 'INVITE SEND\nYOU ARE ';
const PREPARE_TEXT = 'GETTING\nMATCH DATA';
const targetMatchStatus = [
  'match_accepted',
  'invites_sent',
  'match_started',
  'match_started',
  'match_ended',
];

const LobbyStartScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [user] = useContext(UserContext);
  const [matchType, setMatchType] = useState(get(match, 'match.gameType') === '1v1');
  const [direPlayer, setDirePlayer] = useState(user);
  const [radiantPlayer, setRadiantPlayer] = useState(get(match, 'opponent'));
  const [direTeam, setDireTeam] = useState();
  const [selectedTeam, setSelectedTeam] = useState(true);
  const [radiantTeam, setRadiantTeam] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [startedTime, setStartTime] = useState(moment());
  const [currentPage, setCurrentPage] = useState(0);
  const currentPageRef = useRef();
  const scrollViewRef = useRef();
  const startedTimeRef = useRef();
  const currentTimeRef = useRef();
  currentPageRef.current = currentPage;
  startedTimeRef.current = startedTime;
  currentTimeRef.current = currentTime;

  const onPageChanged = (offset) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * offset, y: 0 });
    }
    setCurrentPage(offset);
    setStartTime(moment());
    setCurrentTime(0);
  };

  const acceptMatchRequest = useCallback(async () => {
    try {
      const params = {
        matchId: get(match, 'match.matchId'),
      };
      await lobbyInvite(params);
    } catch (err) {
      //
    }
  });

  const cancelMatchRequest = useCallback(async () => {
    try {
      const params = {
        acceptMatch: false,
      };
      await updateMatchStatus(get(match, 'match.matchId'), params);
      setMatch({
        ...match,
        match: {},
      });
      BackgroundTimer.stopBackgroundTimer();
      setTimeout(() => {
        navigation.pop(3);
      }, 1000);
    } catch (error) {
      //
    }
  });

  const updateTeamMembers = useCallback((players, teamName) => {
    if (players && players.length > 0) {
      if (teamName === 'dire') {
        setDireTeam(players);
        if (find(players, (subPlayer) => subPlayer.userId === user.userId)) {
          setDirePlayer(user);
        } else {
          setDirePlayer(get(match, 'opponent'));
        }
      } else {
        setRadiantTeam(players);
        if (find(players, (subPlayer) => subPlayer.userId === user.userId)) {
          setRadiantPlayer(user);
        } else {
          setRadiantPlayer(get(match, 'opponent'));
        }
      }
    }
  });

  const checkMatchStatus = useCallback(async () => {
    try {
      const response = await getMatchStatus(get(match, 'match.matchId'));
      if (response && response.matchStatus === 'match_cancelled') {
        cancelMatchRequest();
        return;
      }
      if (response) {
        const offset = targetMatchStatus.findIndex((item) => item === response.matchStatus);
        if (offset < 0) {
          cancelMatchRequest();
          return;
        }
        setMatch({
          ...match,
          match: response,
        });
        setMatchType(get(response, 'gameType') === '1v1');
        updateTeamMembers(get(response, 'dire.players'), 'dire');
        updateTeamMembers(get(response, 'radiant.players'), 'radiant');
        if (currentPageRef.current === offset) {
          return;
        }
        if (offset !== 2 && offset !== 3) {
          onPageChanged(offset);
        } else if (response.player_data) {
          onPageChanged(3);
        } else {
          onPageChanged(2);
        }
      }
    } catch (err) {
      //
    }
  });

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      checkMatchStatus();
    }, 5000);
  };

  useEffect(() => {
    // Start Timer for preparing lobby
    startTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, []);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          style={styles.flexContainer}
          imageStyle={styles.itemContainer}
          source={lobbyBgDota}
        >
          <View style={styles.headerInnerContainer}>
            <ProfileComponent
              item={{
                username: matchType ? direPlayer.userName : 'DIRE',
                avatar: matchType ? { uri: direPlayer.userAvatarUrl } : direIcon,
                team: (matchType && !!get(match, 'match.dire')) ? 'DIRE' : '',
                borderWidth: (matchType || !selectedTeam) ? 0 : calcReal(4),
                borderColor: '#6320EE',
              }}
              onClick={() => setSelectedTeam(true)}
            />
            <View style={styles.itemContainer}>
              <Text style={[styles.profileText, styles.fontBig]}>VS</Text>
            </View>
            <ProfileComponent
              item={{
                username: matchType ? radiantPlayer.userName : 'RADIANT',
                avatar: matchType ? { uri: radiantPlayer.userAvatarUrl } : radiantIcon,
                team: (matchType && !!get(match, 'match.radiant')) ? 'RADIANT' : '',
                borderWidth: (matchType || selectedTeam) ? 0 : calcReal(4),
                borderColor: '#6320EE',
              }}
              onClick={() => setSelectedTeam(false)}
            />
          </View>
          {!matchType && (
            <MatchSummaryComponent match={match} />
          )}
        </ImageBackground>
        {get(match, 'match.matchStatus') === 'match_ended' && (
          <Text style={[styles.profileText, styles.fontBig, styles.absoluteOne]}>
            {get(match, 'match.radiantWon') === true ? 'RADIANT WON' : 'DIRE WON'}
          </Text>
        )}
      </View>
      <View style={styles.searchContainer}>
        {matchType && (
          <MatchSummaryComponent match={match} />
        )}
        <ScrollView
          ref={scrollViewRef}
          style={styles.flexContainer}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          <PageScreen
            currentTime={currentTime}
            navigation={navigation}
            pageText={WAIT_TEXT}
            buttonText="CANCEL MATCH"
            buttonVisible
            clicked={cancelMatchRequest}
          />
          <PageScreen
            currentTime={currentTime}
            navigation={navigation}
            pageText={`${INVITE_TEXT}${'RADIANT'}`}
            buttonVisible
            buttonText="SEND INVITE AGAIN"
            clicked={acceptMatchRequest}
          />
          <PageScreen
            currentTime={currentTime}
            navigation={navigation}
            pageText={PREPARE_TEXT}
            buttonVisible={false}
          />
          <View style={styles.individualPage}>
            {matchType && direTeam && (
              <View style={styles.itemContainer}>
                <Text style={[styles.profileText, styles.matchProgressText]}>
                  {`The Dire | ${direPlayer.userName}`}
                </Text>
                <MatchOneDetailComponent teamMember={direTeam[0]} />
                <View style={styles.seperatorLine} />
                <Text style={[styles.profileText, styles.matchProgressText]}>
                  {`Radiant | ${radiantPlayer.userName}`}
                </Text>
                <MatchOneDetailComponent teamMember={radiantTeam[0]} />
              </View>
            )}
            {!matchType && direTeam && (
              <View style={styles.teamItemContainer}>
                <MatchTeamDetailComponent teamMember={selectedTeam ? direTeam : radiantTeam} />
              </View>
            )}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.reportContainer}>
          <Text style={styles.profileText}>REPORT ISSUE</Text>
          <Image source={arrowRight} style={styles.arrowImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

LobbyStartScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default LobbyStartScreen;
