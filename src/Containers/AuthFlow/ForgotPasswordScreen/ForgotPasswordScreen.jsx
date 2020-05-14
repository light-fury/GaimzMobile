// @flow
import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';
import LoadingComponent from '../../../Components/LoadingComponent';

import styles from './ForgotPasswordScreen.style';
import {
  splashBackground, appLogo, arrowLeft, closeIcon, checkIcon,
} from '../../../Assets';
import { resetPassword } from '../../../api';
import { colors, validateEmail } from '../../../Assets/config';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleResetPassword = useCallback(async () => {
    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert('Success', 'If you have an account with us we will send you an email with instructions on how to reset', [
        {
          text: 'OK',
          style: 'default',
          onPress: async () => navigation.pop(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'There was an error sending you the instruction email');
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <KeyboardAwareScrollView
        bounces={false}
        style={styles.flexStyle}
        contentContainerStyle={styles.fullHeight}
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
          <SocialButton
            style={styles.socialButton}
            icon={arrowLeft}
            iconStyle={styles.headerIcon}
            onClick={() => navigation.pop()}
          />
        </ImageBackground>
        <View style={styles.topBorderContainer}>
          <View style={styles.topWhiteContainer} />
        </View>
        <View
          scrollEnabled={false}
          style={styles.absoluteFill}
          contentContainerStyle={styles.scrollInner}
        >
          <Text style={styles.title}>Password recovery</Text>
          <Text style={styles.instructionText}>We all forget something.</Text>
          <View style={styles.space} />
          <View style={styles.space} />
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
          <View style={styles.flexStyle} />
          <ConfirmButton
            color={colors.signUpColor}
            label="Send"
            onClick={() => handleResetPassword()}
            containerStyle={styles.mh20}
            disabled={
              isLoading
              || email.length === 0
              || !validateEmail(email)
            }
          />
          <View style={styles.space} />
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label="Get Back"
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

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default withNavigation(ForgotPasswordScreen);
