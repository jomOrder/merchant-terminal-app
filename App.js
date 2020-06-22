/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/navigation';
import { ThemeProvider } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import configureStore from './src/store';
import FlashMessage from "react-native-flash-message";

const Stack = createStackNavigator()

const RootRoute = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Navigation' component={Navigation} />
    </Stack.Navigator>
  )
}

export default function App() {
  useEffect(() => {
  }, []);
  return (
    <Provider store={configureStore()}>
        <ThemeProvider>
          <StatusBar barStyle="white-content" hidden={false} backgroundColor="#000" translucent={true} />
          <NavigationContainer>
            <RootRoute />
          </NavigationContainer>
          <FlashMessage style={{marginTop: 10}} animated={true} icon="auto" floating={true} position="top" />
        </ThemeProvider>
    </Provider>
  );
}