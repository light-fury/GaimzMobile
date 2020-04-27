import React, { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import SocialButton from '../SocialButton';
import { removeSecretsData } from '../../State/Secrets/Actions';
import styles from './TabScreen.style';
import { colors } from '../../Assets/config';

class TabScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        {
          title: 'Home',
          routeName: 'HomeFlow',
          icon: require('../../Assets/home_icon.png'),
        },
        {
          title: 'Match',
          routeName: 'MatchFlow',
          icon: require('../../Assets/match_icon.png'),
        },
        {
          title: 'Setting',
          routeName: 'SettingFlow',
          icon: require('../../Assets/settings_icon.png'),
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
    if (route === 'ExploreFlow') {
      try {
        const mainRoutes = navigation.state.routes;
        if (
          mainRoutes[0].index !== 0
          && mainRoutes[0].routes
          && mainRoutes[0].routes.length > 1
        ) {
          navigation.dispatch(StackActions.popToTop());
        }
      } catch (error) {}
    }
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
                  selected && { backgroundColor: colors.secondary },
                ]}
                iconStyle={[
                  styles.tabIcon,
                  selected && { tintColor: colors.white },
                ]}
                icon={item.icon}
                onClick={() => this.navigateToScreen(item.routeName)}
              />
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
