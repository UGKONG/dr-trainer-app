import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './pages/Home';
import MemberStack from './pages/Member';
import ScheduleStack from './pages/Schedule';
import SettingStack from './pages/Setting';

const Tab = createBottomTabNavigator();

export default () => (
  <>
    <StatusBar style='auto' />
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Home' }} />
        <Tab.Screen name="Member" component={MemberStack} options={{ title: 'Member' }} />
        <Tab.Screen name="Schedule" component={ScheduleStack} options={{ title: 'Schedule' }} />
        <Tab.Screen name="Setting" component={SettingStack} options={{ title: 'Setting' }} />
      </Tab.Navigator>
    </NavigationContainer>
  </>
);
