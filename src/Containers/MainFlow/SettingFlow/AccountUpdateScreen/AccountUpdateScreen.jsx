// @flow
import React, { useContext, useCallback, useState } from 'react';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  get,
} from 'lodash';

import {
  arrowLeft,
  checkIcon,
  closeIcon,
  checkWhiteIcon,
} from '../../../../Assets';
import styles from './AccountUpdateScreen.style';
import { UserContext, LocalizationContext } from '../../../../contexts';
import HeaderComponent from '../../../../Components/HeaderComponent';
import ConfirmButton from '../../../../Components/ConfirmButton';
import CustomInput from '../../../../Components/CustomInput';
import LoadingComponent from '../../../../Components/LoadingComponent';
import {
  colors,
  validateEmail,
  useKeyboard,
  calcReal,
} from '../../../../Assets/config';
import { updateUser } from '../../../../api/user';

const AccountUpdateScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const { translations } = useContext(LocalizationContext);
  const [keyboardHeight] = useKeyboard();
  const [fieldName] = useState(navigation.getParam('field'));
  const [targetValue, setTargetValue] = useState(get(user, fieldName) || '');
  const [confirmValue, setConfirmValue] = useState('');
  const [allowEmail, setAllowEmail] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const validateValue = useCallback(() => {
    if (targetValue.length <= 0) {
      return true;
    }
    if (fieldName === 'userEmail') {
      return validateEmail(targetValue);
    }
    if (fieldName === 'password') {
      return targetValue.length >= 9;
    }
    return true;
  });

  const saveValue = useCallback(async () => {
    try {
      setLoading(true);
      if (!validateValue()) {
        return;
      }
      if (fieldName === 'password' && targetValue !== confirmValue) {
        return;
      }
      const response = await updateUser({ [fieldName]: targetValue });
      setUser(response);
      navigation.pop();
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const getHeaderText = useCallback(() => {
    switch (fieldName) {
      case 'password':
        return 'PASSWORD CHANGE';
      case 'birthDate':
        return 'BIRTH DATE CHANGE';
      case 'userEmail':
        return 'E-MAIL CHANGE';
      case 'fullName':
        return 'FULL NAME CHANGE';
      case 'userName':
        return 'USERNAME CHANGE';
      default:
        return 'E-MAIL CHANGE';
    }
  });

  const getDescriptionText = useCallback(() => {
    switch (fieldName) {
      case 'password':
        return 'You can change your password at any time, you must have a verified email';
      case 'birthDate':
        return 'We use your birth date to verify your account';
      case 'userEmail':
        return 'A verified email address allows you to recover your account and find your friends on Social app';
      case 'fullName':
        return 'Your full name is necessary to verify your account';
      case 'userName':
        return 'The Username is what is displayed to other people and in the app';
      default:
        return 'A verified email address allows you to recover your account and find your friends on Social app';
    }
  });

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <HeaderComponent
        label={getHeaderText()}
        rightClick={() => navigation.goBack()}
        leftIcon={arrowLeft}
        leftClick={() => navigation.goBack()}
        leftIconStyle={styles.headerLeftIcon}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollIntent}
        extraHeight={calcReal(80)}
      >
        <View style={styles.headerTextContainer}>
          <Text style={[styles.headerNameText, styles.centerText]}>
            {getDescriptionText()}
          </Text>
        </View>
        <CustomInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder={translations[`global.field.${fieldName}`] || ''}
          value={targetValue}
          onUpdateValue={setTargetValue}
          icon={validateValue() ? checkIcon : closeIcon}
          iconVisible={targetValue.length > 0}
          borderColor={!validateValue()
            ? colors.redOpacity : colors.grayOpacity}
          containerStyle={styles.inputContainer}
          onClick={() => !validateValue() && setTargetValue('')}
        />
        {fieldName === 'password' && (
          <CustomInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={translations['global.field.password.confirm']}
            value={confirmValue}
            onUpdateValue={setConfirmValue}
            secureTextEntry
            icon={confirmValue.length > 0 && confirmValue.length < 9 ? closeIcon : checkIcon}
            iconVisible={confirmValue.length > 0}
            borderColor={confirmValue.length > 0
              && (confirmValue.length < 9 || confirmValue !== targetValue)
              ? colors.redOpacity : colors.grayOpacity}
            containerStyle={styles.inputContainer}
            onClick={() => confirmValue.length > 0 && confirmValue.length < 9 && setConfirmValue('')}
          />
        )}
        {fieldName === 'userEmail' && (
          <TouchableOpacity
            onPress={() => setAllowEmail(!allowEmail)}
            style={styles.rowContainer}
          >
            <Text style={[styles.headerNameText, styles.flexContainer]}>
              Allow Gaimz to send me emails from partners and Gaimz.
            </Text>
            <View style={[styles.checkBox, !allowEmail && styles.checkBoxBorder]}>
              {allowEmail && (
                <Image
                  source={checkWhiteIcon}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
      <ConfirmButton
        color={colors.loginColor}
        borderColor={colors.transparent}
        textColor={colors.gray}
        label="Save changes"
        onClick={saveValue}
        fontStyle={[styles.headerNameText, styles.buttonText]}
        containerStyle={[
          styles.absolutePos,
          { marginBottom: keyboardHeight + calcReal(20) },
        ]}
      />
      {isLoading && (
        <LoadingComponent />
      )}
    </SafeAreaView>
  );
};

AccountUpdateScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default AccountUpdateScreen;
