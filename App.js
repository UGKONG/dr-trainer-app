import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useStore from './hooks/useStore.js';
import Login from './pages/Login';
import HomeStack from './pages/Home';
import MemberStack from './pages/Member';
import ScheduleStack from './pages/Schedule';
import SettingStack from './pages/Setting';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default () => {
  const isLogin = useStore(x => x?.isLogin);
  
  return (
    <>
      <StatusBar style='auto' />
      {!isLogin ? (
        <Login />
      ) : (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} options={{ tabBarShowLabel: false, title: 'Home', tabBarIcon: ({ focused }) => (
              <AntDesign name="linechart" size={focused ? 26 : 24} style={{ color: focused ? '#1b8e5f' : '#ddd' }} />
            ) }} />
            <Tab.Screen name="Member" component={MemberStack} options={{ tabBarShowLabel: false, title: 'Member', tabBarIcon: ({ focused }) => (
              <AntDesign name="user" size={focused ? 26 : 24} style={{ color: focused ? '#1b8e5f' : '#ddd' }} />
            ) }} />
            <Tab.Screen name="Schedule" component={ScheduleStack} options={{ tabBarShowLabel: false, title: 'Schedule', tabBarIcon: ({ focused }) => (
              <AntDesign name="calendar" size={focused ? 26 : 24} style={{ color: focused ? '#1b8e5f' : '#ddd' }} />
            ) }} />
            <Tab.Screen name="Setting" component={SettingStack} options={{ tabBarShowLabel: false, title: 'Setting', tabBarIcon: ({ focused }) => (
              <AntDesign name="setting" size={focused ? 26 : 24} style={{ color: focused ? '#1b8e5f' : '#ddd' }} />
            ) }} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}
