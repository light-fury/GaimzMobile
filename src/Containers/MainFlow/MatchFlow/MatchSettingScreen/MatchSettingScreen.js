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
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import IIcon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './MatchSettingScreen.style';
import {colors, calcReal} from '../../../../Assets/config';
import Axios from 'axios';

const {width, height} = Dimensions.get('window');

class MatchSettingScreen extends React.PureComponent {
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
      listData: [
        {
          image: require('../../../../Assets/dota_background.png'),
          gameTitle: 'Dota 2',
        },
        {
          image: require('../../../../Assets/dota_background.png'),
          gameTitle: 'Dota 2',
        },
        {
          image: require('../../../../Assets/dota_background.png'),
          gameTitle: 'Dota 2',
        },
        {
          image: require('../../../../Assets/dota_background.png'),
          gameTitle: 'Dota 2',
        },
      ],
      focused: 0,
    };
  }

  renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity>
          <ImageBackground
            style={styles.itemBackground}
            imageStyle={styles.itemImage}
            source={item.image}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {listData} = this.state;
    const {
      Secrets: {isFetching},
      navigation,
    } = this.props;

    return (
      <SafeAreaView
        forceInset={{bottom: 'never', top: 'never'}}
        style={styles.container}>
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
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${item.gameTitle}-${index}`}
        />
        <ConfirmButton
          color={colors.loginColor}
          label={'FIND MATCH'}
          onClick={() => alert('Find Match')}
          fontStyle={styles.fontSpacing}
          containerStyle={styles.mh48}
        />
        <View style={styles.space} />
        <ConfirmButton
          borderColor={colors.secondaryOpacity}
          textColor={colors.grayText}
          label={'SETTINGS'}
          onClick={() => alert('Settings')}
          fontStyle={styles.fontSpacing}
          containerStyle={styles.mh48}
        />
        <View style={styles.space} />
      </SafeAreaView>
    );
  }
}

export default MatchSettingScreen;
