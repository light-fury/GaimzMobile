// @flow
import React from 'react';
import {
  Text, View, ScrollView, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import ConfirmButton from '../../../../Components/ConfirmButton';
import CustomDropdown from '../../../../Components/CustomDropdown';
import styles from './MatchSettingScreen.style';
import { colors } from '../../../../Assets/config';

class MatchSettingScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameTypeOption: ['1 Versus 1', '5 Versus 5'],
      gameType: '1 Versus 1',
      gameModeOption: ['All Pick'],
      gameMode: 'All Pick',
      regionOption: ['Automatic'],
      region: 'Automatic',
      streamerOptions: ['User1', 'User2', 'User3'],
      streamer: 'User1',
      matchOptions: [
        'Free Mode',
        'Subscriber Only',
        'Follower Only',
        'Password',
      ],
      match: 'Free Mode',
    };
  }

  render() {
    const {
      gameTypeOption,
      gameType,
      gameModeOption,
      gameMode,
      regionOption,
      region,
      streamerOptions,
      streamer,
      matchOptions,
      match,
    } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView
        forceInset={{ bottom: 'never', top: 'never' }}
        style={styles.container}
      >
        <View style={styles.header} />
        <ScrollView
          style={styles.searchContainer}
          contentContainerStyle={styles.padding0}
        >
          <Text style={[styles.itemTitle, styles.fontSpacing]}>
            SEARCH SETTINGS
          </Text>
          <CustomDropdown
            label="GAME TYPE"
            labelStyle={styles.whiteColor}
            containerStyle={styles.inputContainer}
            options={gameTypeOption}
            value={gameType}
            onUpdateValue={(val) => this.setState({ gameType: val })}
          />
          <View style={styles.rowContainer}>
            <CustomDropdown
              label="GAME MODE"
              labelStyle={styles.whiteColor}
              containerStyle={styles.flexContainer}
              options={gameModeOption}
              value={gameMode}
              onUpdateValue={(val) => this.setState({ gameMode: val })}
            />
            <CustomDropdown
              label="REGION"
              labelStyle={styles.whiteColor}
              containerStyle={[styles.flexContainer, styles.ml20]}
              options={regionOption}
              value={region}
              onUpdateValue={(val) => this.setState({ region: val })}
            />
          </View>
          <CustomDropdown
            label="SELECT STREAMER"
            labelStyle={styles.whiteColor}
            containerStyle={styles.inputContainer}
            options={streamerOptions}
            value={streamer}
            onUpdateValue={(val) => this.setState({ streamer: val })}
          />
          <CustomDropdown
            label="CREATE MATCH"
            labelStyle={styles.whiteColor}
            containerStyle={styles.inputContainer}
            options={matchOptions}
            value={match}
            onUpdateValue={(val) => this.setState({ match: val })}
          />
        </ScrollView>
        <ConfirmButton
          color={colors.loginColor}
          label="FIND MATCH"
          onClick={() => {
            if (match === 'Password') {
              navigation.navigate('MatchPasswordScreen');
            } else {
              Alert.alert('Match Screen');
            }
          }}
          fontStyle={styles.fontSpacing}
          containerStyle={styles.mh48}
        />
        <View style={styles.space} />
        <ConfirmButton
          borderColor={colors.secondaryOpacity}
          textColor={colors.grayText}
          label="SETTINGS"
          onClick={() => navigation.popToTop()}
          fontStyle={styles.fontSpacing}
          containerStyle={styles.mh48}
        />
        <View style={styles.space} />
      </SafeAreaView>
    );
  }
}

MatchSettingScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default MatchSettingScreen;
