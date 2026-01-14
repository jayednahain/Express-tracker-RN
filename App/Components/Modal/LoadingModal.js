import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

export default function LoadingModal({ modalVisibility = false }) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisibility}>
      <View style={styles.modalViewContainer}>
        <ActivityIndicator size="large" />
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
