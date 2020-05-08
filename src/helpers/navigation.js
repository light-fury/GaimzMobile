import { StackActions, NavigationActions } from 'react-navigation';

export const resetNavigation = (navigation, routeName) => navigation.dispatch(
  StackActions.popToTop({
    actions: [NavigationActions.navigate({ routeName })],
  }),
);

export default {
  resetNavigation,
};
