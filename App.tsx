import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import { useFonts } from '@expo-google-fonts/lobster';
import AppLoading from 'expo-app-loading';

import Stationsmap from "./components/stations_map/map";
import DelaysStack from "./components/delays/DelaysStack";
import Auth from "./components/auth/Auth";

import { Base, Typography } from './styles';

import authModel from "./models/auth";


const Tab = createMaterialBottomTabNavigator();

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [stations, setStations] = useState([]);

    const routeIcons = {
        "Trafic Info": "train-outline",
        "Map": "profile",
        "Deliveries": "export",
        "Invoices": "isv",
        "Log In": "person-outline",
        "My page": "person-outline"
    };

    // useEffect(async () => {
    //     // async function fetchData() {
    //     //     const response = await authModel.loggedIn();
    //     //     return response.d
    //     // }
    //     setIsLoggedIn(await authModel.loggedIn());
    // }, []);

    const [isLoaded] = useFonts({
        'Zurich-Regular': require('./assets/fonts/zurich-reg.ttf'),
        'Zurich-Bold': require('./assets/fonts/zurich-bold.ttf'),
        'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
        'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
        'Lato-Light': require('./assets/fonts/Lato/Lato-Light.ttf'),
    })
    if (!isLoaded) {
        return <AppLoading />
    } else {
        return (
            <SafeAreaView style={Base.container}>
                <NavigationContainer>
                    <Tab.Navigator
                        barStyle={Base.bottomNavBar}
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName = routeIcons[route.name] || "exclamation";
                                return <Ionicons name={iconName} size={22} color={color} />;
                            },
                            tabBarActiveTintColor: 'white',
                            tabBarInactiveTintColor: 'gray',
                            tabBarActiveBackgroundColor: 'gray',
                        })}
                    >
                        <Tab.Screen name="Trafic Info">
                            {() => <DelaysStack isLoggedIn={isLoggedIn} stations={stations} setStations={setStations}/>}
                        </Tab.Screen>
                        {/* if logged in show invoices, otherwise show log in */}
                        {isLoggedIn ?
                            <Tab.Screen name="My Page">
                                {() => <DelaysStack stations={stations} setStations={setStations} />}
                            </Tab.Screen> :

                            <Tab.Screen name="Log In">
                                {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                            </Tab.Screen>
                        }

                    </Tab.Navigator>
                </NavigationContainer>
                <StatusBar style="auto" />
                <FlashMessage position="top"/>
            </SafeAreaView>
        );
    }
}
