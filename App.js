import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './src/pages/Splash';
import Home from './src/pages/Home';
/*import Login from './src/pages/Login';*/
/*import Cadastro from './src/pages/Cadastro';*/



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />

        </Stack.Navigator>
    </NavigationContainer>
  );
}


