import React, { useContext, useState, useEffect } from 'react';
import {
  Alert,
  Text,
  View,
  ImageBackground,
  Image,
  Linking,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import queryString from 'query-string';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';

import styles from './WelcomeScreen.style';
import {
  splashBackground,
  appLogo,
  twitchIcon,
  checkIcon,
  eyeIcon,
} from '../../../Assets';
import { colors, calcReal } from '../../../Assets/config';
import { signIn, signInWithTwitch, checkToken } from '../../../api';
import { UserContext } from '../../../contexts';
import { twitchSigninUrl } from '../../../constants/oauth';
import { resetNavigation } from '../../../helpers/navigation';
import { setApiClientHeader } from '../../../constants/api-client';

const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [, setUser] = useContext(UserContext);

  const initUser = async () => {
    try {
      // To sign out while it isn't implemented
      // await AsyncStorage.removeItem('AuthToken');
      const token = await AsyncStorage.getItem('AuthToken');

      if (token) {
        setApiClientHeader('Authorization', `Bearer ${token}`);
        const data = await checkToken();
        setUser(data.user);
        resetNavigation(navigation, 'MainFlow');
      } else {
        setUser({});
      }
    } catch (err) {
      setUser({});
    }
  };

  const onSubmit = async () => {
    try {
      const response = await signIn({
        userEmail: email,
        userPassword: password,
      });

      AsyncStorage.setItem('AuthToken', response.authToken);
      setUser(response.user);
      resetNavigation(navigation, 'MainFlow');
    } catch (err) {
      Alert.alert('Error', 'There was an error signing you in');
    }
  };

  const handleOpenURL = async (params) => {
    if (params.url) {
      const parsedParams = queryString.parse(params.url.split('?')[1]);
      let apiResponse;

      try {
        if (params.url.includes('twitch')) {
          apiResponse = await signInWithTwitch(parsedParams);
        }

        AsyncStorage.setItem('AuthToken', apiResponse.authToken);
        setUser(apiResponse.user);
        resetNavigation(navigation, 'MainFlow');
      } catch (err) {
        Alert.alert('Error', 'There was an error signing you in');
      }
    }

    Linking.removeAllListeners('url');
  };

  const twitchSignin = async () => {
    try {
      Linking.addEventListener('url', handleOpenURL);
      Linking.openURL(twitchSigninUrl);
    } catch (err) {
      Alert.alert('Error', 'There was an error signing you in with Twitch');
    }
  };

  useEffect(() => {
    initUser();
  }, []);

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
        style={styles.absoluteFill}
        contentContainerStyle={styles.scrollInner}
        extraScrollHeight={calcReal(50)}
      >
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.instructionText}>
          Login your account to continue
        </Text>
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
          <Text style={[styles.instructionText, { fontSize: calcReal(12) }]}>
            Or use your email account
          </Text>
        </View>
        <CustomInput
          autoCorrect={false}
          autoCapitalize={false}
          autoCompleteType="email"
          label="Email"
          value={email}
          onUpdateValue={setEmail}
          icon={checkIcon}
          iconVisible={email.length > 0}
          containerStyle={styles.inputContainer}
        />
        <CustomInput
          label="Password"
          value={password}
          secureTextEntry={!passwordVisible}
          icon={eyeIcon}
          iconVisible={password.length > 0}
          onUpdateValue={setPassword}
          onClick={() => setPasswordVisible(!passwordVisible)}
          containerStyle={styles.inputContainer}
        />
        <ConfirmButton
          color={colors.loginColor}
          label="Login"
          onClick={onSubmit}
        />
        <ConfirmButton
          borderColor={colors.transparent}
          textColor={colors.gray}
          label="Forgot password?"
          onClick={() => navigation.navigate('ForgotPasswordScreen')}
          fontStyle={styles.lightFont}
        />
        <View style={styles.space} />
        <ConfirmButton
          borderColor={colors.secondaryOpacity}
          textColor={`${colors.secondary}70`}
          label="Create an account"
          onClick={() => navigation.navigate('SignUpScreen')}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

WelcomeScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default WelcomeScreen;
