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
// Auth Flow
import WelcomeScreen from '../Containers/AuthFlow/WelcomeScreen';
import SignUpScreen from '../Containers/AuthFlow/SignUpScreen';
import ForgotPasswordScreen from '../Containers/AuthFlow/ForgotPasswordScreen';
// Main Flow
// Home Flow
import DashboardScreen from '../Containers/MainFlow/HomeFlow/DashboardScreen';
// Match Flow
import MatchMainScreen from '../Containers/MainFlow/MatchFlow/MatchMainScreen';
import MatchSettingScreen from '../Containers/MainFlow/MatchFlow/MatchSettingScreen';
import TabScreen from '../Components/TabScreen/TabScreen';
import styles from './NavigationRouter.style';
import {colors, calcReal} from '../Assets/config';
import {store} from '../Containers/App';

export const MainNavigator = createStackNavigator(
  {
    AuthFlow: {
      screen: createStackNavigator({
        WelcomeScreen: {
          screen: WelcomeScreen,
          navigationOptions: () => ({
            headerShown: false,
          }),
        },
        SignUpScreen: {
          screen: SignUpScreen,
          navigationOptions: () => ({
            headerShown: false,
          }),
        },
        ForgotPasswordScreen: {
          screen: ForgotPasswordScreen,
          navigationOptions: () => ({
            headerShown: false,
          }),
        },
      }),
      navigationOptions: () => ({
        headerShown: false,
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
                    headerShown: false,
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
                headerShown: false,
              };
              if (['ProfileDetailScreen'].indexOf(routeName) >= 0) {
                navigationOptions.tabBarVisible = false;
              }
              return navigationOptions;
            },
          },
          MatchFlow: {
            screen: createStackNavigator(
              {
                MatchMainScreen: {
                  screen: MatchMainScreen,
                  navigationOptions: ({navigation}) => ({
                    headerShown: false,
                  }),
                },
                MatchSettingScreen: {
                  screen: MatchSettingScreen,
                  navigationOptions: ({navigation}) => ({
                    headerShown: false,
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
                headerShown: false,
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
            headerShown: false,
            gestureEnabled: false,
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
