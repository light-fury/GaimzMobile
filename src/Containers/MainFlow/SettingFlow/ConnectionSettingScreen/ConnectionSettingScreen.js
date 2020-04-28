/* eslint-disable react-native/no-inline-styles */
// @flow
import React from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import SocialButton from '../../../../Components/SocialButton';
import styles from './ConnectionSettingScreen.style';

class ConnectionSettingScreen extends React.PureComponent {
  static propTypes = {
    Secrets: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      secretsData: PropTypes.shape(),
      error: PropTypes.any,
    }).isRequired,
    navigation: PropTypes.shape().isRequired,
    createSecretsData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      listData: [
        {
          image: require('../../../../Assets/steam_icon.png'),
          title: 'STEAM',
          route: 'AccountSettingScreen',
          connected: true,
        },
        {
          image: require('../../../../Assets/twitch_icon.png'),
          title: 'TWITCH',
          route: 'ConnectionSettingScreen',
          connected: false,
        },
      ],
      focused: 0,
    };
  }

  renderItem = ({item, index}) => {
    return (
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
              source={require('../../../../Assets/check_white_icon.png')}
              resizeMode={'contain'}
              style={styles.arrowConnectedIcon}
            />
          </View>
        ) : (
          <Image
            source={require('../../../../Assets/arrow_right.png')}
            resizeMode={'contain'}
            style={styles.arrowIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const {listData} = this.state;

    return (
      <SafeAreaView
        forceInset={{bottom: 'never', top: 'never'}}
        style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../../../Assets/template_profile.png')}
            style={styles.avatarImage}
            resizeMode={'cover'}
          />
          <Text style={[styles.flexContainer, styles.profileName]}>
            Aladin Ben
          </Text>
          <SocialButton
            style={styles.headerButton}
            iconStyle={styles.headerIcon}
            icon={require('../../../../Assets/settings_icon.png')}
            onClick={() => alert('Bell Clicked')}
          />
        </View>
        <Text style={styles.titleText}>Connections</Text>
        <FlatList
          style={styles.flexContainer}
          contentContainerStyle={styles.scrollIntent}
          data={listData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${item.host}-${index}`}
        />
      </SafeAreaView>
    );
  }
}

export default ConnectionSettingScreen;
