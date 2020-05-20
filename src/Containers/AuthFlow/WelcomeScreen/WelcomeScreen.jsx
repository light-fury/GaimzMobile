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
import queryString from 'query-string';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';
import LoadingComponent from '../../../Components/LoadingComponent';

import styles from './WelcomeScreen.style';
import {
  splashBackground,
  splashLogo,
  twitchIcon,
  checkIcon,
  eyeIcon,
  closeIcon,
  facebookIcon,
  eyeCloseIcon,
  googleIcon,
} from '../../../Assets';
import { colors, validateEmail } from '../../../Assets/config';
import { signIn, signInWithTwitch, attemptRefreshUser } from '../../../api';
import { UserContext, LocalizationContext } from '../../../contexts';
import { twitchSigninUrl } from '../../../constants/oauth';
import { resetNavigation } from '../../../helpers/navigation';

const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [, setUser] = useContext(UserContext);
  const {
    translations,
    initializeAppLanguage,
  } = useContext(LocalizationContext);

  const initUser = async () => {
    try {
      setLoading(true);
      const user = await attemptRefreshUser();
      setUser(user);
      resetNavigation(navigation, 'MainFlow');
    } catch (err) {
      setUser({});
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const userResponse = await signIn(email, password);
      setUser(userResponse);
      resetNavigation(navigation, 'MainFlow');
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
          resetNavigation(navigation, 'MainFlow');
        }
      } catch (err) {
        console.warn(params);
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
    initializeAppLanguage();
    initUser();
  }, []);

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
            {translations['welcome.login.description']}
          </Text>
          <View style={styles.socialContainer}>
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.fbColor }]}
              icon={facebookIcon}
              iconStyle={styles.iconStyle}
              onClick={() => {}}
            />
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.steamBlack }]}
              icon={twitchIcon}
              iconStyle={styles.iconStyle}
              onClick={twitchSignin}
            />
            <SocialButton
              style={[
                styles.socialButton,
                styles.googleContainer,
              ]}
              icon={googleIcon}
              iconStyle={styles.googleIconStyle}
              onClick={() => {}}
            />
          </View>
          <Text style={[styles.instructionText, styles.extraInstruction]}>
            {translations['welcome.login.email']}
          </Text>
          <CustomInput
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="email"
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
            color={colors.loginColor}
            label={translations['global.login']}
            disabled={
            isLoading
              || password.length < 8
              || email.length === 0
              || !validateEmail(email)
            }
            onClick={onSubmit}
          />
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label={translations['welcome.forgot']}
            onClick={() => navigation.navigate('ForgotPasswordScreen')}
            fontStyle={styles.lightFont}
          />
          <ConfirmButton
            borderColor={colors.grayOpacity2}
            textColor={colors.steamBlack}
            label={translations['welcome.create']}
            onClick={() => navigation.navigate('SignUpScreen')}
          />
        </View>
      </KeyboardAwareScrollView>
      {isLoading && (
        <LoadingComponent />
      )}
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
