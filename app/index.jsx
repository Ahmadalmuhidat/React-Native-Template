import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

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