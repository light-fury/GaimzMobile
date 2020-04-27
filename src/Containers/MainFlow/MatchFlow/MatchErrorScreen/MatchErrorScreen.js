/* eslint-disable react-native/no-inline-styles */
// @flow
import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './MatchErrorScreen.style';
import {colors} from '../../../../Assets/config';

class MatchErrorScreen extends React.PureComponent {
  static propTypes = {
    Secrets: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      secretsData: PropTypes.shape(),
      error: PropTypes.any,
    }).isRequired,
    navigation: PropTypes.shape().isRequired,
    createSecretsData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      errorMessage:
        'You need to subscribe to *Username* before you can match with him on Gaimz',
      focused: 0,
    };
  }

  render() {
    const {errorMessage} = this.state;
    const {navigation} = this.props;

    return (
      <SafeAreaView
        forceInset={{bottom: 'never', top: 'never'}}
        style={styles.container}>
        <View style={styles.header} />
        <View style={styles.searchContainer}>
          <View style={styles.flexContainer} />
          <Text style={styles.itemTitle}>{`Oh no...\n\n${errorMessage}`}</Text>
          <View style={styles.flexContainer} />
          <ConfirmButton
            color={colors.loginColor}
            label={'GO BACK'}
            onClick={() => navigation.pop()}
            fontStyle={styles.fontSpacing}
            containerStyle={styles.disabledColor}
          />
          <View style={styles.flexContainer} />
        </View>
        <ConfirmButton
          color={colors.loginColor}
          label={'FIND MATCH'}
          onClick={() => alert('Find Match')}
          fontStyle={styles.fontSpacing}
          containerStyle={styles.mh48}
        />
        <View style={styles.space} />
        <ConfirmButton
          borderColor={colors.secondaryOpacity}
          textColor={colors.grayText}
          label={'SETTINGS'}
          onClick={() => navigation.popToTop()}
          fontStyle={styles.fontSpacing}
          containerStyle={styles.mh48}
        />
        <View style={styles.space} />
      </SafeAreaView>
    );
  }
}

export default MatchErrorScreen;
