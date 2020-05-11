import React from 'react';
import {
  TouchableOpacity, Image, StyleSheet, View,
} from 'react-native';
import { calcReal } from '../../Assets/config';

const styles = StyleSheet.create({
  iconTemplate: {
    width: calcReal(30),
    height: calcReal(30),
  },
});

const SocialButton = ({
  style,
  icon,
  clickOpacity = 0.5,
  iconStyle = {},
  onClick = () => {},
}) => {
  if (clickOpacity === 2) {
    return (
      <View style={style}>
        <Image
          style={[styles.iconTemplate, iconStyle]}
          resizeMode="contain"
          source={icon}
        />
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={style}
      activeOpacity={clickOpacity}
      onPress={onClick}
    >
      <Image
        style={[styles.iconTemplate, iconStyle]}
        resizeMode="contain"
        source={icon}
      />
    </TouchableOpacity>
  );
};

export default SocialButton;
