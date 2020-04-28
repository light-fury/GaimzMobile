// @flow
import React from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';

import {
  userIcon,
  connectionIcon,
  helpIcon,
  arrowRight,
  templateProfile,
  settingsIcon,
} from '../../../../Assets';
import SocialButton from '../../../../Components/SocialButton';
import styles from './SettingMainScreen.style';

class SettingMainScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listData: [
        {
          image: userIcon,
          title: 'My Account',
          route: 'AccountSettingScreen',
        },
        {
          image: connectionIcon,
          title: 'Connection',
          route: 'ConnectionSettingScreen',
        },
        {
          image: helpIcon,
          title: 'Help',
          route: 'HelpSettingScreen',
        },
      ],
    };
  }

  renderItem({ item, index }) {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate(item.route)}
        style={styles.itemContainer}
      >
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
          source={arrowRight}
          resizeMode="contain"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { listData } = this.state;

    return (
      <SafeAreaView
        forceInset={{ bottom: 'never', top: 'never' }}
        style={styles.container}
      >
        <View style={styles.header}>
          <Image
            source={templateProfile}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          <Text style={[styles.flexContainer, styles.profileName]}>
            Aladin Ben
          </Text>
          <SocialButton
            style={styles.headerButton}
            iconStyle={styles.headerIcon}
            icon={settingsIcon}
            onClick={() => Alert.alert('Bell Clicked')}
          />
        </View>
        <Text style={styles.titleText}>Settings</Text>
        <FlatList
          style={styles.flexContainer}
          contentContainerStyle={styles.scrollIntent}
          data={listData}
          renderItem={(data) => this.renderItem(data)}
          keyExtractor={(item, index) => `${item.host}-${index}`}
        />
      </SafeAreaView>
    );
  }
}

SettingMainScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default SettingMainScreen;
