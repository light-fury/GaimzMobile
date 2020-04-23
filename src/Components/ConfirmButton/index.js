import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../../Assets/config';

const styles = StyleSheet.create({
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
});

const ConfirmButton = ({
  color = '#FFF',
  borderColor = '#0000',
  textColor = colors.white,
  height = 58,
  label = '',
  fontStyle = {},
  onClick = () => {},
}) => {
  return (
    <TouchableOpacity
      style={[
        {height, backgroundColor: color, borderColor, borderWidth: 1},
        styles.centerStyle,
      ]}
      onPress={onClick}>
      <Text style={[styles.textStyle, {color: textColor}, fontStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ConfirmButton;
