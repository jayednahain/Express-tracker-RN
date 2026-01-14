import React from 'react';

import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { H1, H3, H5 } from '../../AppTheme';
// import { H1, H3 } from '../../AppTheme';

// ...existing code...
export default function CustomModal({
  title,
  description,
  isVisible,
  onClose,
  onPressTryAgain,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalViewContainer}>
        <View style={styles.modalContainer}>
          <H1 textStyle={{ marginBottom: 10 }}>{title}</H1>
          <H5 textStyle={{ marginBottom: 10 }}>{description}</H5>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              //   gap: 10,
              width: '100%',
            }}
          >
            <Button title="Close" onPress={onClose} />
            {onPressTryAgain && (
              <Button title="Try Again" onPress={onPressTryAgain} />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // This centers the modal
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: '5%',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    borderRadius: 15,
    width: '90%', // Optional: control width
  },
});
// ...existing code...
