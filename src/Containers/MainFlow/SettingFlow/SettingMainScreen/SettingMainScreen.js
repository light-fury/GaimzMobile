/* eslint-disable react-native/no-inline-styles */
// @flow
import React from 'react';
import {
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
import styles from './SettingMainScreen.style';
import {colors} from '../../../../Assets/config';

class SettingMainScreen extends React.PureComponent {
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
          image: require('../../../../Assets/user_icon.png'),
          title: 'My Account',
          route: 'AccountSettingScreen',
        },
        {
          image: require('../../../../Assets/connection_icon.png'),
          title: 'Connection',
          route: 'ConnectionSettingScreen',
        },
        {
          image: require('../../../../Assets/help_icon.png'),
          title: 'Help',
          route: 'HelpSettingScreen',
        },
      ],
      focused: 0,
    };
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.props.navigation.navigate(item.route)}
        style={styles.itemContainer}>
        <SocialButton
          style={styles.itemButton}
          iconStyle={styles.itemIcon}
          icon={item.image}
          clickOpacity={2}
        />
        <Text style={[styles.profileName, styles.flexContainer]}>
          {item.title}
        </Text>
        <Image
          source={require('../../../../Assets/arrow_right.png')}
          resizeMode={'contain'}
          style={styles.arrowIcon}
        />
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
        <Text style={styles.titleText}>Settings</Text>
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

export default SettingMainScreen;
