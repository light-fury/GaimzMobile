// @flow
import React, { useContext, useState, useCallback } from 'react';
import {
  Text, View, Alert, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ConfirmButton from '../../../../Components/ConfirmButton';
import CustomInput from '../../../../Components/CustomInput';

import styles from './MatchPasswordScreen.style';
import { colors } from '../../../../Assets/config';
import { MatchContext } from '../../../../contexts';
import {
  createMatch,
} from '../../../../api';
import {
  eyeIcon,
} from '../../../../Assets';

const MatchPasswordScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const sendMatch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await createMatch(match);
      if (response && response.matchStatus === 'match_requested') {
        setMatch({
          ...match,
          match: response,
        });
        navigation.navigate('MatchTimerScreen');
      }
    } catch (err) {
      Alert.alert('Error', 'There was an error creating your game');
    }
    setLoading(false);
  }, [match]);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header} />
      <KeyboardAwareScrollView
        style={styles.searchContainer}
        contentContainerStyle={styles.padding0}
      >
        <View style={styles.flexContainer}>
          <Text style={styles.itemTitle}>Enter Password</Text>
        </View>
        <CustomInput
          label="Password"
          secureTextEntry={!passwordVisible}
          labelStyle={styles.whiteColor}
          containerStyle={styles.inputContainer}
          value={match.password || ''}
          icon={eyeIcon}
          iconVisible={(match.password || '').length > 0}
          onClick={() => setPasswordVisible(!passwordVisible)}
          onUpdateValue={(val) => setMatch({ ...match, password: val })}
          borderColor={(match.password || '').length === 0 ? colors.red : colors.grayOpacity}
        />
        {loading
          ? (<ActivityIndicator color={colors.loginColor} size="large" />)
          : (
            <ConfirmButton
              color={colors.loginColor}
              label="ENTER"
              onClick={() => sendMatch()}
              fontStyle={styles.fontSpacing}
              containerStyle={styles.mh16}
              disabled={(match.password || '').length === 0}
            />
          )}
        <Text style={styles.descriptionText}>
          You are trying to enter a password protected lobby. Please enter the
          password to queue for the match.
        </Text>
      </KeyboardAwareScrollView>
      <View style={styles.space} />
      <ConfirmButton
        borderColor={colors.secondaryOpacity}
        textColor={colors.grayText}
        label="GO BACK"
        onClick={() => navigation.pop()}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
        disabled={loading}
      />
      <View style={styles.space} />
    </SafeAreaView>
  );
};

MatchPasswordScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default MatchPasswordScreen;
