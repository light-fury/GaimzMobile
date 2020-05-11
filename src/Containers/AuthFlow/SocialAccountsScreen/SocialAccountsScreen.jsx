// @flow
import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import queryString from 'query-string';
import AsyncStorage from '@react-native-community/async-storage';

import ConfirmButton from '../../../Components/ConfirmButton';
import LoadingComponent from '../../../Components/LoadingComponent';

import styles from './SocialAccountsScreen.style';
import {
  splashBackground, appLogo,
} from '../../../Assets';
import { colors } from '../../../Assets/config';
import { resetNavigation } from '../../../helpers/navigation';
import { signInWithTwitch, signInWithSteam } from '../../../api';
import { UserContext } from '../../../contexts';
import { twitchSigninUrl, steamSigninUrl } from '../../../constants/oauth';
import { setApiClientHeader } from '../../../constants/api-client';

const SocialAccountsScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);

  const handleOpenURL = async (params) => {
    if (params.url) {
      const parsedParams = queryString.parse(params.url.split('?')[1].replace(/(openid)(.)([a-z_]+)(=)/g, '$1_$3$4'));
      let apiResponse;
      setLoading(true);
      try {
        if (params.url.includes('twitch')) {
          apiResponse = await signInWithTwitch(parsedParams);
        } else {
          apiResponse = await signInWithSteam(parsedParams);
        }
        AsyncStorage.setItem('AuthToken', apiResponse.authToken);
        setApiClientHeader('Authorization', `Bearer ${apiResponse.authToken}`);
        setUser(apiResponse.user);
      } catch (err) {
        Alert.alert('Error', 'There was an error connecting the account');
      } finally {
        setLoading(false);
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

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <ImageBackground
        style={styles.topContainer}
        source={splashBackground}
        imageStyle={styles.flexStyle}
        resizeMode="cover"
      >
        <Image
          style={styles.logoImage}
          source={appLogo}
          resizeMode="contain"
        />
      </ImageBackground>
      <KeyboardAwareScrollView
        enableOnAndroid
        bounces={false}
        style={styles.absoluteFill}
        contentContainerStyle={styles.scrollInner}
      >
        <Text style={styles.title}>Associate accounts</Text>
        <Text style={styles.instructionText}>For an optimal experience.</Text>
        <View style={styles.space} />
        <View style={styles.space} />
        <ConfirmButton
          color={colors.steamBlack}
          label={user.apps.steam ? 'Steam is connected' : 'Connect Steam'}
          onClick={connectSteam}
          containerStyle={styles.mh20}
          disabled={user.apps.steam}
        />
        <View style={styles.space} />
        <ConfirmButton
          color={colors.twitchPurple}
          label={user.apps.twitch ? 'Twitch is connected' : 'Connect Twitch'}
          onClick={connectTwitch}
          containerStyle={styles.mh20}
          disabled={user.apps.twitch}
        />
        <View style={styles.flexStyle} />
        <ConfirmButton
          color={colors.signUpColor}
          label={user.apps.steam && user.apps.twitch ? 'Continue' : 'Skip this step'}
          onClick={() => resetNavigation(navigation, 'MainFlow')}
          containerStyle={styles.mh20}
        />
        <View style={styles.space} />
        {(!user.apps.steam || !user.apps.twitch) && (
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label="Don’t worry, you’ll be able to add them in your profile"
            fontStyle={styles.lightFont}
            disabled
          />
        )}
      </KeyboardAwareScrollView>
      {isLoading && (
        <LoadingComponent />
      )}
    </SafeAreaView>
  );
};

SocialAccountsScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default SocialAccountsScreen;
