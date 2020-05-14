// @flow
import React, { useContext, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';

import {
  userIcon,
  connectionIcon,
  arrowRight,
  logoutIcon,
} from '../../../../Assets';
import SocialButton from '../../../../Components/SocialButton';
import styles from './SettingMainScreen.style';
import { UserContext, MatchContext } from '../../../../contexts';
import { resetNavigation } from '../../../../helpers/navigation';
import { removeApiClientHeader } from '../../../../constants/api-client';


const listData = [
  {
    image: userIcon,
    title: 'My Account',
    route: 'AccountSettingScreen',
  },
  {
    image: connectionIcon,
    title: 'Connection',
    route: 'ConnectionSettingScreen',
  },
  {
    image: logoutIcon,
    title: 'Logout',
    route: 'Logout',
  },
];

const SettingMainScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const [, setMatch] = useContext(MatchContext);

  const handleNavigation = useCallback(async (route) => {
    if (route === 'Logout') {
      await AsyncStorage.removeItem('AuthToken');
      await AsyncStorage.removeItem('MatchSettings');
      setUser({});
      setMatch({});
      removeApiClientHeader('Authorization');
      resetNavigation(navigation, 'AuthFlow');
    } else {
      navigation.navigate(route);
    }
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleNavigation(item.route)}
      style={styles.itemContainer}
    >
      <SocialButton
        style={styles.itemButton}
        iconStyle={styles.itemIcon}
        icon={item.image}
        clickOpacity={2}
      />
      <Text style={[styles.profileName, styles.flexContainer]}>
        {item.title}
      </Text>
      {item.title !== 'Logout' && (
        <Image
          source={arrowRight}
          resizeMode="contain"
          style={styles.arrowIcon}
        />
      )}
    </TouchableOpacity>
  );


  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={[styles.flexContainer, styles.profileName, styles.textRight]}>
          {user.userName}
        </Text>
        <SocialButton
          style={styles.avatarImage}
          iconStyle={styles.avatarImage}
          icon={{ uri: user.userAvatarUrl }}
          clickOpacity={1}
          onClick={() => navigation.navigate('AccountScreen')}
        />
        {/* <SocialButton
          style={styles.headerButton}
          iconStyle={styles.headerIcon}
          icon={settingsIcon}
          onClick={() => navigation.pop()}
        /> */}
      </View>
      <Text style={styles.titleText}>Settings</Text>
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

SettingMainScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default SettingMainScreen;
