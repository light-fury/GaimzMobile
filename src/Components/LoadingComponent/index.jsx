import React from 'react';
import {
  StyleSheet, ActivityIndicator, View,
} from 'react-native';

const styles = StyleSheet.create({
  activityContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoadingComponent = ({
  color = '#F00',
}) => (
  <View style={styles.activityContainer}>
    <ActivityIndicator color={color} animating size="large" />
  </View>
);

export default LoadingComponent;
