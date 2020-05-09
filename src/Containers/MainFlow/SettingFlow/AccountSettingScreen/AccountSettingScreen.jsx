// @flow
import React, { useContext, useState } from 'react';
import {
  Alert, Text, View, Image, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import { TouchableOpacity } from 'react-native-gesture-handler';
import SocialButton from '../../../../Components/SocialButton';
import CustomInput from '../../../../Components/CustomInput';
import ConfirmButton from '../../../../Components/ConfirmButton';
import { colors } from '../../../../Assets/config';
import {
  cameraIcon,
  deleteIcon,
  closeIcon,
} from '../../../../Assets';
import styles from './AccountSettingScreen.style';
import { UserContext } from '../../../../contexts';
import { deleteUser, updateUser } from '../../../../api';
import { resetNavigation } from '../../../../helpers/navigation';

const AccountSettingScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const [userName, setUsername] = useState(user.userName);
  const [userEmail, setEmail] = useState(user.userEmail);
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
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.innerContainer}
      >
        <TouchableOpacity style={styles.backContainer} onPress={() => navigation.pop()}>
          <Text style={styles.titleText}>&lt;  Back</Text>
        </TouchableOpacity>
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
            iconStyle={styles.headerIcon}
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
      </ScrollView>
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
