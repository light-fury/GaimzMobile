// @flow
import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import SocialButton from '../../../Components/SocialButton';
import ConfirmButton from '../../../Components/ConfirmButton';
import CustomInput from '../../../Components/CustomInput';

import styles from './ForgotPasswordScreen.style';
import {
  splashBackground, appLogo, arrowLeft, closeIcon,
} from '../../../Assets';
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
        <ScrollView
          bounces={false}
          style={styles.flexStyle}
          contentContainerStyle={styles.fullHeight}
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
            <SocialButton
              style={styles.socialButton}
              icon={arrowLeft}
              iconStyle={styles.headerIcon}
              onClick={() => navigation.pop()}
            />
          </ImageBackground>
          <View style={styles.topBorderContainer}>
            <View style={styles.topWhiteContainer} />
          </View>
          <View
            scrollEnabled={false}
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
              icon={closeIcon}
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
          </View>
        </ScrollView>
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
