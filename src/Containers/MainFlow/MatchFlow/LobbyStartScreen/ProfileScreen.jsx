// @flow
import React from 'react';
import {
  Text, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './LobbyStartScreen.style';
import {
  profileTempDota,
} from '../../../../Assets';

const ProfileComponent = ({ item, onClick }) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={onClick}
    style={styles.itemContainer}
  >
    <Text style={styles.profileText}>{item.team}</Text>
    <Image
      source={item.avatar}
      defaultSource={profileTempDota}
      style={[styles.profileImage, item.borderWidth > 0
        && { borderWidth: item.borderWidth, borderColor: item.borderColor },
      ]}
      resizeMode="cover"
    />
    <Text style={[styles.profileText, styles.mt8]}>{item.username}</Text>
  </TouchableOpacity>
);

ProfileComponent.propTypes = {
  item: PropTypes.shape().isRequired,
  onClick: PropTypes.func,
};

ProfileComponent.defaultProps = {
  onClick: () => {},
};

export default ProfileComponent;
