import { StackActions, NavigationActions } from 'react-navigation';

export const resetNavigation = (navigation, routeName) => navigation.dispatch(StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName })],
}));

export const resetStackNavigation = (navigation, routeName) => navigation.dispatch(
  StackActions.popToTop({
    actions: [StackActions.replace({ routeName })],
  }),
);

export default {
  resetNavigation,
  resetStackNavigation,
};
