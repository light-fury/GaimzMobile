// @flow
import React from 'react';
<<<<<<< HEAD:src/Containers/AuthFlow/WelcomeScreen/WelcomeScreen.js
import {Text, View, ImageBackground, Image} from 'react-native';
=======
import {
  Alert,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
>>>>>>> :recycle: Refactoring:src/Containers/AuthFlow/WelcomeScreen/WelcomeScreen.jsx
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';

import styles from './WelcomeScreen.style';
<<<<<<< HEAD:src/Containers/AuthFlow/WelcomeScreen/WelcomeScreen.js
import {colors, calcReal} from '../../../Assets/config';
=======
import { colors, calcReal } from '../../../Assets/config';
>>>>>>> :recycle: Refactoring:src/Containers/AuthFlow/WelcomeScreen/WelcomeScreen.jsx

class WelcomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      Secrets: { secretsData },
    } = props;
    this.state = {
      email: secretsData && secretsData.email ? secretsData.email : '',
      password: secretsData && secretsData.password ? secretsData.password : '',
      passwordVisible: false,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
<<<<<<< HEAD:src/Containers/AuthFlow/WelcomeScreen/WelcomeScreen.js
    const {email, password, passwordVisible} = this.state;
    const {navigation} = this.props;
=======
    const { email, password, passwordVisible } = this.state;
    const { navigation } = this.props;
>>>>>>> :recycle: Refactoring:src/Containers/AuthFlow/WelcomeScreen/WelcomeScreen.jsx

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
        </ImageBackground>
        <KeyboardAwareScrollView
          enableOnAndroid
          style={styles.absoluteFill}
          contentContainerStyle={styles.scrollInner}
        >
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.instructionText}>
            Login your account to continue
          </Text>
          <View style={styles.socialContainer}>
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.fbColor }]}
              icon={require('../../../Assets/facebook_icon.png')}
              onClick={() => {
                Alert.alert('FB Login');
              }}
            />
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.lightGray }]}
              icon={require('../../../Assets/twitch_icon.png')}
              onClick={() => {
                Alert.alert('Twitch Login');
              }}
            />
            <SocialButton
              style={[styles.socialButton, { backgroundColor: colors.secondary }]}
              icon={require('../../../Assets/steam_icon.png')}
              onClick={() => {
                Alert.alert('Steam Login');
              }}
            />
            <Text style={[styles.instructionText, { fontSize: calcReal(12) }]}>
              Or use your email account
            </Text>
          </View>
          <CustomInput
            label="Email"
            value={email}
            onUpdateValue={(text) => this.setState({ email: text })}
            icon={require('../../../Assets/check_icon.png')}
            iconVisible={email.length > 0}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label="Password"
            value={password}
            secureTextEntry={!passwordVisible}
            icon={require('../../../Assets/eye_icon.png')}
            iconVisible={password.length > 0}
            onUpdateValue={(text) => this.setState({ password: text })}
            onClick={() => this.setState({ passwordVisible: !passwordVisible })}
            containerStyle={styles.inputContainer}
          />
          <ConfirmButton
            color={colors.loginColor}
            label="Login"
            onClick={() => navigation.dangerouslyGetParent().navigate('MainFlow')}
          />
          <ConfirmButton
            borderColor={colors.transparent}
            textColor={colors.gray}
            label="Forgot password?"
            onClick={() => navigation.navigate('ForgotPasswordScreen')}
            fontStyle={styles.lightFont}
          />
          <View style={styles.space} />
          <ConfirmButton
            borderColor={colors.secondaryOpacity}
            textColor={`${colors.secondary}70`}
            label="Create an account"
            onClick={() => navigation.navigate('SignUpScreen')}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

WelcomeScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default WelcomeScreen;
