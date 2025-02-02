import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity, Image, StyleSheet, Text, View,
} from 'react-native';
import { get, isEmpty } from 'lodash';

import { colors, calcReal } from '../../Assets/config';
import { arrowUp, arrowDown } from '../../Assets';

const styles = StyleSheet.create({
  labelInnerStyle: {
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    color: colors.steamBlack,
    marginVertical: calcReal(10),
    letterSpacing: calcReal(1),
    textTransform: 'uppercase',
  },
  dropDownContainer: {
    borderWidth: calcReal(2),
    borderRadius: calcReal(4),
    borderColor: colors.grayOpacity,
    paddingHorizontal: calcReal(10),
  },
  itemText: {
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    textAlignVertical: 'center',
    fontWeight: '300',
    color: colors.gray,
    fontStyle: 'italic',
    padding: 0,
    marginRight: 'auto',
  },
  iconStyle: {
    width: calcReal(13),
    height: calcReal(13),
  },
  itemContainer: {
    height: calcReal(48),
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const CustomDropdown = ({
  label,
  containerStyle = {},
  labelStyle = {},
  value,
  options,
  onUpdateValue,
  borderColor = colors.grayOpacity,
}) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);

  useEffect(() => {
    if (!value && !isEmpty(options)) {
      onUpdateValue(options[0]);
    }
  }, [options, value]);

  return (
    <View style={containerStyle}>
      <Text style={[styles.labelInnerStyle, labelStyle]}>{label}</Text>
      <View
        style={[
          styles.dropDownContainer,
          { borderColor },
          options.length <= 1 && { paddingHorizontal: calcReal(5) },
        ]}
      >
        <TouchableOpacity
          onPress={() => options.length > 1 && setDropDownVisible(!dropDownVisible)}
          style={styles.itemContainer}
        >
          <Text style={styles.itemText}>{value || get(options, '[0]', '')}</Text>
          {options.length > 1 && (
            <Image
              style={styles.iconStyle}
              resizeMode="contain"
              source={
                dropDownVisible
                  ? arrowUp
                  : arrowDown
              }
            />
          )}
        </TouchableOpacity>
        {dropDownVisible && (
          <>
            {options.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  onUpdateValue(item);
                  setDropDownVisible(false);
                }}
                key={index} // eslint-disable-line react/no-array-index-key
                style={[styles.itemContainer, { height: calcReal(30) }]}
              >
                <Text style={[styles.itemText, { color: colors.primary, fontStyle: 'normal' }]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

export default CustomDropdown;
