import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {calcReal} from '../../Assets/config';

const styles = StyleSheet.create({
  iconTemplate: {
    width: calcReal(18),
    height: calcReal(18),
  },
});

const SocialButton = ({style, icon, iconStyle = {}, onClick = () => {}}) => {
  return (
    <TouchableOpacity style={style} onPress={onClick}>
      <Image
        style={[styles.iconTemplate, iconStyle]}
        resizeMode={'contain'}
        source={icon}
      />
    </TouchableOpacity>
  );
};

export default SocialButton;
