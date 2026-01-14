import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
// import { Dropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';
// import DropDown from './DropDownCustom/DropDown';

import DropDown from '../DropDownCustom/DropDown';
import { ThemeColors } from '../../AppTheme';

const itemsObjects = [
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
];

export default function CustomForm({ onSubmit, inputRef }) {
  let color = 'red';

  const [transactionName, setTransactionName] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');

  const onSelectExpenseType = currentType => {
    setExpenseType(currentType);
  };

  const onSubmitForm = () => {
    onSubmit({
      name: transactionName,
      type: expenseType,
      amount: amount,
    });
    setTransactionName('');
    setExpenseType('');
    setAmount('');
  };

  return (
    <View style={{ padding: 20, width: '100%' }}>
      <TextInput
        autoFocus={false}
        ref={inputRef} // Add ref
        // autoFocus={true}
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
        value={amount}
        placeholder="Amount"
        style={[styles.textInputContainerStyle, { width: '40%' }]}
        keyboardType="numeric"
        maxLength={7}
        onChangeText={setAmount}
      />

      <Button
        color={ThemeColors.primary}
        disabled={!transactionName || !expenseType || !amount}
        title="Submit"
        onPress={onSubmitForm}
      />
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
