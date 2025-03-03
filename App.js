import { StatusBar } from 'expo-status-bar';
import AppNavigation from './src/Navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import DarkModeProvider from './src/provider/DarkModeProvider';
import { useDarkMode } from './src/provider/DarkModeProvider';
import { Theme } from './src/Constant/Theme';
function MainApp() {
  const { isDark } = useDarkMode();
  return (
    <NavigationContainer>
      <AppNavigation />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}


export default App = () => {
  return (
    <DarkModeProvider>
      <MainApp />
    </DarkModeProvider>
  )
}

