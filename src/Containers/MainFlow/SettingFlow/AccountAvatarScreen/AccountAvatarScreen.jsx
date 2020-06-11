/* eslint-disable no-undef */
// @flow
import React, { useContext, useCallback, useState } from 'react';
import {
  Image, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import SafeAreaView from 'react-native-safe-area-view';

import {
  arrowLeft,
} from '../../../../Assets';
import styles from './AccountAvatarScreen.style';
import { UserContext } from '../../../../contexts';
import HeaderComponent from '../../../../Components/HeaderComponent';
import ConfirmButton from '../../../../Components/ConfirmButton';
import LoadingComponent from '../../../../Components/LoadingComponent';
import {
  colors,
} from '../../../../Assets/config';
import { updateAvatar } from '../../../../api/user';

const options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  maxHeight: 300,
  quality: 0.5,
};

const AccountAvatarScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);

  const saveValue = useCallback(async () => {
    try {
      setLoading(true);
      ImagePicker.showImagePicker(options, async (response) => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          try {
            const formData = new FormData();
            formData.append('avatar', {
              name: response.name || 'avatar.jpg',
              type: response.type,
              uri:
                Platform.OS === 'android'
                  ? response.uri
                  : response.uri.replace('file://', ''),
            });
            const res = await updateAvatar(formData);
            setUser(res);
          } catch (error) {
            // console.log('Image upload error', error);
          }
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  });

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <HeaderComponent
        label="Avatar Change"
        rightClick={() => navigation.goBack()}
        leftIcon={arrowLeft}
        leftClick={() => navigation.goBack()}
        leftIconStyle={styles.headerLeftIcon}
      />
      <Image source={{ uri: `${user.userAvatarUrl}?${new Date()}` || '' }} style={styles.avatarImage} />
      <ConfirmButton
        color={colors.loginColor}
        borderColor={colors.transparent}
        textColor={colors.gray}
        label="Change avatar"
        onClick={saveValue}
        fontStyle={[styles.headerNameText, styles.buttonText]}
        containerStyle={styles.absolutePos}
      />
      {isLoading && (
        <LoadingComponent />
      )}
    </SafeAreaView>
  );
};

AccountAvatarScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default AccountAvatarScreen;
