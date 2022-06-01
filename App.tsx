import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import DelaysStack from "./components/delays/DelaysStack";
import Auth from "./components/auth/Auth";
import MypageStack from "./components/mypage/MypageStack";
import { Base } from './styles';


const Tab = createMaterialBottomTabNavigator();

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [stations, setStations] = useState([]);
    const [delays, setDelays] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const mySetIsLoggedIn = ((loginState) => {
        setIsLoggedIn(loginState);
    });
    const [appIsReady, setAppIsReady] = useState(false);

    const routeIcons = {
        "Trafic Info": "train-outline",
        "Map": "profile",
        "Deliveries": "export",
        "Invoices": "isv",
        "Log In": "person-outline",
        "My page": "person-outline"
    };
    
    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Font.loadAsync({
                    'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
                    'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
                    'Lato-Light': require('./assets/fonts/Lato/Lato-Light.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <SafeAreaView style={Base.container}
            onLayout={onLayoutRootView}>
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
                        {() => <DelaysStack
                            isLoggedIn={isLoggedIn}
                            stations={stations}
                            setStations={setStations}
                            delays={delays}
                            setDelays={setDelays}
                            favourites={favourites}
                            setFavourites={setFavourites} />}
                    </Tab.Screen>
                    {/* if logged in show My page, otherwise show Log in */}
                    {isLoggedIn ?
                        <Tab.Screen name="My page">
                            {() => <MypageStack isLoggedIn={isLoggedIn} setIsLoggedIn={mySetIsLoggedIn} stations={stations} delays={delays} setFavourites={setFavourites} favourites={favourites} />}
                        </Tab.Screen>
                        :
                        <Tab.Screen name="Log In">
                            {() => <Auth setIsLoggedIn={mySetIsLoggedIn} setFavourites={setFavourites} favourites={favourites} />}
                        </Tab.Screen>
                    }

                </Tab.Navigator>
            </NavigationContainer>
            {/* <StatusBar style="auto" /> */}
            <FlashMessage position="top" />
        </SafeAreaView>
    );
    // }
}

