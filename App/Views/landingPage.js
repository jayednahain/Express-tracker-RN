import { StyleSheet, View, Keyboard, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { H1, ThemeColors } from '../AppTheme';
import { BottomSheetView } from '@gorhom/bottom-sheet';

import ButtonCircle from '../Components/Button/ButtonCircle';
import CustomForm from '../Components/Forms/customForm';
import CustomBottomSheet from '../Components/BottomSheet/CustomBottomSheet';
import CustomModal from '../Components/Modal/CustomModal';
import LoadingModal from '../Components/Modal/LoadingModal';
import ListItemTransaction from '../Components/ListItem/ListItemTransaction';
import CardTotalBalance from '../Components/Card/CardTotalBalance';

import {
  createTransactionThunk,
  fetchTransactionsThunk,
} from '../Features/Transaction/transactionThunk';
import {
  resetCreateState,
  resetCurrentActiveTransection,
} from '../Features/Transaction/transactionSlice';

export default function LandingPage() {
  const bottomSheetModalRef = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactionsThunk());
  }, [dispatch]);

  const {
    create,
    fetch,
    transactions,
    loading,
    errorText,
    error,
    success,
    modalSubtitleText,
  } = useSelector(state => state.transaction);

  useEffect(() => {
    setModalVisibility(loading);
  }, [loading]);

  // Handle create success
  useEffect(() => {
    if (success) {
      bottomSheetModalRef.current?.collapse();
      setModalTitle('Success');
      setModalDescription(modalSubtitleText);
      setIsModalVisible(true);
      dispatch(resetCreateState());
    }
  }, [modalSubtitleText, success, dispatch]);

  // Handle create error
  useEffect(() => {
    if (create.error) {
      setModalTitle('Error');
      setModalDescription(create.errorText || 'An unexpected error occurred.');
      setIsModalVisible(true);
      dispatch(resetCreateState());
    }
  }, [create.error, create.errorText, dispatch]);

  useEffect(() => {}, []);

  const handleSheetChanges = index => {
    console.log('handleSheetChanges', index);
    if (index === 0) {
      console.log('Focus the input');
      Keyboard.dismiss();
    }
  };

  const onPressFloatingButton = () => {
    dispatch(resetCurrentActiveTransection());
    bottomSheetModalRef.current?.expand();
  };

  // const postSubmitTransaction = data => {
  //   dispatch(createTransactionThunk(data));
  // };

  const renderFloatingButton = () => {
    return (
      <View style={{ position: 'absolute', bottom: 80, right: 30 }}>
        <ButtonCircle onPress={onPressFloatingButton} />
      </View>
    );
  };

  const renderBottomSheet = () => {
    let sheetTitle = editMode ? 'Edit Transaction' : 'Add Transaction';
    return (
      <CustomBottomSheet
        onChange={handleSheetChanges}
        bottomSheetModalRef={bottomSheetModalRef}
      >
        <BottomSheetView style={styles.bottomSheetViewContainer}>
          <H1>{sheetTitle}</H1>
          <CustomForm
          // onSubmit={postSubmitTransaction}
          />
        </BottomSheetView>
      </CustomBottomSheet>
    );
  };

  const renderModal = () => {
    return (
      <CustomModal
        title={modalTitle}
        description={modalDescription}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    );
  };

  const onPressEditTransaction = () => {
    setEditMode(true);
    bottomSheetModalRef.current?.expand();
  };

  const onPressDeleteTransaction = () => {};

  const renderAllTransactions = () => {
    return (
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListItemTransaction
            onPressDelete={onPressDeleteTransaction}
            onPressEdit={onPressEditTransaction}
            key={item.id}
            currentItem={item}
          />
        )}
      />
    );
  };

  const renderTotalBalance = () => {
    return <CardTotalBalance />;
  };

  return (
    <View style={styles.container}>
      {/* <H1>landingPage</H1> */}
      {renderAllTransactions()}
      {renderFloatingButton()}
      {renderBottomSheet()}
      {renderTotalBalance()}
      {renderModal()}
      <LoadingModal modalVisibility={modalVisibility} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  bottomSheetViewContainer: {
    flex: 1,
    alignItems: 'center',
    borderColor: ThemeColors.lightText,
    borderWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
});
