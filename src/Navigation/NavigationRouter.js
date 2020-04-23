// @flow

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  Platform,
} from 'react-native';

import WelcomeScreen from '../Containers/AuthFlow/WelcomeScreen';
import SignUpScreen from '../Containers/AuthFlow/SignUpScreen';
import DashboardScreen from '../Containers/MainFlow/HomeFlow/DashboardScreen';
import TabScreen from '../Components/TabScreen/TabScreen';
import styles from './NavigationRouter.style';
import {colors} from '../Assets/config';
import {store} from '../Containers/App';

export const MainNavigator = createStackNavigator(
  {
    AuthFlow: {
      screen: createStackNavigator({
        WelcomeScreen: {
          screen: WelcomeScreen,
          navigationOptions: () => ({
            header: null,
          }),
        },
        SignUpScreen: {
          screen: SignUpScreen,
          navigationOptions: () => ({
            header: null,
          }),
        },
      }),
      navigationOptions: () => ({
        header: null,
      }),
    },
    MainFlow: {
      screen: createBottomTabNavigator(
        {
          HomeFlow: {
            screen: createStackNavigator(
              {
                DashboardScreen: {
                  screen: DashboardScreen,
                  navigationOptions: ({navigation}) => ({
                    headerStyle: {backgroundColor: colors.primary},
                    headerTintColor: colors.white,
                  }),
                },
              },
              {
                headerMode: 'screen',
              },
            ),
            navigationOptions: ({navigation}) => {
              let {routeName} = navigation.state.routes[navigation.state.index];
              let navigationOptions = {
                header: null,
              };
              if (['ProfileDetailScreen'].indexOf(routeName) >= 0) {
                navigationOptions.tabBarVisible = false;
              }
              return navigationOptions;
            },
          },
        },
        {
          initialRouteName: 'HomeFlow',
          tabBarOptions: {
            labelPosition: 'below-icon',
            labelStyle: {
              fontSize: 12,
              lineHeight: 18,
              color: colors.gray,
            },
          },
          tabBarComponent: TabScreen,
          navigationOptions: () => ({
            headerStyle: {backgroundColor: colors.primary},
            headerTintColor: colors.white,
            header: null,
            gesturesEnabled: false,
          }),
        },
      ),
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      headerTitleStyle: {
        color: 'rgb(255,255,255)',
      },
      gestureEnabled: false,
    }),
    headerMode: 'screen',
    initialRouteName: 'AuthFlow',
  },
);

export const MainRouter = createAppContainer(MainNavigator);

export default MainRouter;
