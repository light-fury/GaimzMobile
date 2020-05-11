import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  Linking,
  StatusBar,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import { isEmpty } from 'lodash';
import queryString from 'query-string';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';
import LoadingComponent from '../../../Components/LoadingComponent';

import styles from './SignUpScreen.style';
import {
  splashBackground,
  appLogo,
  twitchIcon,
  checkIcon,
  eyeIcon,
  closeIcon,
} from '../../../Assets';
import { colors, calcReal, validateEmail } from '../../../Assets/config';
import { signUp, signInWithTwitch } from '../../../api';
import { UserContext } from '../../../contexts';
import { twitchSigninUrl } from '../../../constants/oauth';
import { resetNavigation } from '../../../helpers/navigation';
import { setApiClientHeader } from '../../../constants/api-client';

const SignUpScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useContext(UserContext);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await signUp({
        captcha: 'lol',
        userName: username,
        userEmail: email,
        userPassword: password,
        userPasswordConfirm: password,
      });
      AsyncStorage.setItem('AuthToken', response.authToken);
      setApiClientHeader('Authorization', `Bearer ${response.authToken}`);
      setUser(response.user);
    } catch (err) {
      Alert.alert('Error', 'There was an error signing you up');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenURL = async (params) => {
    if (params.url) {
      const parsedParams = queryString.parse(params.url.split('?')[1]);
      let apiResponse;
      setLoading(true);
      try {
        if (params.url.includes('twitch')) {
          apiResponse = await signInWithTwitch(parsedParams);
        }

        AsyncStorage.setItem('AuthToken', apiResponse.authToken);
        setApiClientHeader('Authorization', `Bearer ${apiResponse.authToken}`);
        setUser(apiResponse.user);
      } catch (err) {
        Alert.alert('Error', 'There was an error signing you in');
      } finally {
        setLoading(false);
      }
    }

    Linking.removeAllListeners('url');
  };

  const twitchSignin = async () => {
    try {
      Linking.addEventListener('url', handleOpenURL);
      Linking.openURL(twitchSigninUrl);
    } catch (err) {
      Alert.alert('Error', 'There was an error signing you up with Twitch');
    }
  };

  useEffect(() => {
    if (!isEmpty(user)) {
      if (user.hasTwitch || user.hasSteam) {
        resetNavigation(navigation, 'MainFlow');
      } else {
        navigation.replace('SocialAccountsScreen');
      }
    }
  }, [user]);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <KeyboardAwareScrollView
        bounces={false}
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
        <View style={styles.topBorderContainer}>
          <View style={styles.topWhiteContainer} />
        </View>
        <ScrollView
          scrollEnabled={false}
          style={styles.absoluteFill}
          contentContainerStyle={styles.scrollInner}
        >
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.instructionText}>Sign up to continue</Text>
          <View style={styles.socialContainer}>
            {/* <SocialButton
            style={[styles.socialButton, { backgroundColor: colors.fbColor }]}
            icon={facebookIcon}
            onClick={() => {
              Alert.alert('FB Login');
            }}
          /> */}
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.lightGray }]}
              icon={twitchIcon}
              onClick={twitchSignin}
            />
            <Text style={[styles.instructionText, { fontSize: calcReal(14) }]}>
              Or use your email account
            </Text>
          </View>
          <CustomInput
            autoCompleteType="username"
            autoCorrect={false}
            label="Username"
            value={username}
            onUpdateValue={setUsername}
            icon={checkIcon}
            iconVisible={username.length > 0}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            autoCompleteType="email"
            autoCorrect={false}
            autoCapitalize="none"
            label="Email"
            value={email}
            onUpdateValue={setEmail}
            icon={validateEmail(email) ? checkIcon : closeIcon}
            iconVisible={email.length > 0}
            borderColor={email.length > 0 && !validateEmail(email)
              ? colors.red : colors.grayOpacity}
            containerStyle={styles.inputContainer}
            onClick={() => !validateEmail(email) && setEmail('')}
          />
          <CustomInput
            label="Password"
            value={password}
            secureTextEntry={!passwordVisible}
            icon={eyeIcon}
            iconVisible={password.length > 0}
            onUpdateValue={setPassword}
            onClick={() => setPasswordVisible(!passwordVisible)}
            borderColor={password.length > 0 && password.length < 8
              ? colors.red : colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.space} />
          <ConfirmButton
            color={colors.signUpColor}
            label="Sign Up"
            onClick={onSubmit}
            disabled={
            isLoading
            || email.length === 0
            || username.length === 0
            || password.length < 8
            || !validateEmail(email)
          }
            containerStyle={styles.mh20}
          />
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label="Already have an account? Login"
            onClick={() => navigation.pop()}
            fontStyle={styles.lightFont}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
      {isLoading && (
        <LoadingComponent />
      )}
    </SafeAreaView>
  );
};

SignUpScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default SignUpScreen;
