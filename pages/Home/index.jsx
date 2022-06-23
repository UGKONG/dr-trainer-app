import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewScreen from './View';
import useStore from '../../hooks/useStore.js';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default () => {
  const programName = useStore(x => x?.programName);
  const [data, setData] = useState(null);

  const getData = () => {

  }

  useEffect(getData, []);
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={ViewScreen} options={{ title: programName }} />
    </Stack.Navigator>
  )
}