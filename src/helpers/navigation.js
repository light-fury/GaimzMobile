import { StackActions, NavigationActions } from 'react-navigation';

export const resetNavigation = (navigation, routeName) => navigation.dispatch(StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName })],
}));

export default {
  resetNavigation,
};
