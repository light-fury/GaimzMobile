/* eslint-disable react-native/no-inline-styles */
// @flow
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import IIcon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';

import SocialButton from '../../../../Components/SocialButton';
import styles from './DashboardScreen.style';
import {colors, baseUrl} from '../../../../Assets/config';
import Axios from 'axios';

class DashboardScreen extends React.PureComponent {
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
    const {
      Secrets: {secretsData},
    } = props;
    this.state = {
      fullname: '',
      email: '',
      listData: [
        {
          image: require('../../../../Assets/template_image.png'),
          host: 'UserName1',
          hostAvatar: require('../../../../Assets/template_avatar.png'),
          gameTitle: 'Dota 2',
          viewCount: 2500,
        },
        {
          image: require('../../../../Assets/template_image.png'),
          host: 'UserName2',
          hostAvatar: require('../../../../Assets/template_avatar.png'),
          gameTitle: 'Dota 2',
          viewCount: 2500,
        },
        {
          image: require('../../../../Assets/template_image.png'),
          host: 'UserName3',
          hostAvatar: require('../../../../Assets/template_avatar.png'),
          gameTitle: 'Dota 2',
          viewCount: 2500,
        },
        {
          image: require('../../../../Assets/template_image.png'),
          host: 'UserName4',
          hostAvatar: require('../../../../Assets/template_avatar.png'),
          gameTitle: 'Dota 2',
          viewCount: 500,
        },
      ],
      focused: 0,
    };
  }

  renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <TouchableOpacity>
          <ImageBackground
            style={styles.itemBackground}
            imageStyle={styles.itemImage}
            source={item.image}
            resizeMode={'cover'}>
            <View style={styles.statusContainer}>
              <Image
                source={require('../../../../Assets/eye_icon.png')}
                resizeMode={'contain'}
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
            resizeMode={'cover'}
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
  };

  render() {
    const {fullname, email, listData} = this.state;
    const {
      Secrets: {isFetching},
      navigation,
    } = this.props;

    return (
      <SafeAreaView
        forceInset={{bottom: 'never', top: 'never'}}
        style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../../../Assets/template_image.png')}
            style={styles.avatarImage}
            resizeMode={'cover'}
          />
          <Text style={[styles.flexContainer, styles.profileName]}>
            Aladin Ben
          </Text>
          <SocialButton
            style={styles.headerButton}
            iconStyle={styles.headerIcon}
            icon={require('../../../../Assets/search_icon.png')}
            onClick={() => alert('Search Clicked')}
          />
          <SocialButton
            style={styles.headerButton}
            iconStyle={styles.headerIcon}
            icon={require('../../../../Assets/notification_icon.png')}
            onClick={() => alert('Bell Clicked')}
          />
        </View>
        <FlatList
          style={[styles.flexContainer, {backgroundColor: colors.lightGray}]}
          contentContainerStyle={styles.scrollIntent}
          data={listData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${item.host}-${index}`}
        />
      </SafeAreaView>
    );
  }
}

export default DashboardScreen;
