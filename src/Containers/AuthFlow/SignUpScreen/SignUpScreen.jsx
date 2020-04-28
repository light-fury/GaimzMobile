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

import styles from './SignUpScreen.style';
import {
  splashBackground,
  appLogo,
  facebookIcon,
  twitchIcon,
  steamIcon,
  checkIcon,
  closeIcon,
  eyeIcon,
} from '../../../Assets';
import { colors, calcReal } from '../../../Assets/config';

class SignUpScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordVisible: false,
    };
  }

  render() {
    const {
      email, password, passwordVisible, username,
    } = this.state;
    const {
      navigation,
    } = this.props;

    return (
      <SafeAreaView
        forceInset={{ bottom: 'never', top: 'never' }}
        style={styles.container}
      >
        <ImageBackground
          style={styles.topContainer}
          source={splashBackground}
          imageStyle={styles.flexStyle}
          resizeMode="cover"
        >
          <Image
            style={styles.logoImage}
            source={appLogo}
            resizeMode="contain"
          />
        </ImageBackground>
        <KeyboardAwareScrollView
          enableOnAndroid
          style={styles.absoluteFill}
          contentContainerStyle={styles.scrollInner}
        >
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.instructionText}>Sign in to continue</Text>
          <View style={styles.socialContainer}>
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.fbColor }]}
              icon={facebookIcon}
              onClick={() => {
                Alert.alert('FB Login');
              }}
            />
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.lightGray }]}
              icon={twitchIcon}
              onClick={() => {
                Alert.alert('Twitch Login');
              }}
            />
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.secondary }]}
              icon={steamIcon}
              onClick={() => {
                Alert.alert('Steam Login');
              }}
            />
            <Text style={[styles.instructionText, { fontSize: calcReal(12) }]}>
              Or use your email account
            </Text>
          </View>
          <CustomInput
            label="Username"
            value={username}
            onUpdateValue={(text) => this.setState({ username: text })}
            icon={checkIcon}
            iconVisible={username.length > 0}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label="Email"
            value={email}
            onUpdateValue={(text) => this.setState({ email: text })}
            icon={closeIcon}
            iconVisible={email.length > 0}
            borderColor={email.length > 0 ? colors.red : colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label="Password"
            value={password}
            secureTextEntry={!passwordVisible}
            icon={eyeIcon}
            iconVisible={password.length > 0}
            onUpdateValue={(text) => this.setState({ password: text })}
            onClick={() => this.setState({ passwordVisible: !passwordVisible })}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.space} />
          <ConfirmButton
            color={colors.signUpColor}
            label="Sign Up"
            onClick={() => navigation.dangerouslyGetParent().navigate('MainFlow')}
            containerStyle={styles.mh20}
          />
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label="Already have an account? Login"
            onClick={() => navigation.pop()}
            fontStyle={styles.lightFont}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

SignUpScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default SignUpScreen;
