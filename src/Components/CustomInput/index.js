import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';

import {colors} from '../../Assets/config';

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 12,
    lineHeight: 20,
    color: colors.secondary,
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: colors.grayOpacity,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexStyle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: 'center',
    fontWeight: '300',
    color: colors.gray,
    padding: 0,
    marginHorizontal: 14,
  },
  iconContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
});

const CustomInput = ({
  label,
  containerStyle,
  value,
  onUpdateValue,
  secureTextEntry = false,
  onClick = () => {},
  icon,
  borderColor = colors.grayOpacity,
  iconVisible = false,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={[styles.inputContainer, {borderColor}]}>
        <TextInput
          style={styles.flexStyle}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onUpdateValue}
          clearTextOnFocus={false}
        />
        {iconVisible && icon && (
          <TouchableOpacity onPress={onClick} style={styles.iconContainer}>
            <Image
              style={styles.iconStyle}
              resizeMode={'contain'}
              source={icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
