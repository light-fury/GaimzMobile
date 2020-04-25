/* eslint-disable react-native/no-inline-styles */
// @flow
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import IIcon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';

import styles from './ForgotPasswordScreen.style';
import {colors, baseUrl} from '../../../Assets/config';
import Axios from 'axios';

class ForgotPasswordScreen extends React.PureComponent {
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
    const {
      Secrets: {secretsData},
    } = props;
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordVisible: false,
      focused: 0,
    };
  }

  render() {
    const {email, password, passwordVisible, username} = this.state;
    const {
      Secrets: {isFetching},
      navigation,
    } = this.props;

    return (
      <SafeAreaView
        forceInset={{bottom: 'never', top: 'never'}}
        style={styles.container}>
        <ImageBackground
          style={styles.topContainer}
          source={require('../../../Assets/splash_background.png')}
          imageStyle={styles.flexStyle}
          resizeMode={'cover'}>
          <Image
            style={styles.logoImage}
            source={require('../../../Assets/app_logo.png')}
            resizeMode={'contain'}
          />
          <SocialButton
            style={styles.socialButton}
            icon={require('../../../Assets/arrow_left.png')}
            onClick={() => navigation.pop()}
          />
        </ImageBackground>
        <KeyboardAwareScrollView
          enableOnAndroid
          style={styles.absoluteFill}
          contentContainerStyle={styles.scrollInner}>
          <Text style={styles.title}>Password recovery</Text>
          <Text style={styles.instructionText}>We all forget something.</Text>
          <View style={styles.space} />
          <View style={styles.space} />
          <CustomInput
            label={'Email'}
            value={email}
            onUpdateValue={(text) => this.setState({email: text})}
            icon={require('../../../Assets/close_icon.png')}
            iconVisible={email.length > 0}
            borderColor={email.length > 0 ? colors.red : colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.flexStyle} />
          <ConfirmButton
            color={colors.signUpColor}
            label={'Send'}
            onClick={() => alert('Pin code sent')}
            containerStyle={styles.mh20}
          />
          <View style={styles.space} />
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label={'Get Back'}
            onClick={() => navigation.pop()}
            fontStyle={styles.lightFont}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default ForgotPasswordScreen;
