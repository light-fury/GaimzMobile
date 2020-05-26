import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, View, Image,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../Assets/config';

const styles = StyleSheet.create({
  container: {
    height: getStatusBarHeight(true) + calcReal(84),
    backgroundColor: colors.transparent,
  },
  innerContainer: {
    flex: 1,
    paddingTop: getStatusBarHeight(true),
    marginBottom: calcReal(4),
    paddingHorizontal: calcReal(24),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    flex: 1,
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: calcReal(1),
    textTransform: 'uppercase',
    color: colors.steamBlack,
  },
  headerIcon: {
    width: calcReal(18),
    height: calcReal(18),
  },
  headerButton: {
    borderRadius: 12,
    width: calcReal(40),
    height: calcReal(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBackground: {
    backgroundColor: colors.secondary,
  },
});

const HeaderComponent = ({
  label = '',
  leftIcon = null,
  rightIcon = null,
  leftClick = () => {},
  rightClick = () => {},
  leftStyle = {},
  rightStyle = {},
  leftIconStyle = {},
  rightIconStyle = {},
}) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <TouchableOpacity
        onPress={leftClick}
        style={[styles.headerButton, leftIcon && styles.primaryBackground, leftStyle]}
      >
        {leftIcon && (<Image source={leftIcon} style={[styles.headerIcon, leftIconStyle]} resizeMode="contain" />)}
      </TouchableOpacity>
      <Text style={styles.titleStyle}>{label}</Text>
      <TouchableOpacity
        onPress={rightClick}
        style={[styles.headerButton, rightIcon && styles.primaryBackground, rightStyle]}
      >
        {rightIcon && (<Image source={rightIcon} style={[styles.headerIcon, rightIconStyle]} resizeMode="contain" />)}
      </TouchableOpacity>
    </View>
  </View>
);

export default HeaderComponent;
