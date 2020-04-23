/* eslint-disable react-native/no-inline-styles */
// @flow
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import IIcon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import styles from './DashboardScreen.style';
import {colors, baseUrl} from '../../../../Assets/config';
import Axios from 'axios';

class DashboardScreen extends React.PureComponent {
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
      fullname: '',
      email: '',
      focused: 0,
    };
  }

  render() {
    const {fullname, email} = this.state;
    const {
      Secrets: {isFetching},
      navigation,
    } = this.props;

    return (
      <SafeAreaView forceInset={{bottom: 'never'}} style={styles.container} />
    );
  }
}

export default DashboardScreen;
