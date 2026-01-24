import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { Dropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';
// import DropDown from './DropDownCustom/DropDown';

import DropDown from '../DropDownCustom/DropDown';
import { ThemeColors } from '../../AppTheme';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTransactionThunk,
  createTransactionThunk,
} from '../../Features/Transaction/transactionThunk';

const itemsObjects = [
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
];

export default function CustomForm({ onSubmit, inputRef }) {
  let color = 'red';
  const dispatch = useDispatch();

  const { currentEditableTransection } = useSelector(
    state => state.transaction || {},
  );
  const [transactionName, setTransactionName] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    let { id, name, type, amount } = currentEditableTransection || {};
    if (id) {
      setTransactionName(name);
      setExpenseType(type);
      setCurrentAmount(amount);
      setEditMode(true);
    } else {
      resetForm();
      setEditMode(false);
    }
  }, [currentEditableTransection]);

  const onSelectExpenseType = currentType => {
    setExpenseType(currentType);
  };

  const resetForm = () => {
    setTransactionName('');
    setExpenseType('');
    setCurrentAmount('');
  };

  const postSubmitTransaction = () => {
    if (editMode) {
      dispatch(
        changeTransactionThunk({
          id: currentEditableTransection.id,
          currentTransaction: {
            name: transactionName,
            type: expenseType,
            amount: currentAmount,
          },
        }),
      );
    } else {
      dispatch(
        createTransactionThunk({
          name: transactionName,
          type: expenseType,
          amount: currentAmount,
        }),
      );
    }
    resetForm();
  };

  return (
    <View style={{ padding: 20, width: '100%' }}>
      <TextInput
        autoFocus={false}
        ref={inputRef} // Add ref
        value={transactionName}
        placeholder="Name of Transaction"
        style={styles.textInputContainerStyle}
        maxLength={50}
        onChangeText={setTransactionName}
      />

      <DropDown
        alreadySelected={color}
        items={itemsObjects}
        onValueChange={onSelectExpenseType}
        placeholder="Set Expense type"
        pickerStyle={styles.cardContainer}
      />
      <TextInput
        value={currentAmount}
        placeholder="Amount"
        style={[styles.textInputContainerStyle, { width: '40%' }]}
        keyboardType="numeric"
        maxLength={7}
        onChangeText={setCurrentAmount}
      />

      <View>
        <Button
          key={`button-${!transactionName || !expenseType || !currentAmount}`}
          color={ThemeColors.primary}
          disabled={!transactionName || !expenseType || !currentAmount}
          title={editMode ? 'Update Transaction' : 'Submit Transaction'}
          onPress={postSubmitTransaction}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainerStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    width: '100%',
    borderRadius: 6,
    paddingHorizontal: 12,
  },
});
