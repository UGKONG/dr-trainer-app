import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from "./List";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: '스케줄' }} />
      {/* <Stack.Screen name="ViewScreen" component={ViewScreen} options={({ route }) => ({ title: route?.params?.name })} /> */}
    </Stack.Navigator>
  )
}