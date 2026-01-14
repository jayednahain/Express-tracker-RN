import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { H1, H6 } from './App/AppTheme';
import { Provider } from 'react-redux';
import { store } from './App/Store/store';
import LandingPage from './App/Views/landingPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <LandingPage />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
