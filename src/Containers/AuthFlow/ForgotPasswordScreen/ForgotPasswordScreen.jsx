// @flow
import React, { useState, useCallback, useContext } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';
import LoadingComponent from '../../../Components/LoadingComponent';
import { LocalizationContext } from '../../../contexts';

import styles from './ForgotPasswordScreen.style';
import {
  resetBackground,
  splashLogo,
  arrowLeft,
  closeIcon,
  checkIcon,
  eyeCloseIcon,
  eyeIcon,
} from '../../../Assets';
import { resetPassword } from '../../../api';
import { colors, validateEmail } from '../../../Assets/config';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { translations } = useContext(LocalizationContext);

  const handleResetPassword = useCallback(async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      try {
        setLoading(true);
        await resetPassword(email);
      } catch (error) {
        Alert.alert(translations['alert.error.title'], translations['alert.error.reset']);
      } finally {
        setLoading(false);
        setStep(3);
      }
    } else {
      navigation.popToTop();
    }
  }, [email, step]);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.flexStyle}
      >
        <StatusBar barStyle="light-content" />
        <ImageBackground
          style={styles.topContainer}
          source={resetBackground}
          imageStyle={styles.flexStyle}
          resizeMode="cover"
        >
          <Image
            style={styles.logoImage}
            source={splashLogo}
            resizeMode="contain"
          />
          <SocialButton
            style={styles.socialButton}
            icon={arrowLeft}
            iconStyle={styles.headerIcon}
            onClick={() => navigation.pop()}
          />
        </ImageBackground>
        <View
          style={styles.absoluteFill}
        >
          <Text style={styles.title}>
            {translations[step === 3 ? 'password.title3' : 'password.title']}
          </Text>
          <Text style={styles.instructionText}>
            {translations[`password.description${step}`]}
          </Text>
          {step === 1 && (
            <>
              <View style={styles.space} />
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
            </>
          )}
          {step === 2 && (
            <>
              <View style={styles.space} />
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
            </>
          )}
          {step === 3 && (
            <Image style={styles.successIcon} source={checkIcon} resizeMode="contain" />
          )}
          <ConfirmButton
            color={colors.green}
            label={translations[`password.button${step}`]}
            onClick={() => handleResetPassword()}
            containerStyle={styles.mh20}
            disabled={
              isLoading
              || ((step === 1) && (email.length === 0
              || !validateEmail(email)))
              || ((step === 2) && (password.length < 8))
            }
          />
        </View>
      </KeyboardAwareScrollView>
      {isLoading && (
        <LoadingComponent />
      )}
    </SafeAreaView>
  );
};

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default withNavigation(ForgotPasswordScreen);
