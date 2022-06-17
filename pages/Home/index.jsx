import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewScreen from './View';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={ViewScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}