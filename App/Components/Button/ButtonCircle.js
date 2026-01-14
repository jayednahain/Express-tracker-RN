import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { H1, ThemeColors } from '../../AppTheme';

export default function ButtonCircle({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[style, styles.container]} onPress={onPress}>
      <H1
        textStyle={{
          color: ThemeColors.colorWhite,
        }}
      >
        {title || '+'}
      </H1>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
