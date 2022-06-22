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
import { useRef, useState } from 'react';

const Tab = createBottomTabNavigator();

export default () => {
  const isLogin = useStore(x => x?.isLogin);
  const screenList = useRef([
    { id: 1, name: 'Home', iconName: 'linechart', component: HomeStack },
    { id: 2, name: 'Member', iconName: 'user', component: MemberStack },
    { id: 3, name: 'Schedule', iconName: 'calendar', component: ScheduleStack },
    { id: 4, name: 'Setting', iconName: 'setting', component: SettingStack },
  ]);

  return (
    <>
      <StatusBar style='auto' />
      {!isLogin ? (
        <Login />
      ) : (
        <NavigationContainer>
          <Tab.Navigator>
            {screenList.current?.map(item => (
              <Tab.Screen key={item?.id} name={item?.name} component={item?.component} options={{
                tabBarShowLabel: false, title: item?.name,
                tabBarIcon: ({ focused }) => (
                  <AntDesign 
                    name={item?.iconName} 
                    size={focused ? 26 : 24} 
                    style={{ color: focused ? '#1b8e5f' : '#ddd' }}
                  />
                )
              }}/>
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}
