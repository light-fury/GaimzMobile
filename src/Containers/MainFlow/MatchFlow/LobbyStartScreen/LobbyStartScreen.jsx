// @flow
import React, {
  useState, useRef, useEffect, useCallback, useContext,
} from 'react';
import {
  Text, View, ImageBackground, StatusBar,
  TouchableOpacity, ScrollView, Dimensions,
  Image,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import Modal from 'react-native-modal';
import {
  get, find,
} from 'lodash';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  updateMatchStatus, getMatchStatus, lobbyInvite,
} from '../../../../api';
import { MatchContext, UserContext, LocalizationContext } from '../../../../contexts';
import HeaderComponent from '../../../../Components/HeaderComponent';
import CustomInput from '../../../../Components/CustomInput';
import SocialButton from '../../../../Components/SocialButton';
import ConfirmButton from '../../../../Components/ConfirmButton';
import ProfileComponent from './ProfileScreen';
import PageScreen from './PageScreen';
import MatchSummaryComponent from './MatchSummaryComponent';
import styles from './LobbyStartScreen.style';
import {
  splashBackground, radiantIcon, direIcon, moreIcon, arrowLeft, closeIcon, resendIcon, successMark,
} from '../../../../Assets';
import MatchOneDetailComponent from './MatchOneDetailComponent';
import MatchTeamDetailComponent from './MatchTeamDetailComponent';
import { calcReal, colors } from '../../../../Assets/config';

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
  const [radiantWon, setRadiantWon] = useState(0);
  const [caseNumber, setCaseNumber] = useState(`#GMZLOBBY${get(match, 'match.matchId') || ''}`);
  const [gameName, setGameName] = useState(`#GMZLOBBY${get(match, 'game.gameName') || ''}`);
  const [reportSubject, setSubject] = useState(get(user, 'userName'));
  const [reportDescription, setDescription] = useState('');
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
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
      // const response = await getDummyData(match);
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
        setMatchType(get(response, 'gameType') === '1v1');
        if (get(response, 'stats.dire.players')) {
          updateTeamMembers(get(response, 'stats.dire.players'), 'dire');
          updateTeamMembers(get(response, 'stats.radiant.players'), 'radiant');
        } else {
          updateTeamMembers(get(response, 'stats.dire.players'), 'dire');
          updateTeamMembers(get(response, 'stats.radiant.players'), 'radiant');
        }
        if (get(response, 'stats.radiantWon') === true) {
          setRadiantWon(1);
        } else if (get(response, 'stats.radiantWon') === null) {
          setRadiantWon(0);
        } else {
          setRadiantWon(2);
        }
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

  const showReportModal = useCallback(() => {
    setOptionModalVisible(false);
    setTimeout(() => {
      setCaseNumber(`#GMZLOBBY${get(match, 'match.matchId') || ''}`);
      setGameName(get(match, 'game.gameName') || '');
      setReportModalVisible(true);
    }, 500);
  });

  const showSuccessModal = useCallback(() => {
    setReportModalVisible(false);
    setTimeout(() => {
      setSuccessModalVisible(true);
    }, 500);
  });

  const startTimer = useCallback(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      checkMatchStatus();
    }, 5000);
  });

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
              avatar: matchType ? { uri: `${direPlayer.userAvatarUrl}?${new Date()}` } : direIcon,
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
              avatar: matchType ? { uri: `${radiantPlayer.userAvatarUrl}?${new Date()}` } : radiantIcon,
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
              <ScrollView
                style={styles.flexContainer}
                contentContainerStyle={styles.reportModal}
                showsVerticalScrollIndicator={false}
              >
                <MatchTeamDetailComponent
                  selectedTeam={selectedTeam}
                  teamMember={selectedTeam ? direTeam || [] : radiantTeam || []}
                  radiantWon={radiantWon}
                />
                <MatchSummaryComponent currentPage={currentPage} match={match} />
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </View>
      <Modal
        useNativeDriver
        backdropOpacity={0.2}
        hasBackdrop
        hideModalContentWhileAnimating
        isVisible={optionModalVisible}
        style={styles.modalStyle}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOptionModalVisible(false)}
          style={styles.modalContainer}
        >
          <View style={styles.roundedRect}>
            <View style={styles.modalHeader} />
            <TouchableOpacity onPress={() => showReportModal()} style={styles.modalButton}>
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
      <Modal
        useNativeDriver
        backdropOpacity={0.2}
        hasBackdrop
        hideModalContentWhileAnimating
        isVisible={reportModalVisible}
        style={styles.modalStyle}
      >
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.flexContainer}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setReportModalVisible(false)}
            style={styles.modalContainer}
          >
            <View
              style={[styles.roundedRect, styles.reportModal]}
            >
              <View style={styles.modalHeader} />
              <CustomInput
                label="CASE NUMBER"
                autoCorrect={false}
                disabled
                autoCapitalize="none"
                value={caseNumber}
                onUpdateValue={setCaseNumber}
                borderColor={colors.grayOpacity}
                containerStyle={styles.inputContainer}
              />
              <View style={styles.inputGroup}>
                <CustomInput
                  label="GAME"
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={gameName}
                  onUpdateValue={setGameName}
                  borderColor={colors.grayOpacity}
                  containerStyle={[styles.flexContainer, styles.mr16]}
                />
                <CustomInput
                  label="SUBJECT"
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={reportSubject}
                  onUpdateValue={setSubject}
                  borderColor={colors.grayOpacity}
                  containerStyle={styles.flexContainer}
                  placeholder="Player Name"
                />
              </View>
              <CustomInput
                label="DESCRIPTION"
                autoCorrect={false}
                autoCapitalize="none"
                value={reportDescription}
                onUpdateValue={setDescription}
                borderColor={colors.grayOpacity}
                containerStyle={styles.inputContainer}
                multiline
                inputStyle={styles.descriptionContainer}
                placeholder="Example message..."
              />
              <ConfirmButton
                color={colors.loginColor}
                label={translations['global.send']}
                onClick={() => showSuccessModal()}
                fontStyle={styles.fontSpacing}
              />
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
      <Modal
        useNativeDriver
        backdropOpacity={0.2}
        hasBackdrop
        hideModalContentWhileAnimating
        isVisible={successModalVisible}
        style={styles.modalStyle}
      >
        <View style={styles.successModal}>
          <View style={styles.successInnerContainer}>
            <Image style={[styles.successMark, styles.inputContainer]} source={successMark} resizeMode="contain" />
            <Text
              style={[
                styles.progressText,
                styles.profileText,
                styles.blackText,
              ]}
            >
              Thank you!
            </Text>
            <Text
              style={[
                styles.progressText,
                styles.modalButtonTitle,
                styles.grayText,
                styles.mt8,
              ]}
            >
              {`Your message with Case Number: ${caseNumber} has been received. We get back to you asap. Meanwhile you can check our Discord for live support!`}
            </Text>
          </View>
          <ConfirmButton
            color={colors.loginColor}
            label={translations['global.done']}
            onClick={() => setSuccessModalVisible(false)}
            fontStyle={styles.fontSpacing}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

LobbyStartScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default LobbyStartScreen;
