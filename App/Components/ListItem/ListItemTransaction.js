import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function ListItemTransaction({ id, currentItem }) {
  let { name, type, amount, description, date } = currentItem;
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
