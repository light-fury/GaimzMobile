import React, {Component} from 'react';
import {NavigationActions, StackActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import IIcon from 'react-native-vector-icons/Ionicons';

import {removeSecretsData} from '../../State/Secrets/Actions';
import styles from './TabScreen.style';
import {colors} from '../../Assets/config';

class TabScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        {
          title: 'Home',
          routeName: 'DashboardScreen',
        },
        {
          title: 'Train',
          routeName: 'TrainFlow',
        },
        {
          title: 'Meals',
          routeName: 'ProfileFlow',
        },
        {
          title: 'Gallery',
          routeName: 'GalleryFlow',
        },
      ],
    };
  }

  navigateToScreen = (route) => {
    const {navigation, removeSecretsData} = this.props;
    if (route === 'LogOut') {
      removeSecretsData();

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
          mainRoutes[0].index !== 0 &&
          mainRoutes[0].routes &&
          mainRoutes[0].routes.length > 1
        ) {
          navigation.dispatch(StackActions.popToTop());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const {Secrets, navigation} = this.props;
    const {routes} = this.state;
    const currentRoutes = navigation.state.routes || [];
    return (
      <View style={styles.flexStyle}>
        {routes.map((item) => (
          <TouchableOpacity
            key={item.routeName}
            onPress={() => this.navigateToScreen(item.routeName)}
            style={[
              styles.tabItem,
              currentRoutes.length > 0 &&
                currentRoutes[navigation.state.index || 0].routeName ===
                  item.routeName && {
                  borderTopColor: colors.primary,
                },
            ]}>
            <Text
              style={[
                styles.tabItemTitle,
                currentRoutes.length > 0 &&
                  currentRoutes[navigation.state.index || 0].routeName ===
                    item.routeName && {
                    color: colors.primary,
                  },
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

TabScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  Secrets: PropTypes.shape().isRequired,
  removeSecretsData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Secrets: JSON.parse(JSON.stringify(state.Secrets)),
});

const mapDispatchToProps = (dispatch) => ({
  removeSecretsData: () => {
    dispatch(removeSecretsData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TabScreen);
