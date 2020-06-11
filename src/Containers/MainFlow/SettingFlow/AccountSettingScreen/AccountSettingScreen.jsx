// @flow
import React, { useContext, useCallback } from 'react';
import {
  FlatList, Text, View, TouchableOpacity, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import {
  get,
} from 'lodash';

import SocialButton from '../../../../Components/SocialButton';
import {
  arrowLeft,
  editIcon,
} from '../../../../Assets';
import styles from './AccountSettingScreen.style';
import { UserContext } from '../../../../contexts';
import HeaderComponent from '../../../../Components/HeaderComponent';

const AccountSettingScreen = ({ navigation }) => {
  const [user] = useContext(UserContext);

  const handleUrl = async (url) => {
    try {
      if (url === 'userAvatarUrl') {
        navigation.navigate('AccountAvatarScreen');
        return;
      }
      navigation.navigate('AccountUpdateScreen', { field: url });
    } catch (error) {
      // console.log(error);
    }
  };

  const listData = [
    {
      onPress: handleUrl,
      title: 'Full Name',
      field: 'fullName',
    },
    {
      onPress: handleUrl,
      title: 'Username',
      field: 'userName',
    },
    {
      onPress: handleUrl,
      title: 'Birth Date',
      field: 'birthDate',
    },
    {
      onPress: handleUrl,
      title: 'Account Status',
      field: 'userRole',
    },
    {
      onPress: handleUrl,
      title: 'Email address',
      field: 'userEmail',
    },
    {
      onPress: handleUrl,
      title: 'Password',
      field: 'password',
    },
    {
      onPress: handleUrl,
      title: 'Language',
      field: 'language',
    },
    {
      onPress: handleUrl,
      title: 'Avatar',
      field: 'userAvatarUrl',
    },
  ];

  const getDescriptionText = useCallback((item) => {
    switch (item.field) {
      case 'password':
        return 'Change your password';
      case 'birthDate':
        return get(user, item.field) || 'DD.MM.YYYY';
      case 'userAvatarUrl':
        return 'Upload your picture';
      default:
        return get(user, item.field);
    }
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.itemContainer}
      onPress={() => item.onPress(item.field)}
    >
      <View style={styles.flexContainer}>
        <Text style={styles.headerNameText}>
          {item.title}
        </Text>
        <Text style={styles.itemDescriptionText}>
          {getDescriptionText(item)}
        </Text>
      </View>
      <SocialButton
        style={styles.itemButton}
        iconStyle={styles.itemIcon}
        icon={editIcon}
        clickOpacity={2}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <HeaderComponent
        rightStyle={styles.rightButton}
        rightIconStyle={styles.headerRightIcon}
        rightClick={() => navigation.goBack()}
        leftIcon={arrowLeft}
        leftClick={() => navigation.goBack()}
        leftIconStyle={styles.headerLeftIcon}
      >
        <View style={styles.headerContainer}>
          <ImageBackground source={{ uri: `${user.userAvatarUrl}?${new Date()}` || '' }} style={styles.avatarImage} imageStyle={styles.flexContainer}>
            <View style={styles.onlineStatus} />
          </ImageBackground>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerNameText}>{user.userName}</Text>
            <Text style={[styles.headerNameText, styles.grayText]}>Online</Text>
          </View>
        </View>
      </HeaderComponent>
      <FlatList
        style={styles.flexContainer}
        contentContainerStyle={styles.scrollIntent}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.host}-${index}`}
      />
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
