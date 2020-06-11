// @flow
import React, { useContext, useCallback, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import {
  get,
} from 'lodash';

import {
  heroTemplate,
  arrowLeft,
  settingsIcon,
  eyeIcon,
  twitchBackground,
} from '../../../../Assets';
import HeaderComponent from '../../../../Components/HeaderComponent';
import styles from './AccountScreen.style';
import { UserContext } from '../../../../contexts';


const listData = [
  {
    image: heroTemplate,
    game: 'Dota 2',
    views: 2500,
    description: 'NOOB DOTA WITH SUBS ONLY',
    title: 'Riki',
    status: '14/6/19',
  },
  {
    image: heroTemplate,
    game: 'Dota 2',
    views: 2500,
    description: 'NOOB DOTA WITH SUBS ONLY',
    title: 'Lich',
    status: '17/2/4',
  },
  {
    image: heroTemplate,
    game: 'Dota 2',
    views: 2500,
    description: 'NOOB DOTA WITH SUBS ONLY',
    title: 'Pudge',
    status: '7/3/29',
  },
  {
    image: heroTemplate,
    game: 'Dota 2',
    views: 2500,
    description: 'NOOB DOTA WITH SUBS ONLY',
    title: 'Lycan',
    status: '6/12/7',
  },
  {
    image: heroTemplate,
    game: 'Dota 2',
    views: 2500,
    description: 'NOOB DOTA WITH SUBS ONLY',
    title: 'Phantom Assasin',
    status: '19/2/14',
  },
];

const horizontalTabs = ['Videos', 'Recent Games', 'Games'];

const AccountScreen = ({ navigation }) => {
  const [user] = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(0);

  const handleGoBack = useCallback(() => {
    const fromScreen = navigation.getParam('from');
    if (fromScreen && fromScreen.length > 0) {
      navigation.navigate(fromScreen);
    } else {
      navigation.navigate('HomeFlow');
    }
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.itemContainer}
    >
      <View style={styles.rowContainer}>
        <Image
          source={{ uri: `${get(user, 'userAvatarUrl')}?${new Date()}` }}
          resizeMode="cover"
          style={styles.videoUserImage}
        />
        <View style={[styles.flexContainer, styles.mh10]}>
          <Text style={styles.tabText}>{get(user, 'userName')}</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.itemStatus}>
              {item.game}
            </Text>
            <Image
              source={eyeIcon}
              resizeMode="contain"
              style={styles.eyeIcon}
            />
            <Text style={styles.itemStatus}>
              {item.views >= 1000
                ? `${(item.views / 1000).toFixed(1)}k`
                : item.views}
            </Text>
          </View>
        </View>
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.heroImage}
        />
      </View>
      <Text style={[styles.accountName, styles.itemHeader]}>
        {item.description}
      </Text>
      <ImageBackground
        style={styles.itemBackground}
        imageStyle={styles.flexContainer}
        source={twitchBackground}
        resizeMode="cover"
      >
        <View style={styles.liveButton}>
          <Text style={[styles.itemStatus, styles.whiteText]}>Live</Text>
        </View>
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
          source={{ uri: `${user.userAvatarUrl}?${new Date()}` }}
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
      <FlatList
        style={styles.flexContainer}
        contentContainerStyle={styles.scrollIntent}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.host}-${index}`}
      />
      {/* <ImageBackground
        style={styles.liveVideo}
        imageStyle={styles.flexContainer}
        resizeMode="cover"
        source={dotaBackground}
      />
      <View style={styles.bottomContainer}>
        <View
          style={styles.headerContainer}
        >
          <Text style={styles.itemHeader}>
            HERO
          </Text>
          <Text style={[styles.itemHeader, styles.itemDescription]}>
            K/D/A
          </Text>
        </View>
        <FlatList
          style={styles.flexContainer}
          contentContainerStyle={styles.scrollIntent}
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.host}-${index}`}
        />
      </View> */}
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
