import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { H3, ThemeColors } from '../../AppTheme';
import TouchableIcon from '../Touchable/TouchableIcon';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ListItemTransaction({
  id,
  currentItem,
  onPressEdit,
  onPressDelete,
}) {
  let { name, type, amount, description, date } = currentItem;
  let isIncome = type == 'income' ? true : false;
  return (
    <View
      style={[
        {
          backgroundColor: isIncome
            ? ThemeColors.cardBackground
            : ThemeColors.colorWarning,
        },
        styles.listItemContainer,
      ]}
    >
      <H3 textStyle={{ color: !isIncome && 'white' }}>{name}</H3>

      <View style={styles.leftSideDesign}>
        <H3
          textStyle={{
            color: !isIncome && 'white',
            fontWeight: !isIncome && '400',
          }}
        >
          -৳ {amount}
        </H3>

        <TouchableIcon
          iconsColor={!isIncome && 'white'}
          containerStyle={{ paddingTop: 4 }}
          iconName={'edit'}
          onPressIcon={onPressEdit}
        />
        <TouchableIcon
          iconsColor={!isIncome && 'white'}
          iconName={'trash'}
          onPressIcon={onPressDelete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSideDesign: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
