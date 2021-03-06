import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import useStore from './hooks/useStore.js';
import Login from './pages/Login';
import HomeStack from './pages/Home';
import MemberStack from './pages/Member';
import ScheduleStack from './pages/Schedule';
import NoticeStack from './pages/Notice';
import SettingStack from './pages/Setting';

const Tab = createBottomTabNavigator();

export default () => {
  const isLogin = useStore(x => x?.isLogin);
  const screenList = useRef([
    { id: 1, name: 'Home', iconName: 'linechart', component: HomeStack },
    { id: 2, name: 'Member', iconName: 'user', component: MemberStack },
    { id: 3, name: 'Schedule', iconName: 'calendar', component: ScheduleStack },
    { id: 4, name: 'Notice', iconName: 'bells', component: NoticeStack },
    { id: 5, name: 'Setting', iconName: 'setting', component: SettingStack },
  ]);

  return (
    <>
      <StatusBar style='auto' />
      {!isLogin ? (
        <Login />
      ) : (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            {screenList.current?.map(item => (
              <Tab.Screen key={item?.id} name={item?.name} component={item?.component} options={{
                tabBarShowLabel: false,
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
