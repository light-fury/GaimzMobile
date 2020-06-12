// @flow
import React, { useContext } from 'react';
import {
  Alert, Text, View, TouchableOpacity, FlatList, Linking, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import queryString from 'query-string';
import {
  steamIcon,
  twitchIcon,
  checkWhiteIcon,
  arrowLeft,
  editIcon,
} from '../../../../Assets';
import SocialButton from '../../../../Components/SocialButton';
import styles from './ConnectionSettingScreen.style';
import { UserContext } from '../../../../contexts';
import { twitchSigninUrl, steamSigninUrl } from '../../../../constants/oauth';
import { signInWithTwitch, signInWithSteam } from '../../../../api';
import HeaderComponent from '../../../../Components/HeaderComponent';

const renderItem = ({ item, index }) => (
  <TouchableOpacity
    key={index}
    style={styles.itemContainer}
    onPress={item.onPress}
  >
    <SocialButton
      style={styles.itemImage}
      iconStyle={styles.platformIcon}
      icon={item.image}
      clickOpacity={2}
    />
    <View style={styles.flexContainer}>
      <Text style={styles.headerNameText}>
        {item.connected ? 'Connected' : 'Connect'}
      </Text>
      <Text style={styles.itemDescriptionText}>
        {item.title}
      </Text>
    </View>
    <SocialButton
      style={item.connected ? styles.connectedButton : styles.itemButton}
      iconStyle={item.connected ? styles.connectedIcon : styles.itemIcon}
      icon={item.connected ? checkWhiteIcon : editIcon}
      clickOpacity={2}
    />
  </TouchableOpacity>
);

const ConnectionSettingScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);

  // TODO: Extract due to code duplication
  const handleOpenURL = async (params) => {
    if (params.url) {
      const parsedParams = queryString.parse(params.url.split('?')[1].replace(/(openid)(.)([a-z_]+)(=)/g, '$1_$3$4'));
      let userResponse;

      try {
        if (params.url.includes('twitch')) {
          userResponse = await signInWithTwitch(parsedParams);
        } else {
          userResponse = await signInWithSteam(parsedParams);
        }

        setUser(userResponse);
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
      title: 'Steam',
      connected: get(user, 'apps.steam', false),
    },
    {
      onPress: connectTwitch,
      image: twitchIcon,
      title: 'Twitch',
      connected: get(user, 'apps.twitch', false),
    },
  ];

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <HeaderComponent
        leftIcon={arrowLeft}
        leftClick={() => navigation.goBack()}
        leftIconStyle={styles.headerLeftIcon}
      >
        <View style={styles.headerContainer}>
          <ImageBackground source={{ uri: user.userAvatarUrl || '' }} style={styles.avatarImage} imageStyle={styles.flexContainer}>
            <View style={styles.onlineStatus} />
          </ImageBackground>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerNameText}>{user.userName}</Text>
            <Text style={[styles.headerNameText, styles.grayText]}>Online</Text>
          </View>
        </View>
      </HeaderComponent>
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
