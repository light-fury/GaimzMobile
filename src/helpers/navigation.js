import { StackActions } from 'react-navigation';

export const resetNavigation = (navigation, routeName) => navigation.dispatch(
  StackActions.popToTop({
    actions: [StackActions.replace({ routeName })],
  }),
);

export default {
  resetNavigation,
};
