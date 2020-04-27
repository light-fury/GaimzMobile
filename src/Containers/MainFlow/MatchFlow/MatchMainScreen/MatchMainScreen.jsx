// @flow
import React from 'react';
import {
  Alert,
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

const { width } = Dimensions.get('window');

class MatchMainScreen extends React.PureComponent {
  constructor(props) {
    super(props);
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
    };
  }

  renderItem({ item }) {
    return (
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
  }

  render() {
    const { listData } = this.state;
    const { navigation } = this.props;

    return (
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
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${item.gameTitle}-${index}`}
        />
        <ConfirmButton
          color={colors.loginColor}
          label="FIND MATCH"
          onClick={() => Alert.alert('Find Match')}
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
  }
}

MatchMainScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default MatchMainScreen;
