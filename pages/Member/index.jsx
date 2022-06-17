import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from "./List";
import ViewScreen from "./View";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListScreen" component={ListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ViewScreen" component={ViewScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}