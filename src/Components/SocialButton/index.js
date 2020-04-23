import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  iconStyle: {
    width: 18,
    height: 18,
  },
});

const SocialButton = ({style, icon, onClick}) => {
  return (
    <TouchableOpacity style={style} onPress={onClick}>
      <Image style={styles.iconStyle} resizeMode={'contain'} source={icon} />
    </TouchableOpacity>
  );
};

export default SocialButton;
