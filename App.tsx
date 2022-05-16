import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import { useFonts } from '@expo-google-fonts/lobster';
import AppLoading from 'expo-app-loading';

import Stationsmap from "./components/stations_map/map";
import Delays from "./components/delays/Delays";

import { Base, Typography } from './styles';

import authModel from "./models/auth";


const Tab = createMaterialBottomTabNavigator();

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [delays, setDelays] = useState([]);

    // var express = require('express')
    // var app = express()
    // app.use(express.json({limit: '50mb'}));
    // app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));


    const routeIcons = {
        "Delays": "home",
        "Map": "profile",
        "Deliveries": "export",
        "Invoices": "isv",
        "Ship": "earth",
        "Log in": "login"
    };

    // useEffect(async () => {
    //     // async function fetchData() {
    //     //     const response = await authModel.loggedIn();
    //     //     return response.d
    //     // }
    //     setIsLoggedIn(await authModel.loggedIn());
    // }, []);

    // const [isLoaded] = useFonts({
    //     'Zurich-Regular': require('./assets/fonts/zurich-reg.ttf'),
    //     'Zurich-Bold': require('./assets/fonts/zurich-bold.ttf'),
    // })
    // if (!isLoaded) {
    //     return <AppLoading />
    // } else {
        return (
            <SafeAreaView style={Base.container}>
                <NavigationContainer>
                    <Tab.Navigator
                        barStyle={Base.bottomNavBar}
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName = routeIcons[route.name] || "exclamation";
                                return <AntDesign name={iconName} size={22} color={color} />;
                            },
                            tabBarActiveTintColor: 'green',
                            tabBarInactiveTintColor: 'gray',
                            tabBarActiveBackgroundColor: '#006400',
                        })}
                    >
                        <Tab.Screen name="Delays">
                            {() => <Delays delays={delays} setDelays={setDelays}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Map" component={Stationsmap}>
                            {/* {() => <Delays delays={delays} setDelays={setDelays}/>} */}
                        </Tab.Screen>
                    </Tab.Navigator>
                </NavigationContainer>
                <StatusBar style="auto" />
                <FlashMessage position="top"/>
            </SafeAreaView>
        );
    // }
}
