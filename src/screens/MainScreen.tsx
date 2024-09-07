import * as React from 'react';
import { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import SaveTuneScreen from './SaveTuneScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Main: undefined
  TuneList: undefined
  SaveTune: undefined
}

type MainTabsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>
}

function MainScreen({navigation}: MainTabsProps) {
  const layout = useWindowDimensions()

  const [activeTab, setActiveTab] = useState('home')
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />
      case 'settings':
        return <SettingsScreen />;
      case 'saveTunes':
        return <SaveTuneScreen navigation={navigation} />;
      default:
        return null
    }
  }

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible)

  const handleOpenPress = () => {
    toggleDropdown()
    navigation.navigate('TuneList')
  }

  const handleSavePress = () => {
    toggleDropdown();
    setActiveTab('saveTunes');
  };

  const renderDropdown = () => (
    <Modal transparent={true} visible={isDropdownVisible} onRequestClose={toggleDropdown}>
      <TouchableOpacity style={styles.modalOverlay} onPress={toggleDropdown}>
        <View style={styles.dropdownContent}>
          <TouchableOpacity
            style={[styles.dropdownItem, styles.openButton]}
            onPress={handleOpenPress}>
            <Text style={styles.dropdownItemText}>OPEN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dropdownItem, styles.saveButton]}
            onPress={handleSavePress}>
            <Text style={styles.dropdownItemText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'home' && styles.activeTab]}
            onPress={() => setActiveTab('home')}>
            <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Home</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.tab, activeTab === 'saveTunes' && styles.activeTab]}
            onPress={() => setActiveTab('saveTunes')}
          >
            <Text style={[styles.tabText, activeTab === 'saveTunes' && styles.activeTabText]}>Save Tunes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
            onPress={() => setActiveTab('settings')}>
            <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
              Settings
            </Text>
          </TouchableOpacity>
   
        </View>
        {/* <TouchableOpacity style={styles.iconButton} onPress={toggleDropdown}>
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity> */}
      </View>
      {renderContent()}
      {renderDropdown()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    flex: 1,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContent: {
    position: 'absolute',
    top: 60,
    right: 10,
    width: '50%',
    backgroundColor: 'transparent',
  },
  dropdownItem: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#FF6B6B',
  },
  saveButton: {
    backgroundColor: '#4ECDC4',
  },
  dropdownItemText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default MainScreen