/* eslint-disable react-native/no-inline-styles */
// @flow
import React from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import SocialButton from '../../../../Components/SocialButton';
import CustomInput from '../../../../Components/CustomInput';
import ConfirmButton from '../../../../Components/ConfirmButton';
import {colors} from '../../../../Assets/config';
import styles from './AccountSettingScreen.style';

class AccountSettingScreen extends React.PureComponent {
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
      fullname: '',
      email: '',
      birthday: '',
      location: '',
      listData: [
        {
          image: require('../../../../Assets/steam_icon.png'),
          title: 'STEAM',
          route: 'AccountSettingScreen',
          connected: true,
        },
        {
          image: require('../../../../Assets/twitch_icon.png'),
          title: 'TWITCH',
          route: 'AccountSettingScreen',
          connected: false,
        },
      ],
      focused: 0,
    };
  }

  render() {
    const {email, fullname, birthday, location} = this.state;
    const {navigation} = this.props;

    return (
      <SafeAreaView
        forceInset={{bottom: 'never', top: 'never'}}
        style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.innerContainer}>
          <Text style={styles.titleText}>Account Informations</Text>
          <View style={styles.rowContainer}>
            <SocialButton
              style={styles.headerButton}
              iconStyle={styles.headerIcon}
              icon={require('../../../../Assets/camera_icon.png')}
              onClick={() => alert('Camera Clicked')}
            />
            <Image
              source={require('../../../../Assets/template_profile.png')}
              style={styles.avatarImage}
              resizeMode={'cover'}
            />
            <SocialButton
              style={[styles.headerButton, styles.headerTrashButton]}
              iconStyle={styles.headerIcon}
              icon={require('../../../../Assets/delete_icon.png')}
              onClick={() => alert('Delete Clicked')}
            />
          </View>
          <CustomInput
            label={'Name'}
            value={fullname}
            onUpdateValue={(text) => this.setState({fullname: text})}
            icon={require('../../../../Assets/close_icon.png')}
            onClick={() => this.setState({fullname: ''})}
            iconVisible={fullname.length > 0}
            borderColor={colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label={'Email'}
            value={email}
            onUpdateValue={(text) => this.setState({email: text})}
            icon={require('../../../../Assets/close_icon.png')}
            onClick={() => this.setState({email: ''})}
            iconVisible={email.length > 0}
            borderColor={colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label={'Birthday'}
            value={birthday}
            onUpdateValue={(text) => this.setState({birthday: text})}
            icon={require('../../../../Assets/close_icon.png')}
            onClick={() => this.setState({birthday: ''})}
            iconVisible={birthday.length > 0}
            borderColor={colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label={'Location'}
            value={location}
            onUpdateValue={(text) => this.setState({location: text})}
            icon={require('../../../../Assets/close_icon.png')}
            onClick={() => this.setState({location: ''})}
            iconVisible={location.length > 0}
            borderColor={colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <ConfirmButton
            containerStyle={styles.mv10}
            color={colors.loginColor}
            label={'Save Changes'}
            onClick={() => navigation.pop()}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AccountSettingScreen;
