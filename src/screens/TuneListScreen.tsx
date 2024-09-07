import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TuneListScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>No Tune Saved , Please add new tone and Save.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default TuneListScreen;