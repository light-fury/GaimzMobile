// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './MatchMainScreen.style';
import { colors, calcReal } from '../../../../Assets/config';
import { dotaBackground } from '../../../../Assets';

const { width } = Dimensions.get('window');

const listData = [
  {
    image: dotaBackground,
    gameTitle: 'Dota 2',
  },
  {
    image: dotaBackground,
    gameTitle: 'Dota 2',
  },
  {
    image: dotaBackground,
    gameTitle: 'Dota 2',
  },
  {
    image: dotaBackground,
    gameTitle: 'Dota 2',
  },
];

const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity>
      <ImageBackground
        style={styles.itemBackground}
        imageStyle={styles.itemImage}
        source={item.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  </View>
);

const MatchMainScreen = ({ navigation }) => (
  <SafeAreaView
    forceInset={{ bottom: 'never', top: 'never' }}
    style={styles.container}
  >
    <View style={styles.header}>
      <Text style={styles.profileName}>
        Connect your steam account first
      </Text>
    </View>
    <FlatList
      style={styles.flexContainer}
      contentContainerStyle={styles.scrollIntent}
      data={listData}
      horizontal
      pagingEnabled
      getItemLayout={(data, index) => ({
        length: width - calcReal(48),
        offset: (width - calcReal(48)) * index,
        index,
      })}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.gameTitle}-${index}`}
    />
    <ConfirmButton
      color={colors.loginColor}
      label="FIND MATCH"
      onClick={() => navigation.navigate('MatchTimerScreen')}
      fontStyle={styles.fontSpacing}
      containerStyle={styles.mh48}
    />
    <View style={styles.space} />
    <ConfirmButton
      borderColor={colors.secondaryOpacity}
      textColor={colors.grayText}
      label="SETTINGS"
      onClick={() => navigation.navigate('MatchSettingScreen')}
      fontStyle={styles.fontSpacing}
      containerStyle={styles.mh48}
    />
    <View style={styles.space} />
  </SafeAreaView>
);

MatchMainScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default MatchMainScreen;
