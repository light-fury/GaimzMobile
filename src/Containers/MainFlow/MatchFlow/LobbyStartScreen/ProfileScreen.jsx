// @flow
import React from 'react';
import {
  Text, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './LobbyStartScreen.style';
import {
  profileTempDota,
} from '../../../../Assets';

const ProfileComponent = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.profileText}>{item.team}</Text>
    <Image source={{ uri: item.avatar }} defaultSource={profileTempDota} style={styles.profileImage} resizeMode="cover" />
    <Text style={[styles.profileText, styles.mt8]}>{item.username}</Text>
  </View>
);

ProfileComponent.propTypes = {
  item: PropTypes.shape().isRequired,
};

export default ProfileComponent;
