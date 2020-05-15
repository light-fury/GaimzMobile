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
  appLogo,
  twitchIcon,
  checkIcon,
  eyeIcon,
  closeIcon,
} from '../../../Assets';
import { colors, calcReal, validateEmail } from '../../../Assets/config';
import { signIn, signInWithTwitch, attemptRefreshUser } from '../../../api';
import { UserContext } from '../../../contexts';
import { twitchSigninUrl } from '../../../constants/oauth';
import { resetNavigation } from '../../../helpers/navigation';

const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [, setUser] = useContext(UserContext);

  const initUser = async () => {
    try {
      // To sign out while it isn't implemented
      // await AsyncStorage.removeItem('AuthToken');
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
      const response = await signIn(email, password);
      setUser(response.user);
      resetNavigation(navigation, 'MainFlow');
    } catch (err) {
      Alert.alert('Error', 'There was an error signing you in');
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
        <View
          style={styles.absoluteFill}
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
            autoCapitalize="none"
            autoCompleteType="email"
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
          <ConfirmButton
            color={colors.loginColor}
            label="Login"
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
