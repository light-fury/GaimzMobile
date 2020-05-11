// @flow
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './MatchErrorScreen.style';
import { colors } from '../../../../Assets/config';

const MatchErrorScreen = ({ navigation }) => {
  const [errorMessage] = useState(navigation.getParam('errorMessage', ''), '');

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header} />
      <View style={styles.searchContainer}>
        <View style={styles.flexContainer} />
        <Text style={styles.itemTitle}>{`Oh no...\n\n${errorMessage}`}</Text>
        <View style={styles.flexContainer} />
        <ConfirmButton
          color={colors.loginColor}
          label="GO BACK"
          onClick={() => navigation.pop()}
          fontStyle={styles.fontSpacing}
          containerStyle={styles.disabledColor}
        />
        <View style={styles.flexContainer} />
      </View>
      <ConfirmButton
        color={colors.loginColor}
        label="FIND MATCH"
        onClick={() => {
          navigation.replace({ key: 'MatchSearchScreen', newKey: 'MatchSearchScreen', routeName: 'MatchSearchScreen' });
          navigation.pop();
        }}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
      />
      <View style={styles.space} />
      <ConfirmButton
        borderColor={colors.secondaryOpacity}
        textColor={colors.grayText}
        label="SETTINGS"
        onClick={() => {
          navigation.replace({ key: 'MatchSettingScreen', newKey: 'MatchSettingScreen', routeName: 'MatchSettingScreen' });
          navigation.popToTop();
        }}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
      />
      <View style={styles.space} />
    </SafeAreaView>
  );
};

MatchErrorScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default withNavigation(MatchErrorScreen);
