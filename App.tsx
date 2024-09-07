import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/splashScreen';
import MainScreen from './src/screens/MainScreen';
import TuneListScreen from './src/screens/TuneListScreen';
import SaveTuneScreen from './src/screens/SaveTuneScreen';
import { KeyboardProvider } from './src/screens/KeyboardContext';
const Stack = createStackNavigator();

export default function App() {
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen 
              name="TuneList" 
              component={TuneListScreen} 
              options={{ 
                headerShown: true,
                title: 'Tune List', 
                headerStyle: { backgroundColor: '#4ECDC4' }, 
                headerTintColor: '#fff' 
              }} 
            />
            <Stack.Screen 
              name="SaveTune" 
              component={SaveTuneScreen} 
              options={{ 
                headerShown: true,
                title: 'Save Tune', 
                headerStyle: { backgroundColor: '#4ECDC4' }, 
                headerTintColor: '#fff' 
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}