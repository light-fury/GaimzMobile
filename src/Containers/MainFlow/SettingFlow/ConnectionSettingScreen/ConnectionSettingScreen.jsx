// @flow
import React, { useContext } from 'react';
import {
  Alert, Text, View, TouchableOpacity, Image, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import {
  steamIcon,
  twitchIcon,
  checkWhiteIcon,
  arrowRight,
  settingsIcon,
} from '../../../../Assets';
import SocialButton from '../../../../Components/SocialButton';
import styles from './ConnectionSettingScreen.style';
import { UserContext } from '../../../../contexts';

const renderItem = ({ item, index }) => (
  <TouchableOpacity key={index} style={styles.itemContainer}>
    <SocialButton
      style={styles.itemButton}
      iconStyle={styles.itemIcon}
      icon={item.image}
      clickOpacity={2}
    />
    <Text style={[styles.profileName, styles.flexContainer]}>
      {item.title}
    </Text>
    {item.connected ? (
      <View style={styles.arrowConnectedContainer}>
        <Image
          source={checkWhiteIcon}
          resizeMode="contain"
          style={styles.arrowConnectedIcon}
        />
      </View>
    ) : (
      <Image
        source={arrowRight}
        resizeMode="contain"
        style={styles.arrowIcon}
      />
    )}
  </TouchableOpacity>
);

const listData = [
  {
    image: steamIcon,
    title: 'STEAM',
    route: 'AccountSettingScreen',
    connected: true,
  },
  {
    image: twitchIcon,
    title: 'TWITCH',
    route: 'ConnectionSettingScreen',
    connected: false,
  },
];

const ConnectionSettingScreen = () => {
  const [user] = useContext(UserContext);
  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: user.userAvatarUrl }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
        <Text style={[styles.flexContainer, styles.profileName]}>
          {user.userName}
        </Text>
        <SocialButton
          style={styles.headerButton}
          iconStyle={styles.headerIcon}
          icon={settingsIcon}
          onClick={() => Alert.alert('Bell Clicked')}
        />
      </View>
      <Text style={styles.titleText}>Connections</Text>
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

ConnectionSettingScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
};

export default ConnectionSettingScreen;
