import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome to My App Template</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,                // Make sure it fills the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
});