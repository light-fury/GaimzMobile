/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';

import { colors, calcReal } from '../../Assets/config';

const styles = StyleSheet.create({
  titleText: {
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    color: colors.secondary,
    marginBottom: calcReal(8),
    letterSpacing: calcReal(1),
    textTransform: 'uppercase',
  },
  inputContainer: {
    borderWidth: calcReal(2),
    borderRadius: calcReal(4),
    borderColor: colors.grayOpacity,
    height: calcReal(48),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexStyle: {
    flex: 1,
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    textAlignVertical: 'center',
    fontWeight: '300',
    color: colors.gray,
    padding: 0,
    marginHorizontal: calcReal(14),
  },
  iconContainer: {
    paddingHorizontal: calcReal(14),
    paddingVertical: calcReal(10),
  },
  iconStyle: {
    width: calcReal(18),
    height: calcReal(18),
  },
});

const CustomInput = ({
  label,
  containerStyle = {},
  labelStyle = {},
  value,
  onUpdateValue,
  secureTextEntry = false,
  onClick = () => {},
  icon,
  borderColor = colors.grayOpacity,
  iconVisible = false,
  ...props
}) => (
  <View style={containerStyle}>
    <Text style={[styles.titleText, labelStyle]}>{label}</Text>
    <View style={[styles.inputContainer, { borderColor }]}>
      <TextInput
        style={styles.flexStyle}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onUpdateValue}
        clearTextOnFocus={false}
        {...props}
      />
      {iconVisible && icon && (
      <TouchableOpacity onPress={onClick} style={styles.iconContainer}>
        <Image
          style={styles.iconStyle}
          resizeMode="contain"
          source={icon}
        />
      </TouchableOpacity>
      )}
    </View>
  </View>
);

export default CustomInput;
