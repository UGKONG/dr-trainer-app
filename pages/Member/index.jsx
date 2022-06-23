import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from "./List";
import ViewScreen from "./View";

const Stack = createNativeStackNavigator();

export default () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: '모든 회원' }} />
      <Stack.Screen name="ViewScreen" component={ViewScreen} options={({ route }) => ({ title: route?.params?.name ?? '회원 상세정보' })} />
    </Stack.Navigator>
  )
}