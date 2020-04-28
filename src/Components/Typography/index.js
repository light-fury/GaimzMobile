import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  defaultText: {},
});

export const typography = () => {
  const oldTextRender = Text.render;
  Text.render = (...args) => {
    const origin = oldTextRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    });
  };
};

export default typography;
