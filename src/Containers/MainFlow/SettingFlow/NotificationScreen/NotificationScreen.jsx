// @flow
import React, { useState } from 'react';
import {
  Text, View, TouchableOpacity, FlatList, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import {
  arrowLeft,
  reloadIcon,
} from '../../../../Assets';
import styles from './NotificationScreen.style';
import HeaderComponent from '../../../../Components/HeaderComponent';

const renderItem = ({ item, index }) => (
  <TouchableOpacity
    key={index}
    style={styles.itemContainer}
    onPress={item.onPress}
  >
    <Text>test</Text>
  </TouchableOpacity>
);

const NotificationScreen = ({ navigation }) => {
  const [listData] = useState([]);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <HeaderComponent
        leftIcon={arrowLeft}
        leftClick={() => navigation.goBack()}
        leftIconStyle={styles.headerLeftIcon}
        label="NOTIFICATIONS"
      />
      <View style={styles.scrollIntent}>
        <View style={styles.rowContainer}>
          <Text style={styles.pageTitle}>Notifications</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>0</Text>
          </View>
        </View>
        {listData.length > 0 ? (
          <FlatList
            style={styles.flexContainer}
            contentContainerStyle={styles.scrollIntent}
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.host}-${index}`}
          />
        ) : (
          <View style={styles.flexCenterContainer}>
            <TouchableOpacity style={styles.reloadButton}>
              <Image style={styles.reloadIcon} resizeMode="contain" source={reloadIcon} />
            </TouchableOpacity>
            <Text style={styles.reloadText}>
              At the moment you do not have any other notifications
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

NotificationScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
};

export default NotificationScreen;
