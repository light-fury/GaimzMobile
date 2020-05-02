// @flow
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ConfirmButton from '../../../../Components/ConfirmButton';
import CustomInput from '../../../../Components/CustomInput';
import styles from './MatchPasswordScreen.style';
import { colors } from '../../../../Assets/config';
import { MatchContext } from '../../../../contexts';

const MatchPasswordScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);

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
          secureTextEntry
          labelStyle={styles.whiteColor}
          containerStyle={styles.inputContainer}
          value={match.password || ''}
          onUpdateValue={(val) => setMatch({ ...match, password: val })}
        />
        <ConfirmButton
          color={colors.loginColor}
          label="ENTER"
          onClick={() => navigation.navigate('MatchErrorScreen')}
          fontStyle={styles.fontSpacing}
          containerStyle={styles.mh16}
        />
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
