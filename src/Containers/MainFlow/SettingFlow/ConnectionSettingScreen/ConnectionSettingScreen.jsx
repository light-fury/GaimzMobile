// @flow
import React, { useContext } from 'react';
import {
  Alert, Text, View, TouchableOpacity, Image, FlatList, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import queryString from 'query-string';
import {
  steamIcon,
  twitchIcon,
  checkWhiteIcon,
  arrowRight,
  arrowLeft,
} from '../../../../Assets';
import SocialButton from '../../../../Components/SocialButton';
import styles from './ConnectionSettingScreen.style';
import { UserContext } from '../../../../contexts';
import { twitchSigninUrl, steamSigninUrl } from '../../../../constants/oauth';
import { signInWithTwitch, signInWithSteam } from '../../../../api';

const renderItem = ({ item, index }) => (
  <TouchableOpacity
    key={index}
    style={styles.itemContainer}
    onPress={item.onPress}
    disabled={item.connected}
  >
    <SocialButton
      style={styles.itemButton}
      iconStyle={styles.itemIcon}
      icon={item.image}
      clickOpacity={2}
    />
    <Text style={[styles.profileName, styles.flexContainer]}>
      {item.title}
    </Text>
    {item.connected ? (
      <View style={styles.arrowConnectedContainer}>
        <Image
          source={checkWhiteIcon}
          resizeMode="contain"
          style={styles.arrowConnectedIcon}
        />
      </View>
    ) : (
      <Image
        source={arrowRight}
        resizeMode="contain"
        style={styles.arrowIcon}
      />
    )}
  </TouchableOpacity>
);

const ConnectionSettingScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);

  const handleOpenURL = async (params) => {
    if (params.url) {
      const parsedParams = queryString.parse(params.url.split('?')[1].replace(/(openid)(.)([a-z_]+)(=)/g, '$1_$3$4'));
      let apiResponse;

      try {
        if (params.url.includes('twitch')) {
          apiResponse = await signInWithTwitch(parsedParams);
        } else {
          apiResponse = await signInWithSteam(parsedParams);
        }

        setUser(apiResponse.user);
      } catch (err) {
        Alert.alert('Error', 'There was an error connecting the account');
      }
    }

    Linking.removeAllListeners('url');
  };

  const connectTwitch = async () => {
    Linking.addEventListener('url', handleOpenURL);
    Linking.openURL(twitchSigninUrl);
  };

  const connectSteam = async () => {
    Linking.addEventListener('url', handleOpenURL);
    Linking.openURL(steamSigninUrl);
  };

  const listData = [
    {
      onPress: connectSteam,
      image: steamIcon,
      title: 'STEAM',
      route: 'AccountSettingScreen',
      connected: get(user, 'apps.steam', false),
    },
    {
      onPress: connectTwitch,
      image: twitchIcon,
      title: 'TWITCH',
      route: 'ConnectionSettingScreen',
      connected: get(user, 'apps.twitch', false),
    },
  ];

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header}>
        <SocialButton
          style={styles.avatarImage}
          iconStyle={styles.headerIcon}
          icon={arrowLeft}
          onClick={() => navigation.pop()}
        />
        <Text style={[styles.flexContainer, styles.profileName]}>
          Back
        </Text>
      </View>
      <Text style={styles.titleText}>Connections</Text>
      <FlatList
        style={styles.flexContainer}
        contentContainerStyle={styles.scrollIntent}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.host}-${index}`}
      />
    </SafeAreaView>
  );
};

ConnectionSettingScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
};

export default ConnectionSettingScreen;
