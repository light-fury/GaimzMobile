/* eslint-disable array-callback-return */
// @flow
import React, {
  useContext, useCallback, useState, useEffect, useRef,
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import SafeAreaView from 'react-native-safe-area-view';
import {
  get,
} from 'lodash';

import {
  dotaApp,
  arrowLeft,
  settingsIcon,
  eyeIcon,
  twitchBackground,
} from '../../../../Assets';
import HeaderComponent from '../../../../Components/HeaderComponent';
import styles from './AccountScreen.style';
import { UserContext } from '../../../../contexts';
import { getRecentMatches, getRecentVideos } from '../../../../api';

const { width } = Dimensions.get('window');

const horizontalTabs = ['Videos', 'Matches'];
const tempItems = ['', '', '', '', '', ''];

const AccountScreen = ({ navigation }) => {
  const [user] = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [recentVideos, setRecentVideos] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * currentTab, y: 0 });
    }
  }, [currentTab]);

  const handleGoBack = useCallback(() => {
    const fromScreen = navigation.getParam('from');
    if (fromScreen && fromScreen.length > 0) {
      navigation.navigate(fromScreen);
    } else {
      navigation.navigate('HomeFlow');
    }
  });

  const initRecentMatches = async () => {
    try {
      const response = await getRecentMatches(get(user, 'userId'));
      if (response && response.length > 0) {
        const finishedMatches = response.filter((item) => item.matchStatus === 'match_ended');
        const matchResults = [];
        finishedMatches.map((item) => {
          let radiantWon = get(item, 'stats.radiantWon') || false;
          if (get(item, 'stats.teamWon') === 1) {
            radiantWon = true;
          }
          const teams = get(item, 'stats.teams') || [];
          if (teams.length >= 2) {
            let targetPlayer = (get(teams[0], 'players') || []).find(((subItem) => subItem.userId === get(user, 'userId')));
            if (!targetPlayer) {
              targetPlayer = (get(teams[1], 'players') || []).find(((subItem) => subItem.userId === get(user, 'userId')));
              targetPlayer.won = radiantWon === (teams[1].name === 'Radiant');
            } else {
              targetPlayer.won = radiantWon === (teams[0].name === 'Radiant');
            }
            matchResults.push(targetPlayer);
          }
        });
        setRecentMatches(matchResults);
      }
    } catch (err) {
      // Ignore
    }
  };

  const initTwitchVideos = async () => {
    try {
      const twitchId = get(user, 'apps.twitch') || '';
      if (twitchId.length > 0) {
        const response = await getRecentVideos(twitchId);
        setRecentVideos(response);
      }
    } catch (err) {
      // Ignore
    }
  };

  useEffect(() => {
    initRecentMatches();
    initTwitchVideos();
  }, []);

  const renderMatchResult = ({ item }) => {
    const memberItems = [...(get(item, 'items') || []), ...tempItems];
    return (
      <View
        key={item.heroName}
        style={[styles.userInnerContainer, item.won && styles.greenBorderStyle]}
      >
        <View style={[styles.headerItemContainer, styles.flex3]}>
          <FastImage
            style={styles.matchHeroImage}
            source={{ uri: get(item, 'heroAvatarUrl') }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={[styles.headerItemContainer, styles.flex2]}>
          <Text style={styles.matchItemDetails}>
            {`${get(item, 'kills')} / ${get(item, 'deaths')} / ${get(item, 'assists')}`}
          </Text>
        </View>
        <View style={[styles.headerItemContainer, styles.flex2]}>
          <Text style={styles.matchItemDetails}>
            {`${get(item, 'gpm')}`}
          </Text>
        </View>
        <View style={[styles.headerItemContainer, styles.flex2]}>
          <Text style={styles.matchItemDetails}>
            {`${get(item, 'lasthits')} / ${get(item, 'denies')}`}
          </Text>
        </View>
        <View style={[styles.headerItemContainer, styles.flex3]}>
          <View style={[styles.matchRowContainer, styles.mb4]}>
            {memberItems.slice(0,
              (memberItems.length > 3 ? 3 : memberItems.length)).map((subItem, index) => (
                <View
                  key={`dire ${subItem}${index + 1}`}
                  style={styles.heroItemImageContainer}
                >
                  {subItem.length > 0 && (
                  <FastImage
                    style={styles.heroItemImage}
                    source={{ uri: subItem || '' }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  )}
                </View>
            ))}
          </View>
          <View style={styles.matchRowContainer}>
            {memberItems.length > 3 && memberItems.slice(3, 6).map((subItem, index) => (
              <View
                key={`dire ${subItem}${index + 4}`}
                style={styles.heroItemImageContainer}
              >
                {subItem.length > 0 && (
                <FastImage
                  style={styles.heroItemImage}
                  source={{ uri: subItem || '' }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('TwitchDetailScreen', { item })}
    >
      <View style={styles.rowContainer}>
        <Image
          source={{ uri: get(user, 'userAvatarUrl') }}
          resizeMode="cover"
          style={styles.videoUserImage}
        />
        <View style={[styles.flexContainer, styles.mh10]}>
          <Text style={styles.tabText}>{get(user, 'userName')}</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.itemStatus}>
              Dota 2
            </Text>
            <Image
              source={eyeIcon}
              resizeMode="contain"
              style={styles.eyeIcon}
            />
            <Text style={styles.itemStatus}>
              {item.twitchViewerCount >= 1000
                ? `${(item.twitchViewerCount / 1000).toFixed(1)}k`
                : item.twitchViewerCount}
            </Text>
          </View>
        </View>
        <Image
          source={dotaApp}
          resizeMode="cover"
          style={styles.heroImage}
        />
      </View>
      <Text style={[styles.accountName, styles.itemHeader]}>
        {item.twitchTitle}
      </Text>
      <ImageBackground
        style={styles.itemBackground}
        imageStyle={styles.flexContainer}
        source={
          (item.twitchThumbnailUrl || '').length > 0
            ? { uri: item.twitchThumbnailUrl || '' }
            : twitchBackground
        }
        defaultSource={twitchBackground}
        resizeMode="cover"
      >
        {item.twitchType === 'live' && (
          <View style={styles.liveButton}>
            <Text style={[styles.itemStatus, styles.whiteText]}>Live</Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <HeaderComponent
        rightIcon={settingsIcon}
        rightStyle={styles.rightButton}
        rightIconStyle={styles.rightIcon}
        rightClick={() => navigation.navigate('SettingMainScreen')}
        leftIcon={arrowLeft}
        leftClick={() => handleGoBack()}
        leftStyle={styles.leftButton}
        outContainer={styles.headerComponent}
        innerContainer={styles.headerInnerComponent}
      />
      <View style={styles.userContainer}>
        <Image
          source={{ uri: user.userAvatarUrl }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
        <Text style={styles.userName}>
          {user.userName}
        </Text>
        <Text style={styles.accountName}>
          {`@${user.userName}`}
        </Text>
      </View>
      <View
        style={styles.horizontalScrollView}
      >
        <ScrollView horizontal contentContainerStyle={styles.horizontalInnerStyle}>
          {horizontalTabs.map((item, index) => (
            <TouchableOpacity
              onPress={() => setCurrentTab(index)}
              style={styles.horizontalTab}
            >
              <Text style={[styles.tabText, index !== currentTab && styles.grayText]}>
                {item}
              </Text>
              <View style={[styles.tabDot, index !== currentTab && styles.transparentBackground]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
      >
        <FlatList
          style={styles.listView}
          contentContainerStyle={styles.scrollIntent}
          data={recentVideos}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.host}-${index}`}
        />
        <View style={styles.listView}>
          <View style={styles.teamDetailHeader}>
            <View style={[styles.headerItemContainer, styles.flex3]}>
              <Text style={styles.teamDetailHeaderText}>HERO</Text>
            </View>
            <View style={[styles.headerItemContainer, styles.flex2]}>
              <Text style={styles.teamDetailHeaderText}>K/D/A</Text>
            </View>
            <View style={[styles.headerItemContainer, styles.flex2]}>
              <Text style={styles.teamDetailHeaderText}>GPM</Text>
            </View>
            <View style={[styles.headerItemContainer, styles.flex2]}>
              <Text style={styles.teamDetailHeaderText}>LH</Text>
            </View>
            <View style={[styles.headerItemContainer, styles.flex3]}>
              <Text style={styles.teamDetailHeaderText}>ITEMS</Text>
            </View>
          </View>
          <FlatList
            style={styles.listView}
            contentContainerStyle={styles.scrollIntent}
            data={recentMatches}
            renderItem={renderMatchResult}
            keyExtractor={(item, index) => `${item.heroName}-${index}`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

AccountScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default AccountScreen;
