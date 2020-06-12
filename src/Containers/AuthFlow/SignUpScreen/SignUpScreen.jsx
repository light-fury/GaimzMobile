import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  Linking,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from 'lodash';
import queryString from 'query-string';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';
import LoadingComponent from '../../../Components/LoadingComponent';

import styles from './SignUpScreen.style';
import {
  splashBackground,
  splashLogo,
  twitchIcon,
  checkIcon,
  eyeIcon,
  eyeCloseIcon,
  // facebookIcon,
  closeIcon,
  // googleIcon,
} from '../../../Assets';
import { colors, validateEmail } from '../../../Assets/config';
import { signUp, signInWithTwitch } from '../../../api';
import { UserContext, LocalizationContext } from '../../../contexts';
import { twitchSigninUrl } from '../../../constants/oauth';
import { resetNavigation } from '../../../helpers/navigation';

const SignUpScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useContext(UserContext);
  const { translations } = useContext(LocalizationContext);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const signedUpUser = await signUp({
        captcha: 'lol',
        userName: username,
        userEmail: email,
        userPassword: password,
        userPasswordConfirm: password,
      });

      setUser(signedUpUser);
    } catch (err) {
      Alert.alert(translations['alert.error.title'], translations['alert.error.signin']);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Extract due to code duplication
  const handleOpenURL = async (params) => {
    if (params.url) {
      const parsedParams = queryString.parse(params.url.split('?')[1]);
      setLoading(true);
      try {
        if (params.url.includes('twitch')) {
          const signedInUser = await signInWithTwitch(parsedParams);
          setUser(signedInUser);
        }
      } catch (err) {
        Alert.alert(translations['alert.error.title'], translations['alert.error.signin']);
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
      Alert.alert(translations['alert.error.title'], translations['alert.error.signin.twitch']);
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
            source={splashLogo}
            resizeMode="contain"
          />
        </ImageBackground>
        <View
          style={styles.absoluteFill}
        >
          <Text style={styles.title}>
            {translations['welcome.title']}
          </Text>
          <Text style={styles.instructionText}>
            {translations['signup.description']}
          </Text>
          <View style={styles.socialContainer}>
            {/* <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.fbColor }]}
              icon={facebookIcon}
              iconStyle={styles.iconStyle}
              onClick={() => {}}
            /> */}
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.steamBlack }]}
              icon={twitchIcon}
              iconStyle={styles.iconStyle}
              onClick={twitchSignin}
            />
            {/* <SocialButton
              style={[
                styles.socialButton,
                styles.googleContainer,
              ]}
              icon={googleIcon}
              iconStyle={styles.googleIconStyle}
              onClick={() => {}}
            /> */}
          </View>
          <Text style={[styles.instructionText, styles.extraInstruction]}>
            {translations['welcome.login.email']}
          </Text>
          <CustomInput
            autoCompleteType="username"
            autoCorrect={false}
            label={translations['global.name']}
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
            label={translations['global.email']}
            value={email}
            onUpdateValue={setEmail}
            icon={validateEmail(email) ? checkIcon : closeIcon}
            iconVisible={email.length > 0}
            borderColor={email.length > 0 && !validateEmail(email)
              ? colors.redOpacity : colors.grayOpacity}
            containerStyle={styles.inputContainer}
            onClick={() => !validateEmail(email) && setEmail('')}
            errorText={translations['global.invalid.email']}
          />
          <CustomInput
            label={translations['global.password']}
            value={password}
            secureTextEntry={!passwordVisible}
            icon={passwordVisible ? eyeCloseIcon : eyeIcon}
            iconVisible={password.length > 0}
            onUpdateValue={setPassword}
            onClick={() => setPasswordVisible(!passwordVisible)}
            borderColor={password.length > 0 && password.length < 8
              ? colors.redOpacity : colors.grayOpacity}
            containerStyle={styles.inputContainer}
            errorText={translations['global.invalid.password']}
          />
          <ConfirmButton
            color={colors.secondary}
            label={translations['welcome.create']}
            onClick={onSubmit}
            disabled={
              isLoading
              || email.length === 0
              || username.length === 0
              || password.length < 8
              || !validateEmail(email)
            }
          />
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label={translations['signup.login']}
            onClick={() => navigation.pop()}
            fontStyle={styles.lightFont}
          />
        </View>
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
