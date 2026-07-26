import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/home';
import SearchScreen from './screens/search';
import LibraryScreen from './screens/library';
import AnimatedTabBar from './components/animated-tab-bar';

const BottomTabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        <BottomTabs.Screen name="Home" component={HomeScreen} />
        <BottomTabs.Screen name="Search" component={SearchScreen} />
        <BottomTabs.Screen name="Library" component={LibraryScreen} />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
