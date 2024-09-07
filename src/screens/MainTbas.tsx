import React, {useState} from 'react'
import {View, useWindowDimensions, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackNavigationProp} from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import SettingsScreen from './SettingsScreen'

type RootStackParamList = {
  Main: undefined
  TuneList: undefined
  SaveTune: undefined
}

type MainTabsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>
}

const renderScene = SceneMap({
  home: HomeScreen,
  settings: SettingsScreen,
})

function MainTabs({navigation}: MainTabsProps) {
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {key: 'home', title: 'Home'},
    {key: 'settings', title: 'Settings'},
  ])

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicator}
              style={styles.tabBar}
              labelStyle={styles.label}
            />
          )}
          style={styles.tabView}
        />
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('TuneList')}>
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  indicator: {
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#333',
    flex: 1,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  tabView: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 24,
    color: '#fff',
  },
})

export default MainTabs
