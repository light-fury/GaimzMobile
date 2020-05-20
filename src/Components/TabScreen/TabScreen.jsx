import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import SocialButton from '../SocialButton';
import { removeSecretsData } from '../../State/Secrets/Actions';
import styles from './TabScreen.style';
import { homeIcon, matchIcon, settingsIcon } from '../../Assets';
import { colors } from '../../Assets/config';

class TabScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        {
          title: 'Home',
          routeName: 'HomeFlow',
          icon: homeIcon,
        },
        {
          title: 'Match Up',
          routeName: 'MatchFlow',
          icon: matchIcon,
        },
        {
          title: 'Settings',
          routeName: 'SettingFlow',
          icon: settingsIcon,
        },
      ],
    };
  }

  navigateToScreen(route) {
    const { navigation, storeRemoveSecretsData } = this.props;
    if (route === 'LogOut') {
      storeRemoveSecretsData();

      // Immediately reload the React Native Bundle
      // RNRestart.Restart();
      navigation.popToTop();
      if (navigation.dangerouslyGetParent()) {
        if (navigation.dangerouslyGetParent().dangerouslyGetParent()) {
          navigation.dangerouslyGetParent().dangerouslyGetParent().goBack();
        }
      }
      return;
    }
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    navigation.dispatch(navigateAction);
  }

  render() {
    const { navigation } = this.props;
    const { routes } = this.state;
    const currentRoutes = navigation.state.routes || [];
    return (
      <View style={styles.flexStyle}>
        {routes.map((item) => {
          const selected = currentRoutes.length > 0
            && currentRoutes[navigation.state.index || 0].routeName
              === item.routeName;
          return (
            <TouchableOpacity
              key={item.routeName}
              onPress={() => this.navigateToScreen(item.routeName)}
              style={styles.tabItem}
            >
              <SocialButton
                style={[
                  styles.tabButton,
                  selected && { backgroundColor: colors.steamBlack },
                ]}
                iconStyle={[
                  styles.tabIcon,
                  selected && { tintColor: colors.white },
                ]}
                icon={item.icon}
                onClick={() => this.navigateToScreen(item.routeName)}
              />
              <Text style={[styles.titleText, selected && styles.titleFocused]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

TabScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  storeRemoveSecretsData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  storeRemoveSecretsData: () => {
    dispatch(removeSecretsData());
  },
});

export default connect(null, mapDispatchToProps)(TabScreen);
