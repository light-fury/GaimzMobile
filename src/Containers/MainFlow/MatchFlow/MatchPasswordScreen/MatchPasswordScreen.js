/* eslint-disable react-native/no-inline-styles */
// @flow
import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ConfirmButton from '../../../../Components/ConfirmButton';
import CustomInput from '../../../../Components/CustomInput';
import styles from './MatchPasswordScreen.style';
import {colors} from '../../../../Assets/config';

class MatchPasswordScreen extends React.PureComponent {
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
      password: '',
      focused: 0,
    };
  }

  render() {
    const {password} = this.state;
    const {navigation} = this.props;

    return (
      <SafeAreaView
        forceInset={{bottom: 'never', top: 'never'}}
        style={styles.container}>
        <View style={styles.header} />
        <KeyboardAwareScrollView
          style={styles.searchContainer}
          contentContainerStyle={styles.padding0}>
          <View style={styles.flexContainer}>
            <Text style={styles.itemTitle}>Enter Password</Text>
          </View>
          <CustomInput
            label={'Password'}
            secureTextEntry
            labelStyle={styles.whiteColor}
            containerStyle={styles.inputContainer}
            value={password}
            onUpdateValue={(val) => this.setState({password: val})}
          />
          <ConfirmButton
            color={colors.loginColor}
            label={'ENTER'}
            onClick={() => navigation.navigate('MatchErrorScreen')}
            fontStyle={styles.fontSpacing}
            containerStyle={styles.mh16}
          />
          <ConfirmButton
            color={colors.loginColor}
            label={'GO BACK'}
            onClick={() => navigation.pop()}
            fontStyle={styles.fontSpacing}
            containerStyle={[styles.mh16, styles.disabledColor]}
          />
          <Text style={styles.descriptionText}>
            You are trying to enter a password protected lobby. Please enter the
            password to queue for the match.
          </Text>
        </KeyboardAwareScrollView>
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

export default MatchPasswordScreen;
