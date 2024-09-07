import * as React from 'react'
import {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import { Audio } from 'expo-av';
import { useKeyboard } from './KeyboardContext';

const taalOptions = ['Teentaal', 'Ektaal', 'Jhaptaal', 'Deepchandi', 'Rupak', 'Keherwa']

const DropdownItem: React.FC<{
  item: string
  isSelected: boolean
  onSelect: (item: string) => void
}> = ({item, isSelected, onSelect}) => (
  <TouchableOpacity
    style={[styles.dropdownItem, isSelected && styles.selectedDropdownItem]}
    onPress={() => onSelect(item)}>
    <Text style={[styles.dropdownItemText, isSelected && styles.selectedItemText]}>{item}</Text>
    {isSelected && <View style={styles.selectedDot} />}
  </TouchableOpacity>
)

const HomeScreen: React.FC = () => {
  const { keyboard, setKeyboard } = useKeyboard();
  const [melody, setMelody] = useState('');
  const [selectedTaal, setSelectedTaal] = useState('Teentaal');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState('harmonium'); // Add this line

  const playNote = async (note: string) => {
    const soundObject = new Audio.Sound();
    try {
      // Replace with your actual API endpoint
      await soundObject.loadAsync({ uri: `https://example.com/api/sounds/${selectedInstrument}/${note}.mp3` });
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleNoteInput = (note: string) => {
    setMelody(prevMelody => prevMelody + ' ' + note);
    playNote(note);
  };

  const handleBackspace = () => {
    setMelody(prevMelody => prevMelody.slice(0, -1))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Text style={styles.dropdownButtonText}>{selectedTaal}</Text>
        <Text style={styles.dropdownArrow}>{isDropdownOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={taalOptions}
            renderItem={({item}) => (
              <DropdownItem
                item={item}
                isSelected={item === selectedTaal}
                onSelect={taal => {
                  setSelectedTaal(taal)
                  setIsDropdownOpen(false)
                }}
              />
            )}
            keyExtractor={item => item}
            style={styles.dropdown}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.keyboardToggle}
        onPress={() => setKeyboard(keyboard === 'QWERTY' ? 'Musical' : 'QWERTY')}
      >
        <Text style={styles.keyboardToggleText}>
          Switch to {keyboard === 'QWERTY' ? 'Musical' : 'QWERTY'} Keyboard
        </Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        {keyboard === 'QWERTY' ? (
          <TextInput
            style={styles.input}
            placeholder='Enter Your Melody'
            value={melody}
            onChangeText={setMelody}
          />
        ) : (
          <View>
            <Text style={styles.melodyText}>{melody}</Text>
            <View style={styles.musicalKeyboard}>
              {['Sa', 're', 'Re', 'ga', 'Ga', 'ma', 'Ma', 'Pa', 'dh', 'Dh', 'ni', 'Ni', ','].map(
                (note, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.noteButton}
                    onPress={() => handleNoteInput(note)}>
                    <Text style={styles.noteButtonText}>{note}</Text>
                  </TouchableOpacity>
                ),
              )}
              <TouchableOpacity style={styles.noteButton} onPress={handleBackspace}>
                <Text style={styles.noteButtonText}>←</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
  },
  playButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownArrow: {
    fontSize: 18,
    color: '#666',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedDropdownItem: {
    backgroundColor: '#FFF0F0',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  selectedItemText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  melodyText: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginBottom: 10,
  },
  musicalKeyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noteButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: '22%',
    alignItems: 'center',
  },
  noteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  keyboardToggle: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  keyboardToggleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
})

export default HomeScreen
