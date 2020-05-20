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
} from '../../../Assets';
import { resetPassword } from '../../../api';
import { colors, validateEmail } from '../../../Assets/config';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { translations } = useContext(LocalizationContext);

  const handleResetPassword = useCallback(async () => {
    try {
      setLoading(true);
      await resetPassword(email);
    } catch (error) {
      Alert.alert(translations['alert.error.title'], translations['alert.error.reset']);
    } finally {
      setLoading(false);
      navigation.popToTop();
    }
  }, [email]);

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
            {translations['password.title']}
          </Text>
          <Text style={styles.instructionText}>
            {translations['password.description']}
          </Text>
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
          <ConfirmButton
            color={colors.green}
            label={translations['password.button']}
            onClick={() => handleResetPassword()}
            containerStyle={styles.mh20}
            disabled={
              isLoading
              || email.length === 0
              || !validateEmail(email)
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
