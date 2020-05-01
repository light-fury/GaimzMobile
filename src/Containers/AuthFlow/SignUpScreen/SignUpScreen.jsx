import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  Linking,
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

import styles from './SignUpScreen.style';
import {
  splashBackground,
  appLogo,
  twitchIcon,
  checkIcon,
  closeIcon,
  eyeIcon,
} from '../../../Assets';
import { colors, calcReal } from '../../../Assets/config';
import { signUp, signInWithTwitch } from '../../../api';
import { UserContext } from '../../../contexts';
import { twitchSigninUrl } from '../../../constants/oauth';
import { resetNavigation } from '../../../helpers/navigation';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useContext(UserContext);

  const onSubmit = async () => {
    try {
      const response = await signUp({
        captcha: 'lol',
        userName: username,
        userEmail: email,
        userPassword: password,
        userPasswordConfirm: password,
      });
      AsyncStorage.setItem('AuthToken', response.authToken);
      setUser(response.user);
    } catch (err) {
      Alert.alert('Error', 'There was an error signing you up');
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
          <Text style={[styles.instructionText, { fontSize: calcReal(12) }]}>
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
          autoCapitalize={false}
          label="Email"
          value={email}
          onUpdateValue={setEmail}
          icon={closeIcon}
          iconVisible={email.length > 0}
          borderColor={email.length > 0 ? colors.red : colors.grayOpacity}
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
        <View style={styles.space} />
        <ConfirmButton
          color={colors.signUpColor}
          label="Sign Up"
          onClick={onSubmit}
          containerStyle={styles.mh20}
        />
        <ConfirmButton
          borderColor={colors.transparent}
          textColor={colors.gray}
          label="Already have an account? Login"
          onClick={() => navigation.pop()}
          fontStyle={styles.lightFont}
        />
      </KeyboardAwareScrollView>
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
