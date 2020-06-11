// @flow

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// Auth Flow
import WelcomeScreen from '../Containers/AuthFlow/WelcomeScreen';
import SignUpScreen from '../Containers/AuthFlow/SignUpScreen';
import ForgotPasswordScreen from '../Containers/AuthFlow/ForgotPasswordScreen';
import SocialAccountsScreen from '../Containers/AuthFlow/SocialAccountsScreen';
// Main Flow
// Home Flow
import DashboardScreen from '../Containers/MainFlow/HomeFlow/DashboardScreen';
import StreamDetailScreen from '../Containers/MainFlow/HomeFlow/StreamDetailScreen';
// Match Flow
import MatchSettingScreen from '../Containers/MainFlow/MatchFlow/MatchSettingScreen';
import MatchSearchScreen from '../Containers/MainFlow/MatchFlow/MatchSearchScreen';
import MatchPasswordScreen from '../Containers/MainFlow/MatchFlow/MatchPasswordScreen';
import MatchErrorScreen from '../Containers/MainFlow/MatchFlow/MatchErrorScreen';
import MatchTimerScreen from '../Containers/MainFlow/MatchFlow/MatchTimerScreen';
import MatchReadyScreen from '../Containers/MainFlow/MatchFlow/MatchReadyScreen';
import LobbyStartScreen from '../Containers/MainFlow/MatchFlow/LobbyStartScreen';
// Home Flow
import SettingMainScreen from '../Containers/MainFlow/SettingFlow/SettingMainScreen';
import AccountScreen from '../Containers/MainFlow/SettingFlow/AccountScreen';
import HelpScreen from '../Containers/MainFlow/SettingFlow/HelpScreen';
import ContactScreen from '../Containers/MainFlow/SettingFlow/ContactScreen';
import ConnectionSettingScreen from '../Containers/MainFlow/SettingFlow/ConnectionSettingScreen';
import AccountSettingScreen from '../Containers/MainFlow/SettingFlow/AccountSettingScreen';
import AccountUpdateScreen from '../Containers/MainFlow/SettingFlow/AccountUpdateScreen';
import AccountAvatarScreen from '../Containers/MainFlow/SettingFlow/AccountAvatarScreen';
import TabScreen from '../Components/TabScreen/TabScreen';
import { colors } from '../Assets/config';

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
        SocialAccountsScreen: {
          screen: SocialAccountsScreen,
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
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                StreamDetailScreen: {
                  screen: StreamDetailScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
              },
              {
                headerMode: 'screen',
              },
            ),
            navigationOptions: ({ navigation }) => {
              const { routeName } = navigation.state.routes[navigation.state.index];
              const navigationOptions = {
                headerShown: false,
              };
              if (['StreamDetailScreen'].indexOf(routeName) >= 0) {
                navigationOptions.tabBarVisible = false;
              }
              return navigationOptions;
            },
          },
          MatchFlow: {
            screen: createStackNavigator(
              {
                MatchSettingScreen: {
                  screen: MatchSettingScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                MatchSearchScreen: {
                  screen: MatchSearchScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                MatchPasswordScreen: {
                  screen: MatchPasswordScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                MatchErrorScreen: {
                  screen: MatchErrorScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                MatchTimerScreen: {
                  screen: MatchTimerScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                MatchReadyScreen: {
                  screen: MatchReadyScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                LobbyStartScreen: {
                  screen: LobbyStartScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
              },
              {
                headerMode: 'screen',
                initialRouteKey: 'MatchSettingScreen',
                initialRouteName: 'MatchSettingScreen',
              },
            ),
            navigationOptions: ({ navigation }) => {
              const { routeName } = navigation.state.routes[navigation.state.index];
              const navigationOptions = {
                headerShown: false,
              };
              if (['LobbyStartScreen'].indexOf(routeName) >= 0) {
                navigationOptions.tabBarVisible = false;
              }
              return navigationOptions;
            },
          },
          SettingFlow: {
            screen: createStackNavigator(
              {
                AccountScreen: {
                  screen: AccountScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                SettingMainScreen: {
                  screen: SettingMainScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                ConnectionSettingScreen: {
                  screen: ConnectionSettingScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                AccountSettingScreen: {
                  screen: AccountSettingScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                AccountUpdateScreen: {
                  screen: AccountUpdateScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                AccountAvatarScreen: {
                  screen: AccountAvatarScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                HelpScreen: {
                  screen: HelpScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
                ContactScreen: {
                  screen: ContactScreen,
                  navigationOptions: () => ({
                    headerShown: false,
                  }),
                },
              },
              {
                headerMode: 'screen',
                initialRouteName: 'AccountScreen',
              },
            ),
            navigationOptions: ({ navigation }) => {
              const { routeName } = navigation.state.routes[navigation.state.index];
              const navigationOptions = {
                headerShown: false,
              };
              if (['SettingMainScreen',
                'HelpScreen',
                'ContactScreen',
                'ConnectionSettingScreen',
                'AccountUpdateScreen',
                'AccountAvatarScreen',
                'AccountSettingScreen']
                .indexOf(routeName) >= 0) {
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
            headerStyle: { backgroundColor: colors.primary },
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
