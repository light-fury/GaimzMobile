// @flow
import React, { useState, useRef, useEffect } from 'react';
import {
  Text, View, ImageBackground, StatusBar,
  Image, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import ProgressCircle from 'react-native-progress-circle';
import moment from 'moment';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './LobbyStartScreen.style';
import { colors, calcReal } from '../../../../Assets/config';
import {
  lobbyBgDota, profileTempDota,
  arrowRight, heroTemplate,
} from '../../../../Assets';

const { width } = Dimensions.get('window');

const WAIT_TEXT = 'GAIMZ BOT PREPARING LOBBY';
const INVITE_TEXT = 'INVITE SEND\nYOU ARE DIRE';
const PREPARE_TEXT = 'GETTING\nMATCH DATA';
const TOTAL_CALL_DURATION = 60;

const ProfileComponent = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.profileText}>{item.team}</Text>
    <Image source={profileTempDota} style={styles.profileImage} resizeMode="cover" />
    <Text style={[styles.profileText, styles.mt8]}>{item.username}</Text>
  </View>
);

const PageScreen = ({
  currentTime, navigation, pageText, buttonVisible,
}) => (
  <View style={styles.individualPage}>
    <View style={[styles.itemContainer, !buttonVisible && styles.hideConfirm]}>
      <ProgressCircle
        percent={(currentTime / TOTAL_CALL_DURATION) * 100}
        radius={calcReal(85)}
        borderWidth={calcReal(6)}
        color={colors.loginColor}
        shadowColor={colors.grayBackground}
        bgColor={colors.secondary}
      >
        <Text style={[styles.profileText, styles.progressText]}>
          {pageText}
        </Text>
      </ProgressCircle>
    </View>
    {buttonVisible && (
    <ConfirmButton
      color={colors.loginColor}
      label="SEND INVITE AGAIN"
      onClick={() => navigation.pop()}
      fontStyle={styles.fontSpacing}
      containerStyle={styles.mh70}
    />
    )}

  </View>
);

const LobbyStartScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [startedTime, setStartTime] = useState(moment());
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef();
  const currentPageRef = useRef();
  const startedTimeRef = useRef();
  const currentTimeRef = useRef();
  currentPageRef.current = currentPage;
  startedTimeRef.current = startedTime;
  currentTimeRef.current = currentTime;

  const onPageChanged = (offset) => {
    if (currentPageRef.current === 0 && offset === -1) {
      navigation.popToTop();
    } else {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: width * (currentPageRef.current + offset), y: 0 });
      }
      setCurrentPage(currentPageRef.current + offset);
      setStartTime(moment());
      setCurrentTime(0);
      if (currentPage.current === 2 && offset === 1) {
        clearInterval(intervalId);
      }
    }
  };

  const startTimer = () => {
    BackgroundTimer.start();
    const interval = setInterval(() => {
      let diff = moment().diff(startedTimeRef.current, 'second');
      if (diff < TOTAL_CALL_DURATION) {
        if (diff > TOTAL_CALL_DURATION) {
          diff = TOTAL_CALL_DURATION;
        } else if (diff < 0) {
          diff = 0;
        }
        if (currentTimeRef.current !== diff) {
          setCurrentTime(diff);
        }
      } else {
        onPageChanged(-1);
      }
      if (diff >= 60) {
        onPageChanged(-1);
      }
    }, 1000);
    setIntervalId(interval);
    BackgroundTimer.stop();
  };

  useEffect(() => {
    startTimer();

    setTimeout(() => {
      onPageChanged(1);
    }, 5000);

    setTimeout(() => {
      onPageChanged(1);
    }, 10000);

    setTimeout(() => {
      onPageChanged(1);
    }, 15000);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
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
          <ProfileComponent item={{ username: 'USERNAME', team: 'DIRE' }} />
          <View style={styles.itemContainer}>
            <Text style={[styles.profileText, styles.fontBig]}>VS</Text>
          </View>
          <ProfileComponent item={{ username: 'USERNAME', team: 'RADIANT' }} />
        </ImageBackground>
        <Text style={[styles.profileText, styles.fontBig, styles.absoluteOne]}>
          DIRE WON
        </Text>
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
            pageText={INVITE_TEXT}
            buttonVisible
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
      {/* <ConfirmButton
        color={colors.loginColor}
        label="CANCEL"
        onClick={() => navigation.pop()}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
      />
      <View style={styles.space} />
      <ConfirmButton
        borderColor={colors.secondaryOpacity}
        textColor={colors.grayText}
        label="SETTINGS"
        onClick={() => navigation.popToTop()}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
      /> */}
    </SafeAreaView>
  );
};

LobbyStartScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default LobbyStartScreen;
