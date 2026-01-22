import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TouchableIcon({
  iconName,
  iconSize = 24,
  iconsColor = 'black',
  onPressIcon,
  containerStyle = {},
}) {
  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={!onPressIcon && true}
      onPress={onPressIcon}
    >
      <FontAwesome name={iconName} size={iconSize} color={iconsColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
