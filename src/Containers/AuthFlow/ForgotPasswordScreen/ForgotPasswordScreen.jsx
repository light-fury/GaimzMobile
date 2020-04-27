// @flow
import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';

import styles from './ForgotPasswordScreen.style';
import { colors } from '../../../Assets/config';

class ForgotPasswordScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  render() {
    const { email } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView
        forceInset={{ bottom: 'never', top: 'never' }}
        style={styles.container}
      >
        <ImageBackground
          style={styles.topContainer}
          source={require('../../../Assets/splash_background.png')}
          imageStyle={styles.flexStyle}
          resizeMode="cover"
        >
          <Image
            style={styles.logoImage}
            source={require('../../../Assets/app_logo.png')}
            resizeMode="contain"
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
          contentContainerStyle={styles.scrollInner}
        >
          <Text style={styles.title}>Password recovery</Text>
          <Text style={styles.instructionText}>We all forget something.</Text>
          <View style={styles.space} />
          <View style={styles.space} />
          <CustomInput
            label="Email"
            value={email}
            onUpdateValue={(text) => this.setState({ email: text })}
            icon={require('../../../Assets/close_icon.png')}
            iconVisible={email.length > 0}
            borderColor={email.length > 0 ? colors.red : colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.flexStyle} />
          <ConfirmButton
            color={colors.signUpColor}
            label="Send"
            onClick={() => Alert.alert('Pin code sent')}
            containerStyle={styles.mh20}
          />
          <View style={styles.space} />
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label="Get Back"
            onClick={() => navigation.pop()}
            fontStyle={styles.lightFont}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

ForgotPasswordScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default ForgotPasswordScreen;
