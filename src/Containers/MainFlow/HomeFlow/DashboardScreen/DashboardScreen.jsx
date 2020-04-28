// @flow
import React, { useContext } from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import SocialButton from '../../../../Components/SocialButton';
import styles from './DashboardScreen.style';
import {
  templateImage,
  templateAvatar,
  eyeIcon,
  searchIcon,
  notificationIcon,
} from '../../../../Assets';
import { colors } from '../../../../Assets/config';
import { UserContext } from '../../../../contexts';

const listData = [
  {
    image: templateImage,
    host: 'UserName1',
    hostAvatar: templateAvatar,
    gameTitle: 'Dota 2',
    viewCount: 2500,
  },
  {
    image: templateImage,
    host: 'UserName2',
    hostAvatar: templateAvatar,
    gameTitle: 'Dota 2',
    viewCount: 2500,
  },
  {
    image: templateImage,
    host: 'UserName3',
    hostAvatar: templateAvatar,
    gameTitle: 'Dota 2',
    viewCount: 2500,
  },
  {
    image: templateImage,
    host: 'UserName4',
    hostAvatar: templateAvatar,
    gameTitle: 'Dota 2',
    viewCount: 500,
  },
];

const renderItem = ({ item, index }) => (
  <View key={index} style={styles.itemContainer}>
    <TouchableOpacity>
      <ImageBackground
        style={styles.itemBackground}
        imageStyle={styles.itemImage}
        source={item.image}
        resizeMode="cover"
      >
        <View style={styles.statusContainer}>
          <Image
            source={eyeIcon}
            resizeMode="contain"
            style={styles.eyeIcon}
          />
          <Text style={styles.statusText}>
            {`${
              item.viewCount >= 1000
                ? `${(item.viewCount / 1000).toFixed(1)}k`
                : item.viewCount
            } Viewers`}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
    <View style={styles.itemHostContainer}>
      <Image
        source={item.hostAvatar}
        resizeMode="cover"
        style={styles.hostAvatar}
      />
      <View style={styles.hostDetailsContainer}>
        <Text style={[styles.profileName, styles.hostNameText]}>
          {item.host}
        </Text>
        <Text style={[styles.profileName, styles.gameTitleText]}>
          {item.gameTitle}
        </Text>
      </View>
    </View>
  </View>
);

const DashboardScreen = () => {
  const [user] = useContext(UserContext);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={templateImage}
          style={styles.avatarImage}
          resizeMode="cover"
        />
        <Text style={[styles.flexContainer, styles.profileName]}>
          {user.userName}
        </Text>
        <SocialButton
          style={styles.headerButton}
          iconStyle={styles.headerIcon}
          icon={searchIcon}
          onClick={() => Alert.alert('Search Clicked')}
        />
        <SocialButton
          style={styles.headerButton}
          iconStyle={styles.headerIcon}
          icon={notificationIcon}
          onClick={() => Alert.alert('Bell Clicked')}
        />
      </View>
      <FlatList
        style={[styles.flexContainer, { backgroundColor: colors.lightGray }]}
        contentContainerStyle={styles.scrollIntent}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.host}-${index}`}
      />
    </SafeAreaView>
  );
};

DashboardScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
};

export default DashboardScreen;
