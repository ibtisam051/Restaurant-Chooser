import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import AppNavigation from './src/components/navigation';

export default function App() {
  return (
    <>
      <AppNavigation />
      <Toast />
    </>
  );
}
