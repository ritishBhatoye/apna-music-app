import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import MusicalKeyboard from './MusicalKeyboard';
import { useKeyboard } from './KeyboardContext';
const SettingsScreen: React.FC = () => {
  const [musicType, setMusicType] = useState('Indian');
  const [duration, setDuration] = useState('0.5 Secs');
  const [keyboard, setKeyboard] = useState('QWERTY');
  const [instrument, setInstrument] = useState('Acoustic Grand Piano');
  const [pitch, setPitch] = useState(0);
  const [melody, setMelody] = useState('');

  const [isMusicTypePickerVisible, setMusicTypePickerVisible] = useState(false);
  const [isDurationPickerVisible, setDurationPickerVisible] = useState(false);
  const [isKeyboardPickerVisible, setKeyboardPickerVisible] = useState(false);
  const [isInstrumentPickerVisible, setInstrumentPickerVisible] = useState(false);

  const musicTypeData = ['Indian', 'Western', 'Jazz', 'Classical'];
  const durationData = ['0.5 Secs', '1 Sec', '1.5 Secs', '2 Secs'];
  const keyboardData = ['QWERTY', 'Musical'];
  const instrumentData = [
    'Acoustic Grand Piano', 'Bright Acoustic Piano', 'Electric Grand Piano',
    'Honky-tonk Piano', 'Electric Piano 1', 'Electric Piano 2', 'Harpsichord',
    'Clavi', 'Celesta', 'Glockenspiel', 'Music Box', 'Vibraphone', 'Marimba',
    'Xylophone', 'Tubular Bells', 'Dulcimer', 'Drawbar Organ', 'Percussive Organ',
    'Rock Organ', 'Church Organ', 'Reed Organ', 'Accordion', 'Harmonica',
    'Tango Accordion', 'Acoustic Guitar (nylon)', 'Acoustic Guitar (steel)',
    'Electric Guitar (jazz)', 'Electric Guitar (clean)', 'Electric Guitar (muted)',
    'Overdriven Guitar', 'Distortion Guitar', 'Guitar harmonics', 'Acoustic Bass',
    'Electric Bass (finger)', 'Electric Bass (pick)', 'Fretless Bass', 'Slap Bass 1',
    'Slap Bass 2', 'Synth Bass 1', 'Synth Bass 2', 'Violin', 'Viola', 'Cello',
    'Contrabass', 'Tremolo Strings', 'Pizzicato Strings', 'Orchestral Harp', 'Timpani',
    'String Ensemble 1', 'String Ensemble 2', 'SynthStrings 1', 'SynthStrings 2',
    'Choir Aahs', 'Voice Oohs', 'Synth Voice', 'Orchestra Hit', 'Trumpet',
    'Trombone', 'Tuba', 'Muted Trumpet', 'French Horn', 'Brass Section',
    'SynthBrass 1', 'SynthBrass 2', 'Soprano Sax', 'Alto Sax', 'Tenor Sax',
    'Baritone Sax', 'Oboe', 'English Horn', 'Bassoon', 'Clarinet', 'Piccolo',
    'Flute', 'Recorder', 'Pan Flute', 'Blown Bottle', 'Shakuhachi', 'Whistle',
    'Ocarina', 'Lead 1 (square)', 'Lead 2 (sawtooth)', 'Lead 3 (calliope)',
    'Lead 4 (chiff)', 'Lead 5 (charang)', 'Lead 6 (voice)', 'Lead 7 (fifths)',
    'Lead 8 (bass + lead)', 'Pad 1 (new age)', 'Pad 2 (warm)', 'Pad 3 (polysynth)',
    'Pad 4 (choir)', 'Pad 5 (bowed)', 'Pad 6 (metallic)', 'Pad 7 (halo)',
    'Pad 8 (sweep)', 'FX 1 (rain)', 'FX 2 (soundtrack)', 'FX 3 (crystal)',
    'FX 4 (atmosphere)', 'FX 5 (brightness)', 'FX 6 (goblins)', 'FX 7 (echoes)',
    'FX 8 (sci-fi)', 'Sitar', 'Banjo', 'Shamisen', 'Koto', 'Kalimba', 'Bag pipe',
    'Fiddle', 'Shanai', 'Tinkle Bell', 'Agogo', 'Steel Drums', 'Woodblock',
    'Taiko Drum', 'Melodic Tom', 'Synth Drum', 'Reverse Cymbal', 'Hand Clap',
    'Guitar Fret Noise', 'Breath Noise', 'Seashore', 'Bird Tweet', 'Telephone Ring',
    'Helicopter', 'Applause', 'Gunshot', 'Acoustic Bass Drum', 'Bass Drum 1',
    'Side Stick', 'Acoustic Snare', 'Hand Clap', 'Electric Snare', 'Low Floor Tom',
    'Closed Hi Hat', 'High Floor Tom', 'Pedal Hi-Hat', 'Low Tom', 'Open Hi-Hat',
    'Low-Mid Tom', 'Hi-Mid Tom', 'Crash Cymbal 1', 'High Tom', 'Ride Cymbal 1',
    'Chinese Cymbal', 'Ride Bell', 'Tambourine', 'Splash Cymbal', 'Cowbell',
    'Crash Cymbal 2', 'Vibraslap', 'Ride Cymbal 2', 'Hi Bongo', 'Low Bongo',
    'Mute Hi Conga', 'Open Hi Conga', 'Low Conga', 'High Timbale', 'Low Timbale',
    'High Agogo', 'Low Agogo', 'Cabasa', 'Maracas', 'Short Whistle', 'Long Whistle',
    'Short Guiro', 'Long Guiro', 'Claves', 'Hi Wood Block', 'Low Wood Block',
    'Mute Cuica', 'Open Cuica', 'Mute Triangle', 'Open Triangle'
  ];

  const renderPicker = (
    selectedValue: string,
    setSelectedValue: (value: string) => void,
    data: string[]
  ) => (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
    >
      {data.map((item, index) => (
        <Picker.Item key={index} label={item} value={item} />
      ))}
    </Picker>
  );

  const handlePlayNote = (note: string) => {
    setMelody(prevMelody => prevMelody + ' ' + note);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings Screen</Text>
        {/* Music Type */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setMusicTypePickerVisible(true)}
        >
          <View style={styles.labelContainer}>
            <MaterialCommunityIcons name="music" size={24} color="#000" />
            <Text style={styles.label}>Music Type</Text>
          </View>
          <Text style={styles.selectedValue}>{musicType}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isMusicTypePickerVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {renderPicker(musicType, setMusicType, musicTypeData)}
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setMusicTypePickerVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Duration */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setDurationPickerVisible(true)}
        >
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.selectedValue}>{duration}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isDurationPickerVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {renderPicker(duration, setDuration, durationData)}
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setDurationPickerVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Keyboard */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setKeyboardPickerVisible(true)}
        >
          <Text style={styles.label}>Keyboard</Text>
          <Text style={styles.selectedValue}>{keyboard}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isKeyboardPickerVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {renderPicker(keyboard, setKeyboard, keyboardData)}
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setKeyboardPickerVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Instrument */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setInstrumentPickerVisible(true)}
        >
          <Text style={styles.label}>Instrument</Text>
          <Text style={styles.selectedValue}>{instrument}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isInstrumentPickerVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {renderPicker(instrument, setInstrument, instrumentData)}
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setInstrumentPickerVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Pitch */}
        <View style={styles.settingItem}>
          <Text style={styles.label}>Pitch</Text>
          <Text style={styles.selectedValue}>{pitch}</Text>
          <Slider
            style={styles.slider}
            minimumValue={-5}
            maximumValue={5}
            step={1}
            value={pitch}
            onValueChange={setPitch}
            minimumTrackTintColor="#FF6B6B"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#FF6B6B"
          />
          <View style={styles.sliderLabels}>
            <Text>-5</Text>
            <Text>5</Text>
          </View>
        </View>

        {/* Melody Input */}
        <View style={styles.melodyInput}>
          <Text style={styles.label}>Enter Your Melody</Text>
          <View style={styles.melodyInputContainer}>
            <Text style={styles.melodyText}>{melody}</Text>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>▶</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Musical Keyboard */}
        <MusicalKeyboard instrument={instrument} onPlayNote={handlePlayNote} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  selectedValue: {
    fontSize: 16,
    marginLeft: 8,
    color: '#FF6B6B',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  melodyInput: {
    marginBottom: 20,
  },
  melodyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  melodyText: {
    flex: 1,
    fontSize: 16,
  },
  playButton: {
    backgroundColor: '#FF6B6B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default SettingsScreen;