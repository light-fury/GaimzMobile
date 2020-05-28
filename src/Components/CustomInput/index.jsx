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
import { checkIcon } from '../../Assets';

const styles = StyleSheet.create({
  titleText: {
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    color: colors.steamBlack,
    marginBottom: calcReal(8),
    letterSpacing: calcReal(1),
    textTransform: 'uppercase',
  },
  inputContainer: {
    borderWidth: calcReal(2),
    borderRadius: calcReal(4),
    borderColor: colors.grayOpacity,
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
    height: calcReal(48),
  },
  iconContainer: {
    paddingHorizontal: calcReal(14),
    paddingVertical: calcReal(10),
  },
  iconStyle: {
    width: calcReal(18),
    height: calcReal(18),
  },
  errorStyle: {
    letterSpacing: 0,
    color: colors.red,
    fontWeight: 'normal',
    textTransform: 'none',
    marginLeft: 'auto',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    height: calcReal(48),
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
  errorText = '',
  icon,
  borderColor = colors.grayOpacity,
  iconVisible = false,
  inputStyle = {},
  ...props
}) => (
  <View style={containerStyle}>
    <View style={styles.rowContainer}>
      <Text style={[styles.titleText, labelStyle]}>
        {label}
      </Text>
      {borderColor === colors.redOpacity && errorText.length > 0 && (
        <Text style={[styles.titleText, labelStyle, styles.errorStyle]}>
          {errorText}
        </Text>
      )}
    </View>
    <View style={[styles.inputContainer, { borderColor }]}>
      <TextInput
        style={[styles.flexStyle, inputStyle]}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onUpdateValue}
        clearTextOnFocus={false}
        {...props}
      />
      {iconVisible && icon && (
      <TouchableOpacity
        onPress={onClick}
        activeOpacity={icon === checkIcon ? 1 : 0.5}
        style={styles.iconContainer}
      >
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
