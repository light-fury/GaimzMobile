// @flow
import React, { useContext, useState } from 'react';
import {
  Alert, Text, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';

import SocialButton from '../../../../Components/SocialButton';
import CustomInput from '../../../../Components/CustomInput';
import ConfirmButton from '../../../../Components/ConfirmButton';
import { colors } from '../../../../Assets/config';
import {
  cameraIcon,
  deleteIcon,
  closeIcon,
  arrowLeft,
} from '../../../../Assets';
import styles from './AccountSettingScreen.style';
import { UserContext, MatchContext } from '../../../../contexts';
import { deleteUser, updateUser } from '../../../../api';
import { resetNavigation } from '../../../../helpers/navigation';
import { removeApiClientHeader } from '../../../../constants/api-client';

const AccountSettingScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const [userName, setUsername] = useState(user.userName);
  const [userEmail, setEmail] = useState(user.userEmail);
  const [, setMatch] = useContext(MatchContext);
  //  const [birthday] = useState('')
  //  const [location] = useState('')

  const onSubmit = async () => {
    try {
      const response = await updateUser({ userName, userEmail, userRole: 'lel' });
      setUser(response);
      navigation.pop();
    } catch (err) {
      Alert.alert('Error', 'There was an error during your profile update');
    }
  };

  const onDelete = () => {
    Alert.alert(
      'Are you sure ?',
      'This will delete your account forever',
      [
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser();
              await AsyncStorage.removeItem('AuthToken');
              await AsyncStorage.removeItem('MatchSettings');
              removeApiClientHeader('Authorization');
              setUser({});
              setMatch({});
              resetNavigation(navigation, 'AuthFlow');
            } catch (err) {
              Alert.alert('Error', 'There was an error deleting your account');
            }
          },
        },
        { text: 'No', style: 'cancel' },
      ],
    );
  };

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <KeyboardAwareScrollView
        bounces={false}
      >
        <View style={styles.header}>
          <SocialButton
            style={styles.arrowImage}
            iconStyle={styles.arrowIcon}
            icon={arrowLeft}
            onClick={() => navigation.pop()}
          />
          <Text style={styles.headerText}>
            Back
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <SocialButton
            style={styles.headerButton}
            iconStyle={styles.headerIcon}
            icon={cameraIcon}
            onClick={() => Alert.alert('Camera Clicked')}
          />
          <Image
            source={{ uri: user.userAvatarUrl }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          <SocialButton
            style={[styles.headerButton, styles.headerTrashButton]}
            iconStyle={styles.headerTrashIcon}
            icon={deleteIcon}
            onClick={onDelete}
          />
        </View>
        <CustomInput
          label="Name"
          value={userName}
          onUpdateValue={setUsername}
          icon={closeIcon}
          onClick={() => setUsername('')}
          iconVisible={userName.length > 0}
          borderColor={colors.grayOpacity}
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
        />
        <CustomInput
          label="Email"
          value={userEmail}
          onUpdateValue={setEmail}
          icon={closeIcon}
          onClick={() => setEmail('')}
          iconVisible={userEmail.length > 0}
          borderColor={colors.grayOpacity}
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
        />
        {/* <CustomInput
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
          /> */}
        <ConfirmButton
          containerStyle={styles.mv10}
          color={colors.loginColor}
          label="Save Changes"
          onClick={onSubmit}
        />
        <ConfirmButton
          containerStyle={styles.mv10}
          color={colors.ADSD}
          label="Get Back"
          onClick={() => navigation.pop()}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

AccountSettingScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default AccountSettingScreen;
