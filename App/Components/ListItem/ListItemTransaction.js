import { StyleSheet, View } from 'react-native';
import React from 'react';
import { H3, ThemeColors } from '../../AppTheme';
import TouchableIcon from '../Touchable/TouchableIcon';
import { useDispatch } from 'react-redux';
import { editActiveTransection } from '../../Features/Transaction/transactionSlice';
import { removeTransactionThunk } from '../../Features/Transaction/transactionThunk';

export default function ListItemTransaction({
  currentItem,
  onPressEdit,
  onPressDelete,
  resetForm,
}) {
  let { name, type, amount, description, date, id } = currentItem;
  let isIncome = type == 'income' ? true : false;
  const dispatch = useDispatch();

  const onPressEditIcon = () => {
    dispatch(editActiveTransection(currentItem));
    onPressEdit();
  };

  const onPressDeleteIcon = () => {
    dispatch(removeTransactionThunk(id));
  };

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
            fontWeight: !isIncome && '600',
          }}
        >
          {!isIncome ? '- ৳' : '৳'} {amount}
        </H3>

        <TouchableIcon
          iconsColor={!isIncome && 'white'}
          containerStyle={{ paddingTop: 4 }}
          iconName={'edit'}
          onPressIcon={onPressEditIcon}
        />
        <TouchableIcon
          iconsColor={!isIncome && 'white'}
          iconName={'trash'}
          onPressIcon={onPressDeleteIcon}
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
