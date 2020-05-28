// @flow
import React, {
  useState, useRef, useEffect, useCallback, useContext,
} from 'react';
import {
  Text, View, ImageBackground, StatusBar,
  TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import Modal from 'react-native-modal';
import {
  get, find,
} from 'lodash';

import { updateMatchStatus, getMatchStatus, lobbyInvite } from '../../../../api';
import { MatchContext, UserContext, LocalizationContext } from '../../../../contexts';
import HeaderComponent from '../../../../Components/HeaderComponent';
import SocialButton from '../../../../Components/SocialButton';
import ProfileComponent from './ProfileScreen';
import PageScreen from './PageScreen';
import MatchSummaryComponent from './MatchSummaryComponent';
import styles from './LobbyStartScreen.style';
import {
  splashBackground, radiantIcon, direIcon, moreIcon, arrowLeft, closeIcon, resendIcon,
} from '../../../../Assets';
import MatchOneDetailComponent from './MatchOneDetailComponent';
import MatchTeamDetailComponent from './MatchTeamDetailComponent';
import { calcReal } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

const targetMatchStatus = [
  'match_accepted',
  'invites_sent',
  'match_started',
  'match_ended',
];

const LobbyStartScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [user] = useContext(UserContext);
  const { translations } = useContext(LocalizationContext);
  const [matchType, setMatchType] = useState(get(match, 'match.gameType') === '1v1');
  const [direPlayer, setDirePlayer] = useState(user);
  const [radiantPlayer, setRadiantPlayer] = useState(get(match, 'opponent'));
  const [direTeam, setDireTeam] = useState();
  const [selectedTeam, setSelectedTeam] = useState(true);
  const [radiantTeam, setRadiantTeam] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const scrollViewRef = useRef();

  const onPageChanged = useCallback((offset) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * (offset <= 2 ? 0 : 1), y: 0 });
    }
    setCurrentPage(offset);
  }, [scrollViewRef]);

  const acceptMatchRequest = useCallback(async () => {
    try {
      const params = {
        matchId: get(match, 'match.matchId'),
      };
      await lobbyInvite(params);
    } catch (err) {
      //
    } finally {
      setOptionModalVisible(false);
    }
  }, [match]);

  const cancelMatchRequest = useCallback(async (updateApi) => {
    try {
      if (updateApi) {
        const params = {
          acceptMatch: false,
        };
        await updateMatchStatus(get(match, 'match.matchId'), params);
      }

      setMatch({});
      BackgroundTimer.stopBackgroundTimer();
      setTimeout(() => {
        navigation.popToTop();
      }, 250);
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
  }, [user, match]);

  const checkMatchStatus = useCallback(async () => {
    try {
      const response = await getMatchStatus(get(match, 'match.matchId'));
      if (response && response.matchStatus === 'match_cancelled') {
        cancelMatchRequest(false);
        return;
      }
      if (response) {
        const offset = targetMatchStatus.findIndex((item) => item === response.matchStatus);
        if (offset < 0) {
          cancelMatchRequest(true);
          return;
        }
        setMatch({
          ...match,
          match: response,
        });
        //  console.log(JSON.stringify(match));
        setMatchType(get(response, 'gameType') === '1v1');
        updateTeamMembers(get(response, 'stats.dire.players'), 'dire');
        updateTeamMembers(get(response, 'stats.radiant.players'), 'radiant');
        if (get(response, 'stats.dire.players[0].heroAvatarUrl')) {
          onPageChanged(3);
          return;
        }
        if (currentPage === offset) {
          return;
        }
        if (offset !== 2 && offset !== 3) {
          onPageChanged(offset);
        } else {
          onPageChanged(2);
        }
      }
    } catch (err) {
      //
    }
  }, [match, currentPage, targetMatchStatus, updateTeamMembers]);

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
      <StatusBar barStyle="dark-content" />
      <HeaderComponent
        label={translations['match.setting.title']}
        rightIcon={moreIcon}
        rightStyle={styles.rightButton}
        rightClick={() => setOptionModalVisible(true)}
        leftIcon={arrowLeft}
        leftClick={() => cancelMatchRequest(true)}
        leftIconStyle={styles.headerIcon}
      />
      {currentPage <= 2 && (
        <View style={[styles.joinHeader, !matchType && styles.mb0]}>
          <Text style={styles.joinText}>{`JOIN ${'DIRE'}`}</Text>
        </View>
      )}
      <ImageBackground
        style={styles.profileContainer}
        imageStyle={styles.itemContainer}
        source={splashBackground}
        resizeMode="cover"
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
          <Text style={[styles.profileText, styles.fontBig]}>VS</Text>
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
      </ImageBackground>
      <View style={styles.flexContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.flexContainer}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          <PageScreen
            matchType={matchType}
            navigation={navigation}
            match={match}
            direPlayer={direPlayer}
            radiantPlayer={radiantPlayer}
            selectedTeam={selectedTeam}
            direTeam={direTeam}
            radiantTeam={radiantTeam}
            currentPage={currentPage}
          />
          {/* <PageScreen
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
          /> */}
          <View style={styles.individualPage}>
            {matchType && (
              <View style={styles.flexContainer}>
                <View style={styles.flexRow}>
                  <Text style={[styles.profileText, styles.matchProgressText, styles.alignLeft]}>
                    {direPlayer.userName}
                  </Text>
                  <Text
                    style={[
                      styles.profileText,
                      styles.matchProgressText,
                      styles.alignLeft,
                      styles.teamTitleText,
                    ]}
                  >
                    Radiant
                  </Text>
                </View>
                <MatchOneDetailComponent
                  teamMember={radiantTeam ? radiantTeam[0] : radiantPlayer}
                />
                <View style={styles.flexRow}>
                  <Text style={[styles.profileText, styles.matchProgressText, styles.alignLeft]}>
                    {direPlayer.userName}
                  </Text>
                  <Text
                    style={[
                      styles.profileText,
                      styles.matchProgressText,
                      styles.alignLeft,
                      styles.teamTitleText,
                    ]}
                  >
                    Dire
                  </Text>
                </View>
                <MatchOneDetailComponent teamMember={direTeam ? direTeam[0] : direPlayer} />
                <MatchSummaryComponent currentPage={currentPage} match={match} />
              </View>
            )}
            {!matchType && direTeam && radiantTeam && (
              <View style={styles.teamItemContainer}>
                <MatchTeamDetailComponent teamMember={selectedTeam ? direTeam : radiantTeam} />
                <MatchSummaryComponent match={match} />
              </View>
            )}
          </View>
        </ScrollView>
        {/* <TouchableOpacity style={styles.reportContainer}>
          <Text style={styles.profileText}>REPORT ISSUE</Text>
          <Image source={arrowRight} style={styles.arrowImage} resizeMode="contain" />
        </TouchableOpacity> */}
      </View>
      <Modal
        useNativeDriver
        backdropOpacity={0.2}
        hasBackdrop
        hideModalContentWhileAnimating
        isVisible={optionModalVisible}
        style={styles.modalStyle}
        collapsable
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOptionModalVisible(false)}
          style={styles.modalContainer}
        >
          <View style={styles.roundedRect}>
            <View style={styles.modalHeader} />
            <TouchableOpacity style={styles.modalButton}>
              <SocialButton
                clickOpacity={2}
                style={styles.modalButtonIconContainer}
                iconStyle={styles.modalButtonIcon}
                icon={closeIcon}
              />
              <View>
                <Text style={styles.modalButtonTitle}>Report Match</Text>
                <Text style={styles.modalButtonDescription}>Something wrong? Report here.</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => acceptMatchRequest()} style={styles.modalButton}>
              <SocialButton
                clickOpacity={2}
                style={styles.modalButtonIconContainer}
                iconStyle={styles.modalButtonIcon}
                icon={resendIcon}
              />
              <View>
                <Text style={styles.modalButtonTitle}>Resend Invite Dota2</Text>
                <Text style={styles.modalButtonDescription}>
                  Click here to resend an bot invite.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

LobbyStartScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default LobbyStartScreen;
