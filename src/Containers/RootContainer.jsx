// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import NavigationRouter from '../Navigation/NavigationRouter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RootContainer = () => (
  <View style={styles.container}>
    <NavigationRouter />
  </View>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
