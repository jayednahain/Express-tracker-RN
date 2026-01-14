import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ThemeColors } from '../../AppTheme';

export default function CustomBottomSheet({
  onChange,
  bottomSheetModalRef,
  children,
}) {
  return (
    <BottomSheet
      style={{}}
      // handleComponent={null}
      ref={bottomSheetModalRef}
      // index={0}
      snapPoints={[1, '35%']}
      // enablePanDownToClose={false}
      // enableContentPanningGesture={this.state.bottomSheetIndex === 2 ? false : true}
      // enableHandlePanningGesture={this.state.bottomSheetGestureInteraction}
      // onChange={index => {
      //   if (index === -1) {
      //   } else if (index === 0) {
      //   } else if (index === 2) {
      //   } else {
      //   }
      // }}
      onChange={onChange}
    >
      {children}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetViewContainer: {
    flex: 1,
    alignItems: 'center',
    // borderColor: d,
    borderColor: ThemeColors.lightText,
    borderWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
});
