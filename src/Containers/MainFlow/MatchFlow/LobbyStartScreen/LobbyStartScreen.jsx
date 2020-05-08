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
  get,
} from 'lodash';

import { updateMatchStatus, getMatchStatus, lobbyInvite } from '../../../../api';
import { MatchContext, UserContext } from '../../../../contexts';
import ProfileComponent from './ProfileScreen';
import PageScreen from './PageScreen';
import styles from './LobbyStartScreen.style';
import {
  lobbyBgDota, arrowRight, heroTemplate,
} from '../../../../Assets';

const { width } = Dimensions.get('window');

const WAIT_TEXT = 'GAIMZ BOT PREPARING LOBBY';
const INVITE_TEXT = 'INVITE SEND\nYOU ARE ';
const PREPARE_TEXT = 'GETTING\nMATCH DATA';
const TOTAL_CALL_DURATION = 600;
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
      let diff = moment().diff(startedTimeRef.current, 'second');
      if (diff < TOTAL_CALL_DURATION) {
        if (diff > TOTAL_CALL_DURATION) {
          diff = TOTAL_CALL_DURATION;
        } else if (diff < 0) {
          diff = 0;
        }
        if (currentTimeRef.current !== diff) {
          setCurrentTime(diff);
          checkMatchStatus();
        }
      } else {
        cancelMatchRequest();
      }
    }, 1000);
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
          style={styles.headerInnerContainer}
          imageStyle={styles.itemContainer}
          source={lobbyBgDota}
        >
          <ProfileComponent item={{ username: user.userName, team: 'DIRE', avatar: user.userAvatarUrl }} />
          <View style={styles.itemContainer}>
            <Text style={[styles.profileText, styles.fontBig]}>VS</Text>
          </View>
          <ProfileComponent item={{ username: get(match, 'opponent.userName'), avatar: get(match, 'opponent.userAvatarUrl'), team: 'RADIANT' }} />
        </ImageBackground>
        {get(match, 'match.matchStatus') === 'match_ended' && (
          <Text style={[styles.profileText, styles.fontBig, styles.absoluteOne]}>
            DIRE WON
          </Text>
        )}
      </View>
      <View style={styles.searchContainer}>
        <Text style={[styles.profileText, styles.description]}>#GMZLOBBY2973</Text>
        <Text style={[styles.profileText, styles.description]}>DOTA 2 1VS1 | EU | BO1</Text>
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
            buttonVisible={false}
          />
          <PageScreen
            currentTime={currentTime}
            navigation={navigation}
            pageText={`${INVITE_TEXT}${'RADIANT'}`}
            buttonVisible
            sendInviteAgain={acceptMatchRequest}
          />
          <PageScreen
            currentTime={currentTime}
            navigation={navigation}
            pageText={PREPARE_TEXT}
            buttonVisible={false}
          />
          <View style={styles.individualPage}>
            <View style={styles.itemContainer}>
              <Text style={[styles.profileText, styles.matchProgressText]}>
                The Dire | Username #1
              </Text>
              <View style={styles.inProgressContainer}>
                <View style={styles.itemContainer}>
                  <Text style={[styles.profileText, styles.matchProgressText]}>
                    Jakiro
                  </Text>
                  <Image style={styles.heroImage} source={heroTemplate} resizeMode="cover" />
                </View>
                <View style={[styles.itemContainer, styles.pt23]}>
                  <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                    K / D / A
                  </Text>
                  <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                    0 / 10 / 7
                  </Text>
                </View>
                <View style={[styles.itemContainer, styles.pt23]}>
                  <Image style={styles.heroImage} source={heroTemplate} resizeMode="cover" />
                </View>
              </View>
              <View style={styles.seperatorLine} />
              <Text style={[styles.profileText, styles.matchProgressText]}>
                The Radiant | Username #2
              </Text>
              <View style={styles.inProgressContainer}>
                <View style={styles.itemContainer}>
                  <Text style={[styles.profileText, styles.matchProgressText]}>
                    Jakiro
                  </Text>
                  <Image style={styles.heroImage} source={heroTemplate} resizeMode="cover" />
                </View>
                <View style={[styles.itemContainer, styles.pt23]}>
                  <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                    K / D / A
                  </Text>
                  <Text style={[styles.profileText, styles.matchProgressText, styles.fontMedium]}>
                    0 / 10 / 7
                  </Text>
                </View>
                <View style={[styles.itemContainer, styles.pt23]}>
                  <Image style={styles.heroImage} source={heroTemplate} resizeMode="cover" />
                </View>
              </View>
            </View>
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
