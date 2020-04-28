import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, calcReal } from '../../Assets/config';

const styles = StyleSheet.create({
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcReal(12),
  },
  textStyle: {
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
});

const ConfirmButton = ({
  color = '#FFF',
  borderColor = '#0000',
  textColor = colors.white,
  height = calcReal(58),
  label = '',
  fontStyle = {},
  containerStyle = {},
  onClick = () => {},
}) => (
  <TouchableOpacity
    style={[
      {
        height, backgroundColor: color, borderColor, borderWidth: 1,
      },
      styles.centerStyle,
      containerStyle,
    ]}
    onPress={onClick}
  >
    <Text style={[styles.textStyle, { color: textColor }, fontStyle]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default ConfirmButton;
