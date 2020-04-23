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

import styles from './WelcomeScreen.style';
import {colors, baseUrl} from '../../../Assets/config';
import Axios from 'axios';

class WelcomeScreen extends React.PureComponent {
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
      email: secretsData && secretsData.email ? secretsData.email : '',
      password: secretsData && secretsData.password ? secretsData.password : '',
      passwordVisible: false,
      focused: 0,
    };
  }

  UNSAFE_componentWillMount() {
    const {
      Secrets: {secretsData},
      createSecretsData,
      navigation,
    } = this.props;
    if (secretsData && secretsData.auth_token) {
      this.setState(
        {
          email: secretsData.email,
          password: secretsData.password,
        },
        () => {
          const {email, password} = this.state;
          createSecretsData({email, password, navigation});
        },
      );
    }
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const {email, password, passwordVisible, focused} = this.state;
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
        </ImageBackground>
        <KeyboardAwareScrollView
          enableOnAndroid
          style={styles.absoluteFill}
          contentContainerStyle={styles.scrollInner}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.instructionText}>
            Login your account to continue
          </Text>
          <View style={styles.socialContainer}>
            <SocialButton
              style={[styles.socialButton, {backgroundColor: colors.fbColor}]}
              icon={require('../../../Assets/facebook_icon.png')}
              onClick={() => {
                alert('FB Login');
              }}
            />
            <SocialButton
              style={[styles.socialButton, {backgroundColor: colors.lightGray}]}
              icon={require('../../../Assets/twitch_icon.png')}
              onClick={() => {
                alert('Twitch Login');
              }}
            />
            <SocialButton
              style={[styles.socialButton, {backgroundColor: colors.secondary}]}
              icon={require('../../../Assets/steam_icon.png')}
              onClick={() => {
                alert('Steam Login');
              }}
            />
            <Text style={[styles.instructionText, {fontSize: 12}]}>
              Or use your email account
            </Text>
          </View>
          <CustomInput
            label={'Email'}
            value={email}
            onUpdateValue={(text) => this.setState({email: text})}
            icon={require('../../../Assets/check_icon.png')}
            iconVisible={email.length > 0}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label={'Password'}
            value={password}
            secureTextEntry={!passwordVisible}
            icon={require('../../../Assets/eye_icon.png')}
            iconVisible={password.length > 0}
            onUpdateValue={(text) => this.setState({password: text})}
            onClick={() => this.setState({passwordVisible: !passwordVisible})}
            containerStyle={styles.inputContainer}
          />
          <ConfirmButton
            color={colors.loginColor}
            label={'Login'}
            onClick={() =>
              navigation.dangerouslyGetParent().navigate('MainFlow')
            }
          />
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label={'Forgot password?'}
            onClick={() => alert('Forgot Password')}
            fontStyle={styles.lightFont}
          />
          <View style={styles.space} />
          <ConfirmButton
            borderColor={colors.secondaryOpacity}
            textColor={`${colors.secondary}70`}
            label={'Create an account'}
            onClick={() => navigation.navigate('SignUpScreen')}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default WelcomeScreen;
