import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

interface MusicalKeyboardProps {
  instrument: string;
  onPlayNote: (note: string) => void;
}

const MusicalKeyboard: React.FC<MusicalKeyboardProps> = ({ instrument, onPlayNote }) => {
  const notes = [
    ['Sa', 're', 'Re', 'ga', 'Ga'],
    ['ma', 'Ma', 'Pa', 'dh', 'Dh'],
    ['ni', 'Ni', 'Sa', '', ''],
  ];

  const playNote = async (note: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: `https://example.com/sounds/${instrument}/${note}.mp3` }
      );
      await sound.playAsync();
      onPlayNote(note);
    } catch (error) {
      console.error('Error playing note:', error);
    }
  };

  return (
    <View style={styles.keyboard}>
      {notes.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((note, columnIndex) => (
            <TouchableOpacity
              key={`${rowIndex}-${columnIndex}`}
              style={styles.key}
              onPress={() => playNote(note)}
            >
              <Text style={styles.keyText}>{note}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  keyText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MusicalKeyboard;