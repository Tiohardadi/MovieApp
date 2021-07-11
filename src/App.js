import React from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import { Home,Browse,MovieDetail,Account } from './components';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNav = () => {
    return (
            <Tab.Navigator tabBarOptions = {{ showIcon: true }} >
                <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                }}/>
                <Tab.Screen name="Browse" component={Browse} options={{ tabBarLabel: 'Browse',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="magnify"
                            color={color}
                            size={size}
                        />
                    ),
                }}/>
                <Tab.Screen name="Account" component={Account} options={{ tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account-circle"
                            color={color}
                            size={size}
                        />
                    ),
                }}/>
            </Tab.Navigator>
    );
  }

const App = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#141d26'}}>
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TabNav">
                <Stack.Screen name="TabNav" component={TabNav}/>
                <Stack.Screen name="MovieDetail" component={MovieDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  );
}

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#DA0037',
        text: 'white',
        border: '#444444',
        card: '#171717',
        background: '#171717'
    },
  };

export default App;
