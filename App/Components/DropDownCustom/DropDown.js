import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
// import DrawerItem from 'react-native-paper/lib/typescript/components/Drawer/DrawerItem';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function DropDown({
  items,
  onValueChange,
  placeholder,
  pickerStyle,
  alreadySelected,
  containerStyle,
}) {
  const [selectedValue, setSelectedValue] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleValueChange = itemValue => {
    console.log('itemValue: ', itemValue);
    setSelectedValue(itemValue);
    setIsPickerOpen(false);
    if (onValueChange) {
      onValueChange(itemValue);
    }
  };

  return (
    <Picker
      // enabled={openPickerKey === item.value}
      mode="dropdown"
      itemStyle={{
        backgroundColor: 'red',
        padding: 0,
        margin: 0,
        fontSize: 14,
      }}
      selectedValue={alreadySelected ? alreadySelected : selectedValue}
      onValueChange={handleValueChange}
      style={[styles.pickerContainerStyle, containerStyle]}
    >
      {placeholder && (
        <Picker.Item enabled={false} label={placeholder} value="" />
      )}
      {items.map(item => (
        <Picker.Item
          style={{
            fontSize: 14,
          }}
          key={item.value}
          label={item.value}
          value={item.value}
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 10,
    width: 30,
  },
  pickerContainerStyle: {
    width: 160,
    padding: 0,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'red',
  },
});
