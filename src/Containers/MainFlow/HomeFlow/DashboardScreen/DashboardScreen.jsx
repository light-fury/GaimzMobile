// @flow
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';

import HeaderComponent from '../../../../Components/HeaderComponent';
import styles from './DashboardScreen.style';
import {
  eyeIcon,
  notificationIcon,
} from '../../../../Assets';
import { colors } from '../../../../Assets/config';
import { UserContext } from '../../../../contexts';
import { getTwitchLives } from '../../../../api';

const renderItem = ({ item, index }, navigation) => (
  <View key={index} style={styles.itemContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('StreamDetailScreen', { item })}>
      <ImageBackground
        style={styles.itemBackground}
        imageStyle={styles.itemImage}
        source={{ uri: item.twitchThumbnailUrl.replace('{width}', 512).replace('{height}', 287) }}
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
              item.twitchViewerCount >= 1000
                ? `${(item.twitchViewerCount / 1000).toFixed(1)}k`
                : item.twitchViewerCount
            } Viewers`}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
    <View style={styles.itemHostContainer}>
      <Image
        source={{ uri: `${item.userAvatarUrl}?${new Date()}` }}
        resizeMode="cover"
        style={styles.hostAvatar}
      />
      <View style={styles.hostDetailsContainer}>
        <Text style={[styles.profileName, styles.hostNameText]}>
          {item.twitchAccountName}
        </Text>
        <Text style={[styles.profileName, styles.gameTitleText]}>
          {item.gameName}
        </Text>
      </View>
    </View>
  </View>
);

const DashboardScreen = ({ navigation }) => {
  const [user] = useContext(UserContext);
  const [lives, setLives] = useState([]);

  const initLives = async () => {
    try {
      const response = await getTwitchLives();
      setLives(response);
    } catch (err) {
      // Ignore
    }
  };

  useEffect(() => {
    initLives();
  }, []);

  if (!user) {
    return (<></>);
  }

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <HeaderComponent
        label="HOME"
        rightIcon={notificationIcon}
        rightClick={() => Alert.alert('Bell Clicked')}
        rightIconStyle={styles.headerIcon}
      />
      <FlatList
        style={[styles.flexContainer, { backgroundColor: colors.lightGray }]}
        contentContainerStyle={styles.scrollIntent}
        data={lives}
        renderItem={(item) => renderItem(item, navigation)}
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
  navigation: PropTypes.shape().isRequired,
};

export default withNavigation(DashboardScreen);
