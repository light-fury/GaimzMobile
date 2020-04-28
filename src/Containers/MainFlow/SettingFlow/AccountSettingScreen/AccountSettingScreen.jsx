// @flow
import React from 'react';
import {
  Alert, Text, View, Image, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import SocialButton from '../../../../Components/SocialButton';
import CustomInput from '../../../../Components/CustomInput';
import ConfirmButton from '../../../../Components/ConfirmButton';
import { colors } from '../../../../Assets/config';
import {
  cameraIcon,
  templateProfile,
  deleteIcon,
  closeIcon,
} from '../../../../Assets';
import styles from './AccountSettingScreen.style';

class AccountSettingScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      birthday: '',
      location: '',
    };
  }

  render() {
    const {
      email, fullname, birthday, location,
    } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView
        forceInset={{ bottom: 'never', top: 'never' }}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.innerContainer}
        >
          <Text style={styles.titleText}>Account Informations</Text>
          <View style={styles.rowContainer}>
            <SocialButton
              style={styles.headerButton}
              iconStyle={styles.headerIcon}
              icon={cameraIcon}
              onClick={() => Alert.alert('Camera Clicked')}
            />
            <Image
              source={templateProfile}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            <SocialButton
              style={[styles.headerButton, styles.headerTrashButton]}
              iconStyle={styles.headerIcon}
              icon={deleteIcon}
              onClick={() => Alert.alert('Delete Clicked')}
            />
          </View>
          <CustomInput
            label="Name"
            value={fullname}
            onUpdateValue={(text) => this.setState({ fullname: text })}
            icon={closeIcon}
            onClick={() => this.setState({ fullname: '' })}
            iconVisible={fullname.length > 0}
            borderColor={colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label="Email"
            value={email}
            onUpdateValue={(text) => this.setState({ email: text })}
            icon={closeIcon}
            onClick={() => this.setState({ email: '' })}
            iconVisible={email.length > 0}
            borderColor={colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label="Birthday"
            value={birthday}
            onUpdateValue={(text) => this.setState({ birthday: text })}
            icon={closeIcon}
            onClick={() => this.setState({ birthday: '' })}
            iconVisible={birthday.length > 0}
            borderColor={colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <CustomInput
            label="Location"
            value={location}
            onUpdateValue={(text) => this.setState({ location: text })}
            icon={closeIcon}
            onClick={() => this.setState({ location: '' })}
            iconVisible={location.length > 0}
            borderColor={colors.grayOpacity}
            containerStyle={styles.inputContainer}
          />
          <ConfirmButton
            containerStyle={styles.mv10}
            color={colors.loginColor}
            label="Save Changes"
            onClick={() => navigation.pop()}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

AccountSettingScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default AccountSettingScreen;
